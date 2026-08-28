const fs = require("fs");
const XLSX = require("xlsx");

// Leer el Excel
const workbook = XLSX.readFile("./public/Plantilla_Quimica_Bethel_2.0.xlsx");

// Primera hoja
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Convertir a JSON
const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: ""
});

console.log(Object.keys(rows[0]));

// Crear productos
const products = rows
.filter(row => row.CODIGO && row.PRODUCTO)

.map((row,index)=>({

    id:index+1,

    code:row.CODIGO,

    slug: row.SLUG,

    name:row.PRODUCTO,

    category:row.CATEGORIA,

    subcategory:row.SUBCATEGORIA,

    brand:row.MARCA,

    fragrance:row.FRAGANCIA,

    description:row.PRESENTACION,

    characteristics:row.CARACTERISTICAS,

    cost:Number(row.COSTO),

    margin:Number(row["% MARGEN"]),

    price:`$${Number(row["PRECIO VENTA"]).toLocaleString("es-AR")}`,

    stock:Number(row.STOCK),

    stockMinimo:Number(row["STOCK MINIMO"]),

    status: row.ESTADO,

featured:
    String(row.DESTACADO)
        .trim()
        .toUpperCase() === "SI",

image: `/products/${row["NOMBRE FOTO"]}`,

}));

const content = `const products = ${JSON.stringify(products,null,2)};

export default products;
`;

fs.writeFileSync("./src/data/products.js",content);

console.log("================================");
console.log("Productos:",products.length);
console.log("products.js actualizado");
console.log("================================");