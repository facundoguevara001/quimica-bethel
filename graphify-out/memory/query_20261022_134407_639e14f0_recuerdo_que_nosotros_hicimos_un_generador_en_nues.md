---
type: "query"
date: "2026-10-22T13:44:07.246017+00:00"
question: "Recuerdo que nosotros hicimos un generador en nuestra excel para dar de alta productos. Estoy queriendo dar de alta una promoción que va dentro de la categoria Pack y Ofertas. ¿Lo hago desde el generador de alta de producto nuevo?"
contributor: "graphify"
outcome: "dead_end"
source_nodes: ["Promotions()", "Catalog()", "products.js"]
---

# Q: Recuerdo que nosotros hicimos un generador en nuestra excel para dar de alta productos. Estoy queriendo dar de alta una promoción que va dentro de la categoria Pack y Ofertas. ¿Lo hago desde el generador de alta de producto nuevo?

## Answer

Expanded from original query via graph vocabulary: [add, product, category, catalog, promotions]. The graph describes a web project with a Promotions() page in src/pages/Promotions.jsx importing products from src/data/products.js, and Catalog() with selectCategory() in src/pages/Catalog.jsx. It does not document an Excel product-entry generator or the Pack y Ofertas category, so it cannot determine whether to use that generator. This query reached relevant product and promotions nodes but could not resolve the spreadsheet workflow.

## Outcome

- Signal: dead_end

## Source Nodes

- Promotions()
- Catalog()
- products.js