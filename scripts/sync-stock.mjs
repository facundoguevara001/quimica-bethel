import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_WORKBOOK = path.join(ROOT, 'public', 'Plantilla_Quimica_Bethel.xlsx');
const DEFAULT_SHEET_ID = '1_mRxlhoKZrQoRMi9rCDkg_0dn-FJ8O3EaoNKU-3pnRA';
const REQUIRED_HEADERS = [
  'Marca temporal', 'ID de pedido / WhatsApp', 'Cliente / comercio', 'Código de producto',
  'Unidades entregadas', 'Unidades devueltas', 'Monto cobrado por este producto ($)',
  'Unidades vendidas reales',
];

function loadDotEnv() {
  // Deliberately only loads a local, ignored file. Environment variables override it.
  return fs.readFile(path.join(ROOT, '.env.local'), 'utf8').then((content) => {
    for (const line of content.split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }).catch(() => {});
}

function option(name) {
  const i = process.argv.indexOf(name);
  return i === -1 ? undefined : process.argv[i + 1];
}

function hasFlag(name) { return process.argv.includes(name); }

function usage() {
  console.log('Uso: npm run sync-stock -- [--dry-run] [--input archivo.json] [--workbook archivo.xlsx]');
}

function clean(value) { return String(value ?? '').trim(); }
function keyForHeader(value) { return clean(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }

function parseNumber(value, label, { integer = false } = {}) {
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) throw new Error(`${label} no es un número válido`);
    if (integer && !Number.isInteger(value)) throw new Error(`${label} debe ser un número entero`);
    return value;
  }
  const text = clean(value).replace(/\$/g, '').replace(/\s/g, '').replace(',', '.');
  if (!text || !/^-?\d+(\.\d+)?$/.test(text)) throw new Error(`${label} no es un número válido`);
  const number = Number(text);
  if (!Number.isFinite(number) || (integer && !Number.isInteger(number))) {
    throw new Error(`${label}${integer ? ' debe ser un número entero' : ' no es válido'}`);
  }
  return number;
}

function parseResponseDate(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value;
  const text = clean(value);
  const local = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ ,]+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (local) {
    const [, day, month, year, hour = '0', minute = '0', second = '0'] = local;
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
    if (date.getFullYear() === Number(year) && date.getMonth() === Number(month) - 1 && date.getDate() === Number(day)) return date;
  }
  const date = new Date(text);
  if (!Number.isNaN(date.valueOf())) return date;
  throw new Error('Marca temporal no es una fecha válida');
}

function stableId(raw) {
  return crypto.createHash('sha256').update([
    clean(raw['Marca temporal']), clean(raw['ID de pedido / WhatsApp']), clean(raw['Código de producto']).toUpperCase(),
  ].join('|')).digest('hex');
}

function normaliseRows(values) {
  if (!Array.isArray(values) || values.length === 0) throw new Error('La fuente no contiene encabezados.');
  const headerIndex = new Map(values[0].map((header, index) => [keyForHeader(header), index]));
  const absent = REQUIRED_HEADERS.filter((header) => !headerIndex.has(keyForHeader(header)));
  if (absent.length) throw new Error(`Faltan encabezados requeridos: ${absent.join(', ')}`);
  return values.slice(1).map((row, index) => {
    const raw = Object.fromEntries(REQUIRED_HEADERS.map((header) => [header, row[headerIndex.get(keyForHeader(header))] ?? '']));
    return { sourceRow: index + 2, raw };
  }).filter(({ raw }) => Object.values(raw).some((value) => clean(value) !== ''));
}

