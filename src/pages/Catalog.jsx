import { useMemo, useState } from "react";

import products from "../data/products";

import CatalogHeader from "../components/catalog/CatalogHeader";
import ProductGrid from "../components/catalog/ProductGrid";
import CartDrawer from "../components/cart/CartDrawer";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

const FEATURED_CATEGORIES = [
    "📦 Packs y ofertas",
    "Nuestros productos",
    "Todo para tu ropa"
];
const CATEGORY_ORDER = FEATURED_CATEGORIES;
const SUBCATEGORY_ORDER = {
    "Nuestros productos": [
        "Desodorantes para piso",
        "Lavandinas y Cloros",
        "Jabones y Suavizantes",
        "Detergentes y Lavavajillas",
        "Desengrasantes",
        "Shampoos"
    ],
    "Todo para tu ropa": [
        "Líquidos",
        "Perfumes para ropa",
        "Difusores aromáticos",
        "Accesorios"
    ],
    "🧰 Accesorios y equipamiento": ["Aerosoles"],
    "🏠 Hogar y varios": ["Accesorios de baño"]
};

function Catalog({
    customProducts,
    title
}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sourceProducts = customProducts || products;
    const defaultCategory = sourceProducts.some(
        product => product.category === FEATURED_CATEGORIES[0]
    ) ? FEATURED_CATEGORIES[0] : "Todos";

    const [search, setSearch] = useState(
        searchParams.get("buscar") || ""
    );
    const [cartOpen, setCartOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filtersCollapsed, setFiltersCollapsed] = useState(false);
    const [sortOrder, setSortOrder] = useState("default");

    const [selectedCategory, setSelectedCategory] =
        useState(defaultCategory);

    const [selectedSubcategory, setSelectedSubcategory] =
        useState("Todos");
    const [expandedCategory, setExpandedCategory] = useState(defaultCategory);

    const categories = useMemo(
        () => {
            const availableCategories = new Set(
                sourceProducts.map(product => product.category)
            );
            const orderedCategories = [
                ...CATEGORY_ORDER.filter(category => availableCategories.has(category)),
                ...[...availableCategories].filter(
                    category => !CATEGORY_ORDER.includes(category)
                )
            ];

            return ["Todos", ...orderedCategories];
        },
        [sourceProducts]
    );

    const subcategoriesByCategory = useMemo(() => {
        const groupedSubcategories = new Map();

        categories.forEach(category => {
            if (category === "Todos") return;

            const availableSubcategories = new Set(
                sourceProducts
                    .filter(product => product.category === category)
                    .map(product => product.subcategory)
                    .filter(Boolean)
            );
            const preferredSubcategories = SUBCATEGORY_ORDER[category] || [];
            const orderedSubcategories = [
                ...preferredSubcategories.filter(
                    subcategory => availableSubcategories.has(subcategory) ||
                        (category === "Todo para tu ropa" && subcategory === "Accesorios")
                ),
                ...[...availableSubcategories].filter(
                    subcategory => !preferredSubcategories.includes(subcategory)
                )
            ];

            groupedSubcategories.set(category, orderedSubcategories);
        });

        return groupedSubcategories;
    }, [categories, sourceProducts]);

    const filteredProducts = useMemo(() => {
        const normalizedSearch = search.toLowerCase().trim();

        const matches = sourceProducts.filter(product => {
            const matchesCategory =
                selectedCategory === "Todos" ||
                product.category === selectedCategory;

            const matchesSubcategory =
                selectedSubcategory === "Todos" ||
                product.subcategory === selectedSubcategory;

            const searchableText = [
                product.name,
                product.category,
                product.subcategory,
                product.brand
            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !normalizedSearch ||
                searchableText.includes(normalizedSearch);

            return (
                matchesCategory &&
                matchesSubcategory &&
                matchesSearch
            );
        });

        return [...matches].sort((firstProduct, secondProduct) => {
            const firstPrice = Number(firstProduct.minPrice ?? firstProduct.salePrice ?? 0);
            const secondPrice = Number(secondProduct.minPrice ?? secondProduct.salePrice ?? 0);

            if (sortOrder === "price-ascending") {
                return firstPrice - secondPrice;
            }

            if (sortOrder === "price-descending") {
                return secondPrice - firstPrice;
            }

            return 0;
        });
    }, [
        search,
        selectedCategory,
        selectedSubcategory,
        sourceProducts,
        sortOrder
    ]);

    function selectCategory(category) {
        const isAlreadyExpanded = expandedCategory === category;
        setSelectedCategory(category);
        setSelectedSubcategory("Todos");
        setExpandedCategory(category === "Todos" || isAlreadyExpanded ? null : category);
    }

    function clearFilters() {
        setSearch("");
        setSelectedCategory("Todos");
        setSelectedSubcategory("Todos");
        setExpandedCategory(null);
    }

    return (
        <MainLayout>
            <div className="catalog-page">
                <CatalogHeader
                    search={search}
                    setSearch={setSearch}
                    onBack={() => navigate("/")}
                    onOpenCart={() => setCartOpen(true)}
                />

                {title && <h1 className="catalog-title">{title}</h1>}

                <button
                    className="filters-mobile-button"
                    type="button"
                    onClick={() =>
                        setFiltersOpen(open => !open)
                    }
                >
                    ☰ Filtrar productos
                </button>

                <div className={`catalog-layout ${
                    filtersCollapsed ? "catalog-layout-filters-collapsed" : ""
                }`}>
                    <aside
                        className={`catalog-filters ${
                            filtersOpen ? "catalog-filters-open" : ""
                        } ${filtersCollapsed ? "catalog-filters-collapsed" : ""}`}
                    >
                        <div className="filters-heading">
                            <h2 className="filters-title">Filtrar por categoría</h2>

                            <div className="filters-actions">
                                {(selectedCategory !== "Todos" ||
                                    selectedSubcategory !== "Todos" ||
                                    search) && (
                                    <button
                                        className="clear-filters-button"
                                        type="button"
                                        onClick={clearFilters}
                                    >
                                        Limpiar
                                    </button>
                                )}

                                <button
                                    className="filters-collapse-button"
                                    type="button"
                                    aria-expanded={!filtersCollapsed}
                                    aria-label={filtersCollapsed
                                        ? "Mostrar filtros por categoría"
                                        : "Minimizar filtros por categoría"}
                                    onClick={() => setFiltersCollapsed(collapsed => !collapsed)}
                                >
                                    {filtersCollapsed ? "›" : "‹"}
                                </button>
                            </div>
                        </div>

                        <div className="filter-group">
                            <span>Categorías</span>
                            <div className="filter-category-list">
                                {categories.map((category, index) => {
                                    const subcategories = subcategoriesByCategory.get(category) || [];
                                    const isExpanded = expandedCategory === category;
                                    const subcategoryListId = `filter-subcategories-${index}`;

                                    return (
                                        <div className="filter-category-item" key={category}>
                                            <button
                                                type="button"
                                                className={`filter-option filter-category-option${selectedCategory === category ? " filter-option-active" : ""}${FEATURED_CATEGORIES.includes(category) ? ` category-priority-${FEATURED_CATEGORIES.indexOf(category) + 1}` : ""}`}
                                                aria-expanded={isExpanded}
                                                aria-controls={subcategories.length > 0 ? subcategoryListId : undefined}
                                                onClick={() => selectCategory(category)}
                                            >
                                                <span>{category}</span>
                                                {category !== "Todos" && subcategories.length > 0 && (
                                                    <span className={`filter-category-chevron${isExpanded ? " is-expanded" : ""}`} aria-hidden="true">⌄</span>
                                                )}
                                            </button>

                                            {isExpanded && subcategories.length > 0 && (
                                                <div className="filter-subcategory-list" id={subcategoryListId}>
                                                    <button
                                                        type="button"
                                                        className={`filter-option filter-subcategory-option${selectedSubcategory === "Todos" ? " filter-option-active" : ""}`}
                                                        onClick={() => setSelectedSubcategory("Todos")}
                                                    >
                                                        Todos
                                                    </button>
                                                    {subcategories.map(subcategory => (
                                                        <button
                                                            key={subcategory}
                                                            type="button"
                                                            className={`filter-option filter-subcategory-option${selectedSubcategory === subcategory ? " filter-option-active" : ""}`}
                                                            onClick={() => setSelectedSubcategory(subcategory)}
                                                        >
                                                            {subcategory}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    <section className="catalog-results">
                        {selectedSubcategory === "Desodorantes para piso" && (
                            <h2 className="catalog-results-title">Nuestras Fragancias</h2>
                        )}
                        <div className="catalog-results-toolbar">
                            <p className="products-counter">
                                {filteredProducts.length} producto
                                {filteredProducts.length !== 1 ? "s" : ""}
                                {" "}encontrado
                                {filteredProducts.length !== 1 ? "s" : ""}
                            </p>

                            <label className="sort-control">
                                <span>Ordenar por</span>
                                <select
                                    value={sortOrder}
                                    onChange={event => setSortOrder(event.target.value)}
                                >
                                    <option value="default">Relevancia</option>
                                    <option value="price-ascending">Precio: menor a mayor</option>
                                    <option value="price-descending">Precio: mayor a menor</option>
                                </select>
                            </label>
                        </div>

                        <ProductGrid
                            products={filteredProducts}
                            openCart={() => setCartOpen(true)}
                        />
                    </section>
                </div>

                <CartDrawer
                    open={cartOpen}
                    onClose={() => setCartOpen(false)}
                />
            </div>
        </MainLayout>
    );
}

export default Catalog;
