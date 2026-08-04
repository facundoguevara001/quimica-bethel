import "./Hero.css";

import { motion } from "framer-motion";

function Hero() {

    return (

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

    );

}

export default Hero;