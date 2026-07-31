import { useState } from "react";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

import { CartProvider } from "./context/CartContext";

import "./App.css";

function App() {

    const [showCatalog, setShowCatalog] = useState(false);

    return (

        <CartProvider>

            {

                showCatalog

                    ? <Catalog goBack={() => setShowCatalog(false)} />

                    : <Home openCatalog={() => setShowCatalog(true)} />

            }

        </CartProvider>

    );

}

export default App;
