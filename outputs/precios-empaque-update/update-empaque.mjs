import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/facun/Desktop/QUIMICA - V3/public/Plantilla_Quimica_Bethel.xlsx";
const outputPath = "C:/Users/facun/Desktop/QUIMICA - V3/outputs/precios-empaque-update/Plantilla_Quimica_Bethel.xlsx";

const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const sheet = workbook.worksheets.getItem("PRECIOS");

const sourceCodes = sheet.getRange("A15:A250").values.map(([value]) => value ?? "");

// Rebuild the calculation table around the new per-product packaging controls.
for (const table of sheet.tables.items) {
  table.delete();
}

sheet.getRange("A1:L250").clear({ applyTo: "contents" });

sheet.getRange("A1").values = [["PRECIOS · COSTOS Y CÁLCULO AUTOMÁTICO"]];
sheet.getRange("A2").values = [["Editá las celdas amarillas. Para empaque, elegí SÍ/NO y usá un importe específico solo si corresponde. El resto se calcula solo."]];
sheet.getRange("A4:D4").values = [["SUPUESTOS GENERALES", "VALOR", "UNIDAD", "NOTA"]];
sheet.getRange("F4").values = [["FÓRMULA: (Costo + Empaque aplicado + Viático prorrateado + Subsidio prorrateado) / (1 - Comisión - Margen)"]];
sheet.getRange("A5:D11").values = [
  ["Margen bruto objetivo", 0.4, "%", "Aplicado luego de costos y comisión."],
  ["Productos promedio por pedido", 4, "productos", "Para prorratear costos por pedido."],
  ["Viático de abastecimiento por pedido", 4000, "$ / pedido", "Costo operativo por pedido."],
  ["Costo real de entrega por pedido", 4000, "$ / pedido", "Referencia para el subsidio."],
  ["Envío cobrado de referencia", 2490, "$ / pedido", "Tramo de referencia."],
  ["Comisión de cobro QR Mercado Pago", 0.00968, "%", "Comisión sobre el precio final."],
  ["Empaque promedio por producto", 1000, "$ / producto", "Predeterminado para SÍ; se omite al elegir NO o se reemplaza con un importe específico."],
];

sheet.getRange("A14:L14").values = [[
  "CODIGO",
  "COSTO",
  "¿USA EMPAQUE?",
  "EMPAQUE ESPECÍFICO",
  "EMPAQUE APLICADO",
  "VIÁTICO PRORRATEADO",
  "SUBSIDIO ENVÍO PRORR.",
  "COMISIÓN COBRO",
  "MARGEN BRUTO OBJ.",
  "PRECIO VENTA AJUSTADO",
  "GANANCIA BRUTA EST.",
  "MARGEN BRUTO EST.",
]];

const productRows = sourceCodes.map((code) => [code, null, code ? "SÍ" : null, null]);
sheet.getRange("A15:D250").values = productRows;

sheet.getRange("E15").formulas = [["=IF(A15=\"\",\"\",IF(C15=\"NO\",0,IF(D15<>\"\",D15,$B$11)))"]];
sheet.getRange("F15").formulas = [["=IF(A15=\"\",\"\",$B$7/$B$6)"]];
sheet.getRange("G15").formulas = [["=IF(A15=\"\",\"\",($B$8-$B$9)/$B$6)"]];
sheet.getRange("H15").formulas = [["=IF(A15=\"\",\"\",$B$10)"]];
sheet.getRange("I15").formulas = [["=IF(A15=\"\",\"\",$B$5)"]];
sheet.getRange("J15").formulas = [["=IF(OR(A15=\"\",B15=\"\"),\"\",ROUND((B15+E15+F15+G15)/(1-H15-I15),-1))"]];
sheet.getRange("K15").formulas = [["=IF(J15=\"\",\"\",J15-B15-E15-F15-G15-(J15*H15))"]];
sheet.getRange("L15").formulas = [["=IF(J15=\"\",\"\",K15/J15)"]];
sheet.getRange("E15:L250").fillDown();

// Existing cost inputs remain intact: copy them back after reshaping the table.
const prior = await SpreadsheetFile.importXlsx(await FileBlob.load(sourcePath));
const priorPrices = prior.worksheets.getItem("PRECIOS");
sheet.getRange("B15:B250").values = priorPrices.getRange("B15:B250").values;

