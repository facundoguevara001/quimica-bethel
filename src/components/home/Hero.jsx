import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

function Hero() {

    return (

        <motion.section
            className="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >

            {/* FOTO DE FONDO */}

            <div className="hero-bg">

                <img
                    src="/hero.jpg"
                    alt="Logística Química Bethel"
                    className="hero-bg-image"
                />

                <div className="hero-overlay" />

            </div>

            {/* CONTENIDO */}

            <div className="hero-inner">

                <Navbar transparent />

                <div className="hero-content">

                    <span className="hero-badge">

                        Mayorista y minorista

                    </span>

                    <h1 className="hero-title">

                        Todo lo que necesitás para{" "}
                        <em>limpiar</em>, en un solo pedido mensual.

                    </h1>

                    <p className="hero-description">

                        Comprá tus productos de limpieza y lavandería{" "}
                        <strong>a precio de por mayor</strong> y recibilos
                        en la puerta de tu casa o negocio.

                    </p>

                    <div className="hero-actions">

                        <Link
                            to="/catalogo"
                            className="hero-cta-primary"
                        >

                            Ver catálogo →

                        </Link>

                        <a
                            href="https://wa.me/5491125218692?text=Hola,%20quiero%20hacer%20un%20pedido"
                            target="_blank"
                            rel="noreferrer"
                            className="hero-cta-secondary"
                        >

                            Consultar por WhatsApp ↗

                        </a>

                    </div>

                </div>

                <div className="hero-footer">

                    <span className="hero-caption">

                        01 · Soluciones de limpieza profesional

                    </span>

                    <span className="hero-shipping-badge">

                        📦 Envío bonificado en compras mayores a $50.000

                    </span>

                </div>

            </div>

        </motion.section>

    );

}

export default Hero;