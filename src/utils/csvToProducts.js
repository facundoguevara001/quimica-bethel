import Papa from "papaparse";

export async function loadProducts() {

  const response = await fetch("/catalogo prueba(2).csv");

  const csvText = await response.text();

  const parsed = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    delimiter: ";"
  });

  let currentCategory = "";

  const products = parsed.data
    .filter(row => row["CODIGO"])
    .map((row, index) => {

      if (row["CATEGORIAS"]) {
        currentCategory = row["CATEGORIAS"];
      }

      return {
        id: index + 1,

        name:
          row["SUB PRODUCTOS / FRAGANCIAS  / TAMAÑOS"],

        category: currentCategory,

        subcategory: currentCategory,

        price:
          row["PRECIO DE VENTA"],

        image:
          `/products/${row["CODIGO"]}.jpg`
      };

    });

  return products;
}
