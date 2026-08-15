import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {

    return (

        <motion.div
            className="hero"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >

            <div className="hero-content">

                <div className="logo-container">

                    <img
                        src="/logo.png"
                        alt="Química Bethel"
                        className="logo-image"
                    />

                </div>

                <h1 className="hero-title">

                    Todo lo que necesitás para limpiar,
                    <br />
                    en un solo pedido mensual

                </h1>

                <p className="hero-description">

                    Comprá tus productos de limpieza y lavandería a precio
                    de por mayor y recibilos en la puerta de tu casa o negocio.

                </p>

                <div className="hero-actions">

                    <Link
                        to="/catalogo"
                        className="hero-cta-primary"
                    >

                        Ver catálogo completo →

                    </Link>

                    <a

                    
                        href="https://wa.me/5491125218692?text=Hola,%20quiero%20hacer%20un%20pedido"
                        target="_blank"
                        rel="noreferrer"
                        className="hero-cta-secondary"
                    >

                        Consultar por WhatsApp

                    </a>

                </div>

            </div>

        </motion.div>

    );

}

export default Hero;