async function tokenFromOAuth() {
  if (process.env.GOOGLE_SHEETS_ACCESS_TOKEN) return process.env.GOOGLE_SHEETS_ACCESS_TOKEN;
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('Faltan GOOGLE_OAUTH_CLIENT_ID y GOOGLE_OAUTH_CLIENT_SECRET. Ver .env.example.');
  const tokenDir = path.join(process.env.APPDATA || process.env.LOCALAPPDATA || ROOT, 'QuimicaBethel');
  const tokenPath = path.join(tokenDir, 'google-sheets-token.json');
  let saved;
  try { saved = JSON.parse(await fs.readFile(tokenPath, 'utf8')); } catch { saved = undefined; }
  if (saved?.refresh_token) {
    const body = new URLSearchParams({ client_id: clientId, client_secret: clientSecret, refresh_token: saved.refresh_token, grant_type: 'refresh_token' });
    const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body });
    if (response.ok) {
      const refreshed = await response.json();
      await fs.mkdir(tokenDir, { recursive: true });
      await fs.writeFile(tokenPath, JSON.stringify({ ...saved, ...refreshed, refresh_token: saved.refresh_token }, null, 2), 'utf8');
      return refreshed.access_token;
    }
  }
  const state = crypto.randomBytes(24).toString('hex');
  let redirectUri;
  let server;
  const codePromise = new Promise((resolve, reject) => {
    server = http.createServer((request, response) => {
      const current = new URL(request.url, redirectUri);
      if (current.pathname !== '/oauth2callback') { response.writeHead(404).end(); return; }
      if (current.searchParams.get('state') !== state || !current.searchParams.get('code')) { response.writeHead(400).end('Autorización inválida.'); reject(new Error('La respuesta OAuth no coincide con esta ejecución.')); server.close(); return; }
      response.end('Autorización completada. Podés volver a la terminal.');
      resolve(current.searchParams.get('code')); server.close();
    });
    server.once('error', reject);
  });
  await new Promise((resolve, reject) => server.listen(0, '127.0.0.1', (error) => error ? reject(error) : resolve()));
  const address = server.address();
  redirectUri = `http://127.0.0.1:${address.port}/oauth2callback`;
  const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authorizationUrl.search = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: 'code', scope: 'https://www.googleapis.com/auth/spreadsheets.readonly', access_type: 'offline', prompt: 'consent', state });
  console.log('\nAutorización requerida. Abrí esta URL en tu navegador y concedé acceso:\n' + authorizationUrl.toString() + '\n');
  const code = await codePromise;
  const body = new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' });
  const response = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body });
  if (!response.ok) throw new Error(`Google OAuth rechazó la autorización: ${await response.text()}`);
  const token = await response.json();
  await fs.mkdir(tokenDir, { recursive: true });
  await fs.writeFile(tokenPath, JSON.stringify(token, null, 2), 'utf8');
  return token.access_token;
}

