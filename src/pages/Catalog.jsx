import { useMemo, useState } from "react";

import products from "../data/products";

import CatalogHeader from "../components/catalog/CatalogHeader";
import ProductGrid from "../components/catalog/ProductGrid";
import CartDrawer from "../components/cart/CartDrawer";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

function Catalog({
    customProducts,
    title
}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("buscar") || ""
    );
    const [cartOpen, setCartOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const [filtersCollapsed, setFiltersCollapsed] = useState(false);
    const [sortOrder, setSortOrder] = useState("default");

    const [selectedCategory, setSelectedCategory] =
        useState("Todos");

    const [selectedSubcategory, setSelectedSubcategory] =
        useState("Todos");

    const sourceProducts = customProducts || products;

    const categories = useMemo(
        () => [
            "Todos",
            ...new Set(
                sourceProducts.map(product => product.category)
            )
        ],
        [sourceProducts]
    );

    const subcategories = useMemo(() => {
        const productsInCategory =
            selectedCategory === "Todos"
                ? sourceProducts
                : sourceProducts.filter(
                    product =>
                        product.category === selectedCategory
                );

        return [
            "Todos",
            ...new Set(
                productsInCategory.map(
                    product => product.subcategory
                )
            )
        ];
    }, [selectedCategory, sourceProducts]);

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
        setSelectedCategory(category);
        setSelectedSubcategory("Todos");
    }

    function clearFilters() {
        setSearch("");
        setSelectedCategory("Todos");
        setSelectedSubcategory("Todos");
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

                            {categories.map(category => (
                                <button
                                    key={category}
                                    type="button"
                                    className={
                                        selectedCategory === category
                                            ? "filter-option filter-option-active"
                                            : "filter-option"
                                    }
                                    onClick={() =>
                                        selectCategory(category)
                                    }
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {subcategories.length > 1 && (
                            <div className="filter-group">
                                <span>Subcategorías</span>

                                {subcategories.map(subcategory => (
                                    <button
                                        key={subcategory}
                                        type="button"
                                        className={
                                            selectedSubcategory === subcategory
                                                ? "filter-option filter-option-active"
                                                : "filter-option"
                                        }
                                        onClick={() =>
                                            setSelectedSubcategory(
                                                subcategory
                                            )
                                        }
                                    >
                                        {subcategory}
                                    </button>
                                ))}
                            </div>
                        )}
                    </aside>

                    <section className="catalog-results">
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
