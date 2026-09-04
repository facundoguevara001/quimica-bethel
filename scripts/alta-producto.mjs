import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import XLSX from 'xlsx';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BOOK = path.join(ROOT, 'public', 'Plantilla_Quimica_Bethel.xlsx');
const clean = (value) => String(value ?? '').trim();
const norm = (value) => clean(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').toUpperCase();
const pad = (number, width = 3) => String(number).padStart(width, '0');
const value = (sheet, cell) => clean(sheet[cell]?.v);
const formulaAt = (formula, fromRow, toRow) => typeof formula === 'string' ? formula.replace(new RegExp(`(?<!\\$)([A-Z]{1,3})${fromRow}(?!\\d)`, 'g'), `$1${toRow}`) : formula;

function rows(sheet, start, end, cols) {
  return Array.from({ length: end - start + 1 }, (_, i) => {
    const r = start + i; const out = { row: r };
    for (const [key, col] of Object.entries(cols)) out[key] = value(sheet, `${col}${r}`);
    return out;
  });
}
function maxSequence(items, property, regexp) {
  return Math.max(0, ...items.map((item) => Number(String(item[property]).match(regexp)?.[1] || 0)));
}
function nextOpenRow(items, property) { return Math.max(...items.filter(x => x[property]).map(x => x.row), 4) + 1; }
function copyRow(sheet, from, to, firstCol, lastCol) {
  for (let c = firstCol; c <= lastCol; c += 1) {
    const fromCell = XLSX.utils.encode_cell({ r: from - 1, c });
    const toCell = XLSX.utils.encode_cell({ r: to - 1, c });
    const source = sheet[fromCell];
    if (!source) continue;
    sheet[toCell] = { ...source };
    if (source.f) sheet[toCell].f = formulaAt(source.f, from, to);
  }
}
function write(sheet, cell, v, styleFrom) {
  const source = styleFrom ? sheet[styleFrom] : undefined;
  sheet[cell] = { ...(source || {}), t: typeof v === 'number' ? 'n' : 's', v };
  delete sheet[cell].f;
}
function writeFormula(sheet, cell, f, v, styleFrom) {
  sheet[cell] = { ...(styleFrom ? sheet[styleFrom] : {}), t: 's', f, v };
}
function assert(condition, message) { if (!condition) throw new Error(message); }
function getInput(sheet, generator) {
  const column = generator === 1 ? 'B' : 'I';
  const at = (row) => value(sheet, `${column}${row}`);
  if (generator === 1) return { generator, product: at(5), category: at(6), subcategory: at(7), presentation: at(8), brand: at(9), fragrance: at(10), prefix: at(11), group: at(12), variant: at(13), reuseContent: at(14), description: at(15), characteristics: at(16), cost: at(17), packaging: at(18), packagingSpecific: at(19), status: at(20) || 'Activo', featured: at(21) || 'NO' };
  return { generator, product: at(5), newCategory: at(6), newSubcategory: at(7), presentation: at(8), brand: at(9), fragrance: at(10), prefix: at(11), createGroup: at(12), variant: at(13), description: at(14), characteristics: at(15), cost: at(16), packaging: at(17), packagingSpecific: at(18), status: at(19) || 'Activo', featured: at(20) || 'NO' };
}
function selectedGenerator(sheet) {
  const g1 = [5, 6, 7, 11, 17, 18].some(row => value(sheet, `B${row}`));
  const g2 = [5, 6, 7, 11, 14, 15, 16, 17].some(row => value(sheet, `I${row}`));
  assert(g1 !== g2, 'Completá exactamente uno de los dos generadores en ALTA.');
  return g1 ? 1 : 2;
}
function numeric(input, label, optional = false) {
  if (!clean(input) && optional) return '';
  const n = Number(clean(input).replace(/\./g, '').replace(',', '.'));
  assert(Number.isFinite(n) && n >= 0, `${label} debe ser un número mayor o igual a cero.`);
  return n;
}
function priceCalculation(sheet, cost, packaging, packagingSpecific) {
  const number = (cell) => Number(sheet[cell]?.v ?? 0);
  const margin = number('B5'), averageProducts = number('B6'), travel = number('B7'), realDelivery = number('B8'), deliveryCharge = number('B9'), commission = number('B10'), averagePackaging = number('B11');
  const appliedPackaging = norm(packaging) === 'NO' ? 0 : (packagingSpecific === '' ? averagePackaging : packagingSpecific);
  const proratedTravel = travel / averageProducts, proratedSubsidy = (realDelivery - deliveryCharge) / averageProducts;
  const salePrice = Math.round(((cost + appliedPackaging + proratedTravel + proratedSubsidy) / (1 - commission - margin)) / 10) * 10;
  const grossProfit = salePrice - cost - appliedPackaging - proratedTravel - proratedSubsidy - (salePrice * commission);
  return { appliedPackaging, proratedTravel, proratedSubsidy, commission, margin, salePrice, grossProfit, grossMargin: grossProfit / salePrice };
}
function readPlan(wb) {
  const alta = wb.Sheets.ALTA, products = rows(wb.Sheets.PRODUCTOS, 5, 1004, { code: 'B', id: 'A', product: 'K', catCode: 'F', subCode: 'H', group: 'D', variant: 'E', content: 'O' }).filter(x => x.code);
  const cats = rows(wb.Sheets.CATÁLOGOS, 6, 305, { code: 'A', name: 'B' }).filter(x => x.code || x.name);
  const subs = rows(wb.Sheets.CATÁLOGOS, 6, 305, { code: 'F', catCode: 'G', name: 'H' }).filter(x => x.code || x.name);
  const contents = rows(wb.Sheets.CATÁLOGOS, 6, 305, { code: 'L', description: 'N', characteristics: 'O' }).filter(x => x.code || x.description || x.characteristics);
  const input = getInput(alta, selectedGenerator(alta));
  assert(input.product, 'Falta Producto.');
  assert(input.prefix && /^[A-Za-z]{3}$/.test(input.prefix), 'Elegí un prefijo existente de tres letras.');
  assert(products.some(p => p.code.startsWith(input.prefix.toUpperCase())), 'El prefijo debe existir en PRODUCTOS.');
  assert(['SÍ', 'SI', 'NO'].includes(norm(input.packaging)), '¿Usa empaque? debe ser SÍ o NO.');
  const cost = numeric(input.cost, 'Costo');
  const packagingSpecific = numeric(input.packagingSpecific, 'Empaque específico', true);
  let category, subcategory, newCategory = false, newSubcategory = false;
  if (input.generator === 1) {
    category = cats.find(c => norm(c.name) === norm(input.category));
    assert(category, 'La categoría elegida no existe en CATÁLOGOS.');
    subcategory = subs.find(s => norm(s.name) === norm(input.subcategory) && s.catCode === category.code);
    assert(subcategory, 'La subcategoría debe existir y pertenecer a la categoría seleccionada.');
  } else {
    assert(input.newCategory && input.newSubcategory, 'Para el generador 2 indicá categoría y subcategoría nuevas.');
    assert(!cats.some(c => norm(c.name) === norm(input.newCategory)), 'La categoría ya existe; usá el generador 1.');
    category = { code: `CAT-${pad(maxSequence(cats, 'code', /^CAT-(\d+)$/) + 1)}`, name: input.newCategory };
    subcategory = { code: `SUB-${pad(maxSequence(subs, 'code', /^SUB-(\d+)$/) + 1)}`, catCode: category.code, name: input.newSubcategory };
    newCategory = true; newSubcategory = true;
  }
  const duplicate = products.find(p => norm(p.product) === norm(input.product) && p.catCode === category.code && p.subCode === subcategory.code && norm(p.variant) === norm(input.variant));
  assert(!duplicate, `Ya existe un producto equivalente (${duplicate?.code || ''}) en esta categoría y subcategoría.`);
  let group = clean(input.group);
  if (input.generator === 1 && group) {
    const matched = products.find(p => p.group === group && p.catCode === category.code && p.subCode === subcategory.code);
    assert(matched, 'El grupo elegido no corresponde a la categoría y subcategoría seleccionadas.');
    input.prefix = matched.code.slice(0, 3);
  } else if (input.generator === 2 && ['SÍ', 'SI'].includes(norm(input.createGroup))) group = `${input.prefix.toUpperCase()}-${pad(maxSequence(products, 'group', /^[A-Z]{3}-(\d+)$/) + 1, 4)}`;
  let content;
  if (clean(input.reuseContent)) {
    content = contents.find(c => c.code === clean(input.reuseContent));
    assert(content, 'El código de contenido a reutilizar no existe.');
  } else {
    assert(input.description && input.characteristics, 'Ingresá descripción y características para crear una plantilla de contenido.');
    content = { code: `CNT-${pad(maxSequence(contents, 'code', /^CNT-(\d+)$/) + 1)}`, description: input.description, characteristics: input.characteristics };
  }
  const code = `${input.prefix.toUpperCase()}${pad(maxSequence(products.filter(p => p.code.startsWith(input.prefix.toUpperCase())), 'code', /^[A-Z]{3}(\d+)$/) + 1)}`;
  assert(!products.some(p => p.code === code), `El código ${code} ya existe.`);
  const pricing = priceCalculation(wb.Sheets.PRECIOS, cost, input.packaging, packagingSpecific);
  return { input, products, cats, subs, contents, category, subcategory, content, newCategory, newSubcategory, newContent: !clean(input.reuseContent), code, id: pad(maxSequence(products, 'id', /^(\d+)$/) + 1), group, cost, packagingSpecific, pricing };
}
function applyPlan(wb, plan) {
  const productSheet = wb.Sheets.PRODUCTOS, priceSheet = wb.Sheets.PRECIOS, catalogSheet = wb.Sheets.CATÁLOGOS, photoSheet = wb.Sheets.CONTROL_FOTOS, alta = wb.Sheets.ALTA;
  if (plan.newCategory) { const r = maxSequence(plan.cats, 'code', /^CAT-(\d+)$/) + 6; copyRow(catalogSheet, r - 1, r, 0, 3); writeFormula(catalogSheet, `A${r}`, `"CAT-"&TEXT(ROW()-5,"000")`, plan.category.code, `A${r - 1}`); write(catalogSheet, `B${r}`, plan.category.name, `B${r - 1}`); write(catalogSheet, `C${r}`, 'Activo', `C${r - 1}`); }
  if (plan.newSubcategory) { const r = maxSequence(plan.subs, 'code', /^SUB-(\d+)$/) + 6; copyRow(catalogSheet, r - 1, r, 5, 9); writeFormula(catalogSheet, `F${r}`, `"SUB-"&TEXT(ROW()-5,"000")`, plan.subcategory.code, `F${r - 1}`); write(catalogSheet, `G${r}`, plan.category.code, `G${r - 1}`); write(catalogSheet, `H${r}`, plan.subcategory.name, `H${r - 1}`); write(catalogSheet, `I${r}`, 'Activo', `I${r - 1}`); }
  if (plan.newContent) { const r = maxSequence(plan.contents, 'code', /^CNT-(\d+)$/) + 6; copyRow(catalogSheet, r - 1, r, 11, 14); writeFormula(catalogSheet, `L${r}`, `"CNT-"&TEXT(ROW()-5,"000")`, plan.content.code, `L${r - 1}`); write(catalogSheet, `M${r}`, 'Activo', `M${r - 1}`); write(catalogSheet, `N${r}`, plan.content.description, `N${r - 1}`); write(catalogSheet, `O${r}`, plan.content.characteristics, `O${r - 1}`); }
  const pr = nextOpenRow(plan.products, 'code'); copyRow(productSheet, pr - 1, pr, 0, 20);
  const fields = { A: plan.id, B: plan.code, C: plan.code, D: plan.group, E: plan.input.variant, F: plan.category.code, H: plan.subcategory.code, J: plan.input.brand, K: plan.input.product, L: plan.input.fragrance, M: plan.input.presentation, N: `${plan.code}.jpg`, O: plan.content.code, R: '', S: '', T: plan.input.status, U: norm(plan.input.featured) === 'SI' ? 'SI' : 'NO' };
  for (const [col, val] of Object.entries(fields)) write(productSheet, `${col}${pr}`, val, `${col}${pr - 1}`);
  for (const [col, cached] of Object.entries({ G: plan.category.name, I: plan.subcategory.name, P: plan.content.description, Q: plan.content.characteristics })) productSheet[`${col}${pr}`].v = cached;
  const priceRows = rows(priceSheet, 15, 1014, { code: 'A' }).filter(x => x.code); const rr = nextOpenRow(priceRows, 'code'); copyRow(priceSheet, rr - 1, rr, 0, 11);
  write(priceSheet, `A${rr}`, plan.code, `A${rr - 1}`); write(priceSheet, `B${rr}`, plan.cost, `B${rr - 1}`); write(priceSheet, `C${rr}`, norm(plan.input.packaging) === 'SI' ? 'SÍ' : 'NO', `C${rr - 1}`); write(priceSheet, `D${rr}`, plan.packagingSpecific, `D${rr - 1}`);
  const priceFormulas = {
    E: `IF(A${rr}="","",IF(C${rr}="NO",0,IF(D${rr}<>"",D${rr},$B$11)))`, F: `IF(A${rr}="","",$B$7/$B$6)`, G: `IF(A${rr}="","",($B$8-$B$9)/$B$6)`, H: `IF(A${rr}="","",$B$10)`, I: `IF(A${rr}="","",$B$5)`, J: `IF(OR(A${rr}="",B${rr}=""),"",ROUND((B${rr}+E${rr}+F${rr}+G${rr})/(1-H${rr}-I${rr}),-1))`, K: `IF(J${rr}="","",J${rr}-B${rr}-E${rr}-F${rr}-G${rr}-(J${rr}*H${rr}))`, L: `IF(J${rr}="","",K${rr}/J${rr})`
  };
  for (const [col, cached] of Object.entries({ E: plan.pricing.appliedPackaging, F: plan.pricing.proratedTravel, G: plan.pricing.proratedSubsidy, H: plan.pricing.commission, I: plan.pricing.margin, J: plan.pricing.salePrice, K: plan.pricing.grossProfit, L: plan.pricing.grossMargin })) priceSheet[`${col}${rr}`] = { ...(priceSheet[`${col}${rr}`] || priceSheet[`${col}${rr - 1}`] || {}), t: 'n', f: priceFormulas[col], v: cached };
  const photos = rows(photoSheet, 5, 1004, { code: 'A' }).filter(x => x.code); const fr = nextOpenRow(photos, 'code'); copyRow(photoSheet, fr - 1, fr, 0, 7);
  for (const [col, val] of Object.entries({ A: plan.code, B: plan.input.product, C: `${plan.code}.jpg`, D: 'PENDIENTE', E: '', F: '', G: 'PENDIENTE', H: '' })) write(photoSheet, `${col}${fr}`, val, `${col}${fr - 1}`);
  const result = [[plan.id], [plan.code], [plan.category.code], [plan.subcategory.code], [plan.content.code], [`${plan.code}.jpg`]]; alta['B24'] = { t: 's', v: plan.id }; ['B25','B26','B27','B28','B29'].forEach((cell, i) => alta[cell] = { t: 's', v: result[i + 1][0] });
  const details = [plan.input.status, `Generador ${plan.input.generator}`, plan.group, plan.input.variant, plan.pricing.salePrice, new Date().toLocaleDateString('es-AR')]; details.forEach((v, i) => alta[`D${24 + i}`] = { t: typeof v === 'number' ? 'n' : 's', v });
  wb.Workbook = wb.Workbook || {}; wb.Workbook.CalcPr = { fullCalcOnLoad: true, forceFullCalc: true, calcMode: 'auto' };
}
async function main() {
  const workbook = XLSX.readFile(BOOK, { cellFormula: true, cellStyles: true }); assert(workbook.Sheets.ALTA, 'No existe la hoja ALTA.');
  const plan = readPlan(workbook);
  console.log(JSON.stringify({ id: plan.id, codigo: plan.code, categoria: plan.category.code, subcategoria: plan.subcategory.code, contenido: plan.content.code, grupo: plan.group || '(sin grupo)', foto: `${plan.code}.jpg`, costo: plan.cost, precioVentaEstimado: plan.pricing.salePrice }, null, 2));
  if (process.argv.includes('--dry-run')) return;
  const io = readline.createInterface({ input: process.stdin, output: process.stdout }); const answer = await io.question('Escribí SI para confirmar el alta: '); io.close(); if (norm(answer) !== 'SI') { console.log('Alta cancelada. No se modificó el archivo.'); return; }
  const backup = path.join(ROOT, 'backups', `Plantilla_Quimica_Bethel.before-alta-${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`); await fs.mkdir(path.dirname(backup), { recursive: true }); await fs.copyFile(BOOK, backup);
  applyPlan(workbook, plan); XLSX.writeFile(workbook, BOOK, { cellFormula: true, cellStyles: true, bookType: 'xlsx' }); console.log(`Alta creada. Respaldo: ${path.relative(ROOT, backup)}`);
}
main().catch((error) => { console.error(`ERROR: ${error.message}`); process.exitCode = 1; });
