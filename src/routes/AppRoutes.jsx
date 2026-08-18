import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Catalog from "../pages/Catalog";
import Promotions from "../pages/Promotions";
import Product from "../pages/Product";
import AboutPage from "../pages/AboutPage";

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
                path="/nosotros"
                element={<AboutPage />}
            />

            <Route
               path="/producto/:slug"
               element={<Product />}
            />

            <Route
                path="*"
                element={<Navigate to="/" />}
            />

        </Routes>

    );

}

export default AppRoutes;