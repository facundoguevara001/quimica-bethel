import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/home.css";
import "./styles/catalog.css";
import "./styles/productCard.css";
import "./styles/search.css";
import "./styles/categories.css";
import "./styles/responsive.css";
import "./styles/cart.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
