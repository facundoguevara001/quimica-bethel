import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/facun/Desktop/Plantilla_Quimica_Bethel_2_0.xlsx";
const previewPath = "C:/Users/facun/Desktop/QUIMICA - V3/.sheet-work/source-productos.png";

const input = await FileBlob.load(sourcePath);
const workbook = await SpreadsheetFile.importXlsx(input);

const overview = await workbook.inspect({
  kind: "workbook,sheet,table",
  maxChars: 6000,
  tableMaxRows: 8,
  tableMaxCols: 20,
  tableMaxCellChars: 70,
});

console.log(overview.ndjson);

const preview = await workbook.render({
  sheetName: "PRODUCTOS",
  range: "A1:S16",
  scale: 1.5,
  format: "png",
});

await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
