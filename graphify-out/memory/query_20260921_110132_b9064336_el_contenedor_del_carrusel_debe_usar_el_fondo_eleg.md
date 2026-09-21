---
type: "query"
date: "2026-09-21T11:01:32.940748+00:00"
question: "El contenedor del carrusel debe usar el fondo elegido y las cards de productos deben quedar iguales."
contributor: "graphify"
outcome: "useful"
source_nodes: ["FeaturedProducts()", "Home()"]
---

# Q: El contenedor del carrusel debe usar el fondo elegido y las cards de productos deben quedar iguales.

## Answer

Graph query tokens: featured home. FeaturedProducts renders the carousel container. Updated only src/styles/brand.css: .featured-products background now uses var(--ink) (#18283B), its text and .featured-title/.featured-hint use var(--paper) for contrast. Product card rules unchanged. CSS-only change; graph relationships remain unchanged. No tests, build, local server or agents were run.

## Outcome

- Signal: useful

## Source Nodes

- FeaturedProducts()
- Home()