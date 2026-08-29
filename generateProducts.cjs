const fs = require("fs");
const XLSX = require("xlsx");

const workbook = XLSX.readFile("./public/Plantilla_Quimica_Bethel_2.0.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const rows = XLSX.utils.sheet_to_json(sheet, {
    defval: ""
});

const formatPrice = price =>
    `$${Number(price).toLocaleString("es-AR")}`;

const productVariants = rows
    .filter(row => row.CODIGO && row.PRODUCTO)
    .map((row, index) => {
        const salePrice = Number(
            row["PRECIO VENTA AJUSTADO"] || row["PRECIO VENTA"]
        );

        return {
            id: index + 1,
            code: String(row.CODIGO).trim(),
            slug: String(row.SLUG).trim(),
            group: row.GRUPO
                ? String(row.GRUPO).trim()
                : String(row.SLUG).trim(),
            variantLabel: row.VARIANTE
                ? String(row.VARIANTE).trim()
                : String(row.PRESENTACION).trim(),

            name: row.PRODUCTO,
            category: row.CATEGORIA,
            subcategory: row.SUBCATEGORIA,
            brand: row.MARCA,
            fragrance: row.FRAGANCIA,
            description: row.PRESENTACION,
            characteristics: row.CARACTERISTICAS,

            salePrice,
            price: formatPrice(salePrice),
            stock: Number(row.STOCK),
            stockMinimo: Number(row["STOCK MINIMO"]),
            status: row.ESTADO,
            featured: String(row.DESTACADO)
                .trim()
                .toUpperCase() === "SI",
            image: `/products/${row["NOMBRE FOTO"]}`
        };
    });

const duplicatedSlugs = productVariants
    .map(product => product.slug)
    .filter((slug, index, allSlugs) => allSlugs.indexOf(slug) !== index);

if (duplicatedSlugs.length > 0) {
    throw new Error(
        `Hay SLUG duplicados en el Excel: ${[
            ...new Set(duplicatedSlugs)
        ].join(", ")}`
    );
}

const productsByGroup = new Map();

productVariants.forEach(variant => {
    const groupVariants = productsByGroup.get(variant.group) || [];
    groupVariants.push(variant);
    productsByGroup.set(variant.group, groupVariants);
});

const products = [...productsByGroup.entries()].map(([group, variants]) => {
    const sortedVariants = [...variants].sort(
        (a, b) => a.salePrice - b.salePrice
    );

    const cheapestVariant = sortedVariants[0];

    return {
        ...cheapestVariant,
        id: group,
        group,
        variants: sortedVariants,
        minPrice: cheapestVariant.salePrice,
        price: formatPrice(cheapestVariant.salePrice)
    };
});

const content = `const products = ${JSON.stringify(products, null, 2)};

export const productVariants = ${JSON.stringify(productVariants, null, 2)};

export default products;
`;

fs.writeFileSync("./src/data/products.js", content);

console.log("================================");
console.log("Productos agrupados:", products.length);
console.log("Variantes:", productVariants.length);
console.log("products.js actualizado");
console.log("================================");