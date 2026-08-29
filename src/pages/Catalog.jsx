import { useMemo, useState } from "react";

import products from "../data/products";

import SearchBar from "../components/catalog/SearchBar";
import ProductGrid from "../components/catalog/ProductGrid";
import CartButton from "../components/cart/CartButton";
import CartDrawer from "../components/cart/CartDrawer";
import MainLayout from "../layout/MainLayout";
import { useNavigate, useSearchParams } from "react-router-dom";

function Catalog({
    customProducts,
    title = "🧪 Catálogo"
}) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState(
        searchParams.get("buscar") || ""
    );
    const [cartOpen, setCartOpen] = useState(false);
    const [filtersOpen, setFiltersOpen] = useState(false);

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

        return sourceProducts.filter(product => {
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
    }, [
        search,
        selectedCategory,
        selectedSubcategory,
        sourceProducts
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
                <button
                    className="back-button"
                    onClick={() => navigate("/")}
                >
                    ← Volver
                </button>

                <h1 className="catalog-title">{title}</h1>

                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />

                <button
                    className="filters-mobile-button"
                    type="button"
                    onClick={() =>
                        setFiltersOpen(open => !open)
                    }
                >
                    ☰ Filtrar productos
                </button>

                <div className="catalog-layout">
                    <aside
                        className={`catalog-filters ${
                            filtersOpen ? "catalog-filters-open" : ""
                        }`}
                    >
                        <div className="filters-heading">
                            <h2>Filtrar por categoría</h2>

                            {(selectedCategory !== "Todos" ||
                                selectedSubcategory !== "Todos" ||
                                search) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                >
                                    Limpiar
                                </button>
                            )}
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
                        <p className="products-counter">
                            {filteredProducts.length} producto
                            {filteredProducts.length !== 1 ? "s" : ""}
                            {" "}encontrado
                            {filteredProducts.length !== 1 ? "s" : ""}
                        </p>

                        <ProductGrid
                            products={filteredProducts}
                            openCart={() => setCartOpen(true)}
                        />
                    </section>
                </div>

                <CartButton
                    onClick={() => setCartOpen(true)}
                />

                <CartDrawer
                    open={cartOpen}
                    onClose={() => setCartOpen(false)}
                />
            </div>
        </MainLayout>
    );
}

export default Catalog;