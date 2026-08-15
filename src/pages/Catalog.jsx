import { useMemo, useState } from "react";

import products from "../data/products";

import SearchBar from "../components/catalog/SearchBar";
import Categories from "../components/catalog/Categories";
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
    const [search, setSearch] = useState(searchParams.get("buscar") || "");
    const [cartOpen, setCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const sourceProducts = customProducts || products;
    const categories = 
    
    [
    "Todos",
    ...new Set(sourceProducts.map(product => product.category))
];


     const filteredProducts = useMemo(() => {

       return sourceProducts.filter(product => {

            const coincideCategoria =
                selectedCategory === "Todos" ||
                product.category === selectedCategory;

            const coincideBusqueda =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            return coincideCategoria && coincideBusqueda;

        });

    }, [search, selectedCategory, sourceProducts]);

    return (

    <MainLayout>

        <div className="catalog-page">

            <button
    className="back-button"
    onClick={() => navigate("/")}
>
    ← Volver
    
</button>

<h1 className="catalog-title">
    {title}
</h1>


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
          
     </MainLayout>

    );

}

export default Catalog;