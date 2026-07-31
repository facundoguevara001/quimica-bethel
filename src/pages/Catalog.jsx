import { useMemo, useState } from "react";

import products from "../data/products";

import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import ProductGrid from "../components/ProductGrid";
import CartButton from "../components/CartButton";
import CartDrawer from "../components/CartDrawer";

function Catalog({ goBack }) {

    const [search, setSearch] = useState("");
    const [cartOpen, setCartOpen] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("Todos");

    const categories = [
        "Todos",
        ...new Set(products.map(product => product.category))
    ];

    const filteredProducts = useMemo(() => {

        return products.filter(product => {

            const coincideCategoria =
                selectedCategory === "Todos" ||
                product.category === selectedCategory;

            const coincideBusqueda =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return coincideCategoria && coincideBusqueda;

        });

    }, [search, selectedCategory]);

    return (

        <div className="catalog-page">

            <button
                className="back-button"
                onClick={goBack}
            >
                ← Volver
            </button>


            <SearchBar
                search={search}
                setSearch={setSearch}
            />

            <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <ProductGrid
    products={filteredProducts}
    openCart={() => setCartOpen(true)}
/>

<CartButton
    onClick={() => setCartOpen(true)}
/>

<CartDrawer
    open={cartOpen}
    onClose={() => setCartOpen(false)}
/>

        </div>

    );

}

export default Catalog;