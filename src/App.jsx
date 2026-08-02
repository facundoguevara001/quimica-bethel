import { useState } from "react";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {

    const [showCatalog, setShowCatalog] = useState(false);
const [initialCategory, setInitialCategory] = useState("");

    return (

        <CartProvider>

            {

                showCatalog

                    ? <Catalog
    goBack={() => setShowCatalog(false)}
    initialCategory={initialCategory}
/>

                    : <Home
    openCatalog={() => {
        setInitialCategory("");
        setShowCatalog(true);
    }}
    openPromotions={() => {
        setInitialCategory("Promociones");
        setShowCatalog(true);
    }}
/>

            }

        </CartProvider>

    );

}

export default App;