sheet.getRange("C15:C250").dataValidation = { rule: { type: "list", values: ["SÍ", "NO"] } };

const productTable = sheet.tables.add("A14:L250", true, "PreciosPorProducto");
productTable.showFilterButton = true;

sheet.getRange("A1:L1").format = {
  fill: "#163B5C",
  font: { bold: true, color: "#FFFFFF", fontSize: 15 },
  verticalAlignment: "center",
};
sheet.getRange("A2:L2").format = {
  fill: "#F3F8FB",
  font: { italic: true, color: "#3A5F77" },
  verticalAlignment: "center",
};
sheet.getRange("A4:D4").format = { fill: "#147D88", font: { bold: true, color: "#FFFFFF" } };
sheet.getRange("F4:J4").format = {
  fill: "#E8F3F4",
  font: { bold: true, color: "#163B5C" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
};
sheet.getRange("A5:D11").format.borders = { preset: "all", style: "thin", color: "#C7D6E2" };
sheet.getRange("A5:D11").format.wrapText = true;
sheet.getRange("B5:B11").format = { fill: "#FFF2CC", horizontalAlignment: "right" };
sheet.getRange("A14:L14").format = {
  fill: "#E8F3F4",
  font: { bold: true, color: "#163B5C" },
  horizontalAlignment: "center",
  verticalAlignment: "center",
  wrapText: true,
  borders: { preset: "all", style: "thin", color: "#C7D6E2" },
};
sheet.getRange("A15:L250").format.borders = { preset: "all", style: "thin", color: "#D7E3EA" };
sheet.getRange("A15:B250").format.fill = "#FFF2CC";
sheet.getRange("C15:D250").format.fill = "#FFF2CC";
sheet.getRange("E15:L250").format.fill = "#E2F0D9";
sheet.getRange("C15:C250").format.horizontalAlignment = "center";

sheet.getRange("B7:B9").format.numberFormat = '"$"#,##0';
sheet.getRange("B11").format.numberFormat = '"$"#,##0';
sheet.getRange("B5").format.numberFormat = "0.0%";
sheet.getRange("B10").format.numberFormat = "0.00%";
sheet.getRange("B15:B250").format.numberFormat = '"$"#,##0';
sheet.getRange("D15:G250").format.numberFormat = '"$"#,##0';
sheet.getRange("H15:I250").format.numberFormat = "0.00%";
sheet.getRange("J15:K250").format.numberFormat = '"$"#,##0';
sheet.getRange("L15:L250").format.numberFormat = "0.0%";

sheet.getRange("A1").format.rowHeight = 30;
sheet.getRange("A2").format.rowHeight = 24;
sheet.getRange("A4").format.rowHeight = 26;
sheet.getRange("A5:D11").format.rowHeight = 32;
sheet.getRange("A14").format.rowHeight = 34;

const widths = {
  A: 28, B: 14, C: 16, D: 34, E: 18, F: 20,
  G: 20, H: 16, I: 18, J: 20, K: 20, L: 18,
};
for (const [column, width] of Object.entries(widths)) {
  sheet.getRange(`${column}:${column}`).format.columnWidth = width;
}
sheet.getRange("A1:L250").format.verticalAlignment = "center";
sheet.showGridLines = false;
sheet.freezePanes.freezeRows(14);

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);
await fs.copyFile(outputPath, sourcePath);

const check = await workbook.inspect({
  kind: "table",
  range: "PRECIOS!A1:L20",
  include: "values,formulas",
  tableMaxRows: 20,
  tableMaxCols: 12,
  maxChars: 12000,
});
console.log(check.ndjson);

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "PRECIOS formula error scan",
  maxChars: 3000,
});
console.log(errors.ndjson);

const preview = await workbook.render({
  sheetName: "PRECIOS",
  range: "A1:L32",
  scale: 1.4,
  format: "png",
});
await fs.writeFile("C:/Users/facun/Desktop/QUIMICA - V3/outputs/precios-empaque-update/precios-after.png", new Uint8Array(await preview.arrayBuffer()));
