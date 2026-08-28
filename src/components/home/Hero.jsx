import "./Hero.css";
import { motion } from "framer-motion";
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

                        Productos de limpieza a buen precio

                    </span>

                    <h1 className="hero-title">

                        Productos de limpieza
                        <em> a buen precio</em>

                    </h1>

                    <p className="hero-description">

                        Te los llevamos a tu casa.

                    </p>

                    <ul className="hero-benefits">

                        <li>🛡️ Sin adelanto</li>

                        <li>🚚 Entrega a domicilio</li>

                        <li>👀 Revisás antes de pagar</li>

                        <li>💰 Pagás solamente lo que te quedás</li>

                    </ul>

                    <div className="hero-actions">

                        <a
                            href="https://wa.me/5491125218692?text=Hola,%20quiero%20hacer%20un%20pedido"
                            target="_blank"
                            rel="noreferrer"
                            className="hero-cta-primary"
                        >

                            Pedir por WhatsApp ↗

                        </a>

                    </div>

                </div>

                <div className="hero-footer">

                    <span className="hero-caption">

                        Pedido simple, sin adelanto

                    </span>

                    <span className="hero-shipping-badge">

                        Recibís · Revisás · Pagás

                    </span>

                </div>

            </div>

        </motion.section>

    );

}

export default Hero;
