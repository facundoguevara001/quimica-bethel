import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Promotions from "../pages/Promotions";
import Product from "../pages/Product";

function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/catalogo"
                element={<Catalog />}
            />

            <Route
                path="/promociones"
                element={<Promotions />}
            />

            <Route
                path="*"
                element={<Navigate to="/" />}
            />
            <Route
               path="/producto/:slug"
               element={<Product />}
            />

        </Routes>

    );

}

export default AppRoutes;