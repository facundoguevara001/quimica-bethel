---
type: "query"
date: "2026-09-21T11:07:52.464154+00:00"
question: "Ajustar espacios y tamaños del home para PC y móvil; el fondo claro a cambiar es la franja de estadísticas, no el carrusel."
contributor: "graphify"
outcome: "useful"
source_nodes: ["Home()", "FeaturedProducts()", "StatsStrip()", "FadeInSection()"]
---

# Q: Ajustar espacios y tamaños del home para PC y móvil; el fondo claro a cambiar es la franja de estadísticas, no el carrusel.

## Answer

Queried graph with home featured stats reviews. Implemented home-scoped responsive styling in brand.css: constrained FadeInSection wrappers via optional className, shared 1180px content width, reduced section/header/carousel/footer spacing, responsive hero and delivery steps, compact reviews, and dark StatsStrip with light text. Carousel background and card colors preserved. FeaturedProducts uses measured loop width, motion value and frame delta for desktop movement; native horizontal scrolling on mobile/coarse pointer/reduced motion. No server, build, tests or agents. Ran graphify update src; tool reported no code-graph topology changes. Recorded implementation details here for future queries.

## Outcome

- Signal: useful

## Source Nodes

- Home()
- FeaturedProducts()
- StatsStrip()
- FadeInSection()