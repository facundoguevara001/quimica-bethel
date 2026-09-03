import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'quimica-sync-stock-'));
const workbook = path.join(temp, 'Plantilla_Quimica_Bethel.xlsx');
await fs.copyFile(path.join(root, 'public', 'Plantilla_Quimica_Bethel.xlsx'), workbook);
const env = {
  ...process.env,
  SYNC_STOCK_STATE_DIR: path.join(temp, 'state'),
  SYNC_STOCK_BACKUP_DIR: path.join(temp, 'backups'),
};
const args = ['scripts/sync-stock.mjs', '--input', 'scripts/fixtures/stock-responses.json', '--workbook', workbook];
const first = execFileSync(process.execPath, args, { cwd: root, env, encoding: 'utf8' });
const second = execFileSync(process.execPath, args, { cwd: root, env, encoding: 'utf8' });
assert.match(first, /"imported": 1/);
assert.match(first, /"omitted": 1/);
assert.match(first, /"errors": 1/);
assert.match(second, /"imported": 0/);
assert.match(second, /"duplicates": 1/);
const book = XLSX.readFile(workbook, { cellDates: true });
const movements = XLSX.utils.sheet_to_json(book.Sheets.MOVIMIENTOS_STOCK, { header: 1, defval: '' });
assert.equal(movements.length, 2, 'La segunda ejecución no debe agregar una fila.');
assert.deepEqual(movements[1].slice(1, 4), ['CLO001', 0, 8]);
console.log('OK: primera ejecución importó 1 salida; segunda ejecución no duplicó movimientos.');
