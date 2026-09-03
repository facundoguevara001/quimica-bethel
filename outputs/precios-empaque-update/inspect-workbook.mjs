import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const inputPath = "C:/Users/facun/Desktop/QUIMICA - V3/public/Plantilla_Quimica_Bethel.xlsx";
const outputDir = "C:/Users/facun/Desktop/QUIMICA - V3/outputs/precios-empaque-update";

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
const summary = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 6000,
  tableMaxRows: 8,
  tableMaxCols: 12,
});
console.log(summary.ndjson);

const prices = workbook.worksheets.getItem("PRECIOS");
const table = await workbook.inspect({
  kind: "table",
  range: "PRECIOS!A1:L24",
  include: "values,formulas",
  tableMaxRows: 24,
  tableMaxCols: 12,
  maxChars: 12000,
});
console.log(table.ndjson);

const formulas = await workbook.inspect({
  kind: "formula",
  sheetId: "PRECIOS",
  range: "A1:L30",
  options: { maxResults: 120 },
  maxChars: 10000,
});
console.log(formulas.ndjson);

const styles = await workbook.inspect({
  kind: "computedStyle",
  sheetId: "PRECIOS",
  range: "A4:L16",
  maxChars: 10000,
});
console.log(styles.ndjson);

const preview = await workbook.render({
  sheetName: "PRECIOS",
  range: "A1:L32",
  scale: 1.4,
  format: "png",
});
await fs.writeFile(`${outputDir}/precios-before.png`, new Uint8Array(await preview.arrayBuffer()));
