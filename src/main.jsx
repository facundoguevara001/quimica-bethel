import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/catalog.css";
import "./styles/search.css";
import "./styles/categories.css";
import "./styles/responsive.css";
import "./styles/cart.css";
import "./components/home/FeaturedCard.css";
import "./styles/layout.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <App />

    </BrowserRouter>

  </React.StrictMode>
);
