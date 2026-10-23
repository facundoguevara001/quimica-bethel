# Graph Report - src  (2026-09-21)

## Corpus Check
- 44 files · ~56,472 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 107 nodes · 210 edges · 10 communities
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b2d04627`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useCart
- AboutPage.jsx
- Catalog.jsx
- Home.jsx
- CatalogHeader.jsx
- App.jsx
- ReviewsSection.jsx

## God Nodes (most connected - your core abstractions)
1. `useCart()` - 15 edges
2. `RelatedProducts()` - 8 edges
3. `SectionHeader()` - 7 edges
4. `CartProvider()` - 7 edges
5. `CartDrawer()` - 6 edges
6. `CartItem()` - 6 edges
7. `products` - 6 edges
8. `Catalog()` - 5 edges
9. `CartButton()` - 4 edges
10. `CatalogHeader()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `CartItem()` --calls--> `decreaseQuantity()`  [EXTRACTED]
  src/components/cart/CartItem.jsx → src/context/CartContext.jsx
- `CartItem()` --calls--> `increaseQuantity()`  [EXTRACTED]
  src/components/cart/CartItem.jsx → src/context/CartContext.jsx
- `CartItem()` --calls--> `removeFromCart()`  [EXTRACTED]
  src/components/cart/CartItem.jsx → src/context/CartContext.jsx
- `CatalogHeader()` --calls--> `useCart()`  [EXTRACTED]
  src/components/catalog/CatalogHeader.jsx → src/context/CartContext.jsx
- `CartButton()` --calls--> `useCart()`  [EXTRACTED]
  src/components/cart/CartButton.jsx → src/context/CartContext.jsx

## Import Cycles
- None detected.

## Communities (10 total, 0 thin omitted)

### Community 0 - "useCart"
Cohesion: 0.16
Nodes (13): CartButton(), CartDrawer(), CartItem(), FeaturedCard(), RelatedProducts(), CartContext, CartProvider(), addToCart() (+5 more)

### Community 1 - "AboutPage.jsx"
Cohesion: 0.21
Nodes (8): DeliveryInfo(), zones, ReviewPolicy(), SectionHeader(), AboutUs(), ContactSection(), zones, PolicySection()

### Community 2 - "Catalog.jsx"
Cohesion: 0.20
Nodes (8): ProductCard(), ProductGrid(), products, productVariants, AboutPage(), Catalog(), Home(), Promotions()

### Community 3 - "Home.jsx"
Cohesion: 0.24
Nodes (6): FadeInSection(), DeliveryProcess(), steps, FeaturedProducts(), StatsStrip(), MainLayout()

### Community 4 - "CatalogHeader.jsx"
Cohesion: 0.22
Nodes (6): AboutHero(), CatalogHeader(), Logo(), Footer(), Hero(), Navbar()

### Community 5 - "App.jsx"
Cohesion: 0.32
Nodes (4): App(), SCROLL_SETTINGS, SmoothScroll(), AppRoutes()

### Community 6 - "ReviewsSection.jsx"
Cohesion: 0.36
Nodes (4): LocationsMap(), ReviewsSection(), locations, reviews

## Knowledge Gaps
- **5 isolated node(s):** `zones`, `SCROLL_SETTINGS`, `steps`, `zones`, `CartContext`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 21 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useCart()` connect `useCart` to `CatalogHeader.jsx`?**
  _High betweenness centrality (0.063) - this node is a cross-community bridge._
- **Why does `CartProvider()` connect `useCart` to `App.jsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `RelatedProducts()` (e.g. with `outside()` and `release()`) actually correct?**
  _`RelatedProducts()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 5 inferred relationships involving `CartProvider()` (e.g. with `addToCart()` and `clearCart()`) actually correct?**
  _`CartProvider()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `zones`, `SCROLL_SETTINGS`, `steps` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._