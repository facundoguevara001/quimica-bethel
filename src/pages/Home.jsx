import {
  FaWhatsapp,
  FaInstagram,
  FaChevronRight,
  FaBoxOpen,
  FaTag,
} from "react-icons/fa";

import { motion } from "framer-motion";

import products from "../data/products";
import ProductCard from "../components/ProductCard";

function Home({ openCatalog }) {
  const featuredProducts = products.filter(
    product => product.featured
);
  return (
    <div className="home">

      <motion.div
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <div className="logo-container">

    <img
        src="/logo.png"
        alt="Química Bethel"
        className="logo-image"
    />

</div>

<h1 className="hero-title">
    Química Bethel
</h1>

<p className="hero-description">
    Productos de limpieza profesional
    <br />
    para hogares, empresas e industrias.
</p>

      </motion.div>

      <div className="home-links">


</div>

<section className="featured-products">

    <h2 className="featured-title">
        ⭐ Productos destacados
    </h2>

    <div className="featured-grid">

        {featuredProducts.map(product => (

            <ProductCard
                key={product.id}
                product={product}
            />

        ))}

    </div>

    <button
    className="catalog-button"
    onClick={openCatalog}
>

    <div className="catalog-left">

        <FaBoxOpen className="catalog-icon" />

        <div className="catalog-text">

            <span className="catalog-badge">
                {products.length} productos disponibles
            </span>

            <h2>Ver Catálogo Completo</h2>

            <p>
                Encontrá productos para el hogar, empresas y comercios.
            </p>

        </div>

    </div>

    <FaChevronRight className="catalog-arrow" />

</button>

</section>

</div>
);

}

export default Home;