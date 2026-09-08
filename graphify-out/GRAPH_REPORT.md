# Graph Report - src  (2026-09-07)

## Corpus Check
- 46 files · ~56,662 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 113 nodes · 216 edges · 10 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Carrito y compra
- Informacion y contacto
- Catalogo y rutas
- Secciones animadas de inicio
- Cabeceras y navegacion
- Inicio y scroll suave
- Ubicaciones y opiniones

## God Nodes (most connected - your core abstractions)
1. `useCart()` - 15 edges
2. `SectionHeader()` - 8 edges
3. `RelatedProducts()` - 8 edges
4. `CartProvider()` - 7 edges
5. `CartDrawer()` - 6 edges
6. `CartItem()` - 6 edges
7. `products` - 5 edges
8. `Catalog()` - 5 edges
9. `CartButton()` - 4 edges
10. `CatalogHeader()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `CartItem()` --calls--> `decreaseQuantity()`  [EXTRACTED]
  components/cart/CartItem.jsx → context/CartContext.jsx
- `CartItem()` --calls--> `increaseQuantity()`  [EXTRACTED]
  components/cart/CartItem.jsx → context/CartContext.jsx
- `CartItem()` --calls--> `removeFromCart()`  [EXTRACTED]
  components/cart/CartItem.jsx → context/CartContext.jsx
- `CatalogHeader()` --calls--> `useCart()`  [EXTRACTED]
  components/catalog/CatalogHeader.jsx → context/CartContext.jsx
- `CartButton()` --calls--> `useCart()`  [EXTRACTED]
  components/cart/CartButton.jsx → context/CartContext.jsx

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "Carrito y compra"
Cohesion: 0.16
Nodes (13): CartButton(), CartDrawer(), CartItem(), FeaturedCard(), RelatedProducts(), CartContext, CartProvider(), addToCart() (+5 more)

### Community 1 - "Informacion y contacto"
Cohesion: 0.18
Nodes (10): DeliveryInfo(), zones, ReviewPolicy(), SectionHeader(), AboutUs(), ContactSection(), zones, FAQ() (+2 more)

### Community 2 - "Catalogo y rutas"
Cohesion: 0.20
Nodes (8): ProductCard(), ProductGrid(), products, productVariants, AboutPage(), Catalog(), Home(), Promotions()

### Community 3 - "Secciones animadas de inicio"
Cohesion: 0.19
Nodes (8): FadeInSection(), categories, CategorySection(), DeliveryProcess(), steps, FeaturedProducts(), StatsStrip(), MainLayout()

### Community 4 - "Cabeceras y navegacion"
Cohesion: 0.22
Nodes (6): AboutHero(), CatalogHeader(), Logo(), Footer(), Hero(), Navbar()

### Community 5 - "Inicio y scroll suave"
Cohesion: 0.32
Nodes (4): App(), SCROLL_SETTINGS, SmoothScroll(), AppRoutes()

### Community 6 - "Ubicaciones y opiniones"
Cohesion: 0.36
Nodes (4): LocationsMap(), ReviewsSection(), locations, reviews

## Knowledge Gaps
- **7 isolated node(s):** `zones`, `SCROLL_SETTINGS`, `categories`, `steps`, `zones` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 23 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useCart()` connect `Carrito y compra` to `Cabeceras y navegacion`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `CartProvider()` connect `Carrito y compra` to `Inicio y scroll suave`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `RelatedProducts()` (e.g. with `outside()` and `release()`) actually correct?**
  _`RelatedProducts()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `CartProvider()` (e.g. with `addToCart()` and `clearCart()`) actually correct?**
  _`CartProvider()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `zones`, `SCROLL_SETTINGS`, `categories` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
## Alcance y limitaciones de este mapa

Mapa estructural AST de los 46 archivos JavaScript/JSX detectados en `src/`, para orientar la integracion de scroll suave. No es una auditoria funcional ni visual. Excluye documentacion, dependencias, archivos publicos y configuracion fuera de src. `src/assets/hero.png` fue excluida de la extraccion semantica por no ser codigo. Los 32 archivos CSS son tipos no clasificados por el detector y no tienen extraccion; algunas importaciones aparecen como extremos sin nodo. No se leyeron secretos ni archivos .env.

La extraccion reporto 113 nodos y 325 relaciones originales. La construccion del grafo conserva 216 relaciones: hay 99 relaciones con extremos sin nodo y 10 pares que colapsan en el grafo no dirigido. Por tanto, el mapa es parcial y las relaciones ausentes no demuestran ausencia de dependencia. Los extremos ausentes incluyen librerias externas y CSS; ver health.json.

Extraccion determinista sin llamadas LLM: 0 tokens de entrada y salida contabilizados por Graphify. Esto no representa el consumo de la conversacion de Codex. El primer intento paralelo de AST encontro una limitacion de multiprocessing/entrada stdin en Windows y Graphify completo el trabajo mediante su fallback secuencial.