async function readGoogleRows() {
  const sheetId = process.env.GOOGLE_SHEET_ID || DEFAULT_SHEET_ID;
  const range = process.env.GOOGLE_SHEET_RANGE || 'Form Responses 1!A:H';
  const accessToken = await tokenFromOAuth();
  const endpoint = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(range)}?valueRenderOption=UNFORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING`;
  const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (!response.ok) throw new Error(`Google Sheets respondió ${response.status}: ${await response.text()}`);
  const data = await response.json();
  return normaliseRows(data.values || []);
}

async function readInputRows(inputPath) {
  const parsed = JSON.parse(await fs.readFile(path.resolve(inputPath), 'utf8'));
  const values = Array.isArray(parsed) ? parsed : [parsed.headers, ...parsed.rows];
  return normaliseRows(values);
}

function productCodes(workbook) {
  const sheet = workbook.Sheets.PRODUCTOS;
  if (!sheet) throw new Error('No existe la hoja PRODUCTOS para validar códigos.');
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  const headerRow = rows.findIndex((row) => row.some((cell) => keyForHeader(cell) === 'codigo'));
  if (headerRow < 0) throw new Error('No se encontró la columna CODIGO en PRODUCTOS.');
  const column = rows[headerRow].findIndex((cell) => keyForHeader(cell) === 'codigo');
  return new Set(rows.slice(headerRow + 1).map((row) => clean(row[column]).toUpperCase()).filter(Boolean));
}

function validateRows(rows, codes, importedIds) {
  const movements = [];
  const errors = [];
  const omitted = [];
  const duplicates = [];
  const seenThisRun = new Set();
  for (const { sourceRow, raw } of rows) {
    const id = stableId(raw);
    try {
      for (const header of REQUIRED_HEADERS) if (clean(raw[header]) === '') throw new Error(`Falta “${header}”`);
      if (importedIds.has(id) || seenThisRun.has(id)) { duplicates.push({ sourceRow, id, reason: 'La respuesta ya fue importada.' }); continue; }
      const date = parseResponseDate(raw['Marca temporal']);
      const code = clean(raw['Código de producto']).toUpperCase();
      const delivered = parseNumber(raw['Unidades entregadas'], 'Unidades entregadas', { integer: true });
      const returned = parseNumber(raw['Unidades devueltas'], 'Unidades devueltas', { integer: true });
      const sold = parseNumber(raw['Unidades vendidas reales'], 'Unidades vendidas reales', { integer: true });
      const amount = parseNumber(raw['Monto cobrado por este producto ($)'], 'Monto cobrado por este producto');
      if (delivered < 0 || returned < 0 || sold < 0 || amount < 0) throw new Error('Las cantidades y el monto no pueden ser negativos.');
      if (returned > delivered) throw new Error('Las unidades devueltas superan las entregadas.');
      if (sold !== delivered - returned) throw new Error('Unidades vendidas reales no coincide con entregadas menos devueltas.');
      if (!codes.has(code)) throw new Error(`El código “${code}” no existe en PRODUCTOS.`);
      if (sold === 0) { omitted.push({ sourceRow, id, reason: 'Unidades vendidas reales es 0; no se crea salida.' }); continue; }
      movements.push({ id, sourceRow, date, code, delivered, returned, sold, amount, order: clean(raw['ID de pedido / WhatsApp']), customer: clean(raw['Cliente / comercio']) });
      seenThisRun.add(id);
    } catch (error) { errors.push({ sourceRow, id, reason: error.message }); }
  }
  return { movements, errors, omitted, duplicates };
}

function appendMovements(sheet, movements) {
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
  const startRow = rows.length;
  const values = movements.map((item) => [
    item.date, item.code, 0, item.sold,
    `Pedido: ${item.order} | Cliente: ${item.customer} | Entregadas: ${item.delivered} | Devueltas: ${item.returned} | Cobrado: $${item.amount}`,
  ]);
  XLSX.utils.sheet_add_aoa(sheet, values, { origin: -1, cellDates: true });
  for (let index = 0; index < movements.length; index += 1) {
    const row = startRow + index + 1;
    sheet[`A${row}`].z = 'dd/mm/yyyy hh:mm';
    sheet[`C${row}`].z = '0';
    sheet[`D${row}`].z = '0';
  }
}

async function main() {
  await loadDotEnv();
  if (hasFlag('--help')) { usage(); return; }
  const dryRun = hasFlag('--dry-run');
  const workbookPath = path.resolve(option('--workbook') || process.env.STOCK_WORKBOOK_PATH || DEFAULT_WORKBOOK);
  const stateDir = path.resolve(process.env.SYNC_STOCK_STATE_DIR || path.join(ROOT, '.sync-stock'));
  const statePath = path.join(stateDir, 'imported-responses.json');
  const workbook = XLSX.readFile(workbookPath, { cellDates: true, cellFormula: true, cellStyles: true });
  const stockSheet = workbook.Sheets.MOVIMIENTOS_STOCK;
  if (!stockSheet) throw new Error('No existe la hoja MOVIMIENTOS_STOCK.');
  const headers = XLSX.utils.sheet_to_json(stockSheet, { header: 1, range: 0, defval: '' })[0] || [];
  if (['FECHA', 'CODIGO', 'ENTRADA', 'SALIDA', 'OBSERVACION'].some((header, i) => headers[i] !== header)) throw new Error('MOVIMIENTOS_STOCK no tiene los encabezados esperados.');
  let state = { importedIds: [], backupCreated: false };
  try { state = { ...state, ...JSON.parse(await fs.readFile(statePath, 'utf8')) }; } catch {}
  const rows = option('--input') ? await readInputRows(option('--input')) : await readGoogleRows();
  const result = validateRows(rows, productCodes(workbook), new Set(state.importedIds));
  const summary = { read: rows.length, imported: result.movements.length, omitted: result.omitted.length, errors: result.errors.length, duplicates: result.duplicates.length, dryRun, workbook: workbookPath, errorsDetail: result.errors, omittedDetail: result.omitted, duplicatesDetail: result.duplicates };
  console.log('\nRESUMEN PREVIO A ESCRIBIR\n' + JSON.stringify(summary, null, 2));
  if (dryRun || result.movements.length === 0) return;
  if (!state.backupCreated) {
    const backupDir = path.resolve(process.env.SYNC_STOCK_BACKUP_DIR || path.join(ROOT, 'backups'));
    await fs.mkdir(backupDir, { recursive: true });
    const backupPath = path.join(backupDir, `${path.parse(workbookPath).name}.before-first-sync${path.extname(workbookPath)}`);
    try { await fs.access(backupPath); } catch { await fs.copyFile(workbookPath, backupPath); }
    state.backupCreated = true;
  }
  appendMovements(stockSheet, result.movements);
  XLSX.writeFile(workbook, workbookPath, { cellDates: true, bookType: 'xlsx' });
  await fs.mkdir(stateDir, { recursive: true });
  state.importedIds = [...new Set([...state.importedIds, ...result.movements.map((item) => item.id)])];
  await fs.writeFile(statePath, JSON.stringify(state, null, 2), 'utf8');
  console.log(`\nEscritura completada: ${result.movements.length} movimiento(s) agregado(s).`);
}

main().catch((error) => { console.error(`ERROR: ${error.message}`); process.exitCode = 1; });
