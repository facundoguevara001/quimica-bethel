---
type: "query"
date: "2026-09-21T11:31:23.896627+00:00"
question: "Eliminar preguntas frecuentes y tarjeta Desde 2020 QK de Nosotros y ajustar solo esa pagina en espacios y fondos."
contributor: "graphify"
outcome: "useful"
source_nodes: ["AboutPage()", "AboutUs()"]
---

# Q: Eliminar preguntas frecuentes y tarjeta Desde 2020 QK de Nosotros y ajustar solo esa pagina en espacios y fondos.

## Answer

Graph query used about faq policy delivery. Removed FAQ import/render from AboutPage and deleted its exclusive JSX/CSS. Removed decorative QK mark and Since 2020 block from AboutUs and exclusive styling, preserving company copy with section number 01. Added about-page class and AboutPage.css scoped rules: ink background, surface cards, light text, primary buttons, consistent 1180px width, compact responsive spacing, single-column mobile grids. Existing section IDs and content of policies, shipping, review and contact preserved. Home files and shared brand styles unchanged in this task. Updated Graphify source graph and synchronized root artifacts. No server, build, tests or agents.

## Outcome

- Signal: useful

## Source Nodes

- AboutPage()
- AboutUs()