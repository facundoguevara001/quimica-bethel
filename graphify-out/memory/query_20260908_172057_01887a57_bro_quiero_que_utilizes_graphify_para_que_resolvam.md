---
type: "query"
date: "2026-09-08T17:20:57.255684+00:00"
question: "bro quiero que utilizes graphify para que resolvamos lo siguiente. Cuando un usuario esta navegando en nuestro catalogo, al momento se seleccionar un producto y bajar hasta el carrusel de recomendados, pausar y cuando selecciona un producto la web carga el producto seleccionado desde ese carrusel pero no recarga la web y tampoco vuelve a subir hacia la parte superior de la web. Entonces, el usuario tiene que subir para enterarse que cambio el contenido que esta viendo. Esto es medio tosco, se deberia seleccionar un producto y la web deberia llevarme a la parte superior para visualizarlo. Quiero que ajustemos esto ahora"
contributor: "graphify"
outcome: "useful"
source_nodes: ["Product()", "RelatedProducts()", "SmoothScroll()"]
---

# Q: bro quiero que utilizes graphify para que resolvamos lo siguiente. Cuando un usuario esta navegando en nuestro catalogo, al momento se seleccionar un producto y bajar hasta el carrusel de recomendados, pausar y cuando selecciona un producto la web carga el producto seleccionado desde ese carrusel pero no recarga la web y tampoco vuelve a subir hacia la parte superior de la web. Entonces, el usuario tiene que subir para enterarse que cambio el contenido que esta viendo. Esto es medio tosco, se deberia seleccionar un producto y la web deberia llevarme a la parte superior para visualizarlo. Quiero que ajustemos esto ahora

## Answer

Expanded via graph vocab: product related card scroll smooth routes. Graph located Product() pages/Product.jsx L23, RelatedProducts() components/home/RelatedProducts.jsx L8, SmoothScroll() components/common/SmoothScroll.jsx L10. Current source confirmed route navigation restarts Lenis without resetting scroll. Changed SmoothScroll to useLayoutEffect and instant top reset on product routes without hash before Lenis initialization. Browser verification: paused carousel DET001 to LVA002 changed heading and scrollY from 850 to 0, no console errors. Production build passed.

## Outcome

- Signal: useful

## Source Nodes

- Product()
- RelatedProducts()
- SmoothScroll()