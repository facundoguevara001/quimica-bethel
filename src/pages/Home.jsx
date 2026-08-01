import {
  FaFacebookF,
  FaChevronRight,
  FaBoxOpen,
  FaTag,
} from "react-icons/fa";
import FeaturedCard from "../components/FeaturedCard";

import { motion, useAnimationFrame } from "framer-motion";
import { useEffect, useState } from "react";

import products from "../data/products";


function Home({ openCatalog }) {
    const [ordersToday, setOrdersToday] = useState(0);
  const featuredProducts = products.filter(
    product => product.featured
);
const [x, setX] = useState(0);

const cards = [...featuredProducts, ...featuredProducts];

useAnimationFrame(() => {

    setX(prev => {

        const next = prev - 0.6;

        if (next <= -(featuredProducts.length * 310)) {
            return 0;
        }

        return next;

    });

});

useEffect(() => {

    function calculateOrders() {

        const now = new Date();

        const argentina = new Date(
            now.toLocaleString("en-US", {
                timeZone: "America/Argentina/Buenos_Aires"
            })
        );

        const hour = argentina.getHours();
        const minute = argentina.getMinutes();

        const currentMinutes = hour * 60 + minute;

        const start = 8 * 60;
        const end = 17 * 60;

        if (currentMinutes <= start) {
            setOrdersToday(0);
            return;
        }

        if (currentMinutes >= end) {
            setOrdersToday(100);
            return;
        }

        const progress =
            (currentMinutes - start) /
            (end - start);

        setOrdersToday(
            Math.floor(progress * 100)
        );
    }

    calculateOrders();

    const interval = setInterval(
        calculateOrders,
        60000
    );

    return () => clearInterval(interval);

}, []);


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
    Química Bet. Inc
</h1>

<p className="hero-description">
    Productos de limpieza de calidad
    <br />
    para tu hogar y negocio 🌿
</p>

      </motion.div>

      <div className="home-links">

    {/* CATÁLOGO */}

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


    {/* PROMOCIONES */}

    <button className="home-button promo-button">

        <div>

            <FaTag />

            <span>Ofertas y promociones</span>

        </div>

        <FaChevronRight />

    </button>


    {/* FACEBOOK */}

    <a
        className="home-button"
        href="https://facebook.com/"
        target="_blank"
        rel="noreferrer"
    >

        <div>

            <FaFacebookF  />

            <span>Facebook</span>

        </div>

        <FaChevronRight />

    </a>

</div>

<section className="featured-products">

    <h2 className="featured-title">
        ⭐ Productos destacados
    </h2>

    <div className="featured-slider">

    <motion.div
        className="featured-track"
        style={{ x }}
    >

        {cards.map((product, index) => (

            <div
                key={index}
                className="featured-item"
            >

                <FeaturedCard product={product} />

            </div>

        ))}

    </motion.div>

</div>


</section>

</div>
);

}

export default Home;