import { motion } from "framer-motion";

import FeaturedCard from "./FeaturedCard";
import "./FeaturedProducts.css";
import { useState } from "react";
import { useAnimationFrame } from "framer-motion";

function FeaturedProducts({

    cards,

    title = "⭐ Productos destacados",

    openCart

}) {

    const [x, setX] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

useAnimationFrame(() => {

    if (isPaused) return;

    setX(prev => {

        const next = prev - 0.6;

        if (next <= -(cards.length / 2 * 368)) {

            return 0;

        }

        return next;

    });

});

    return (

        <section className="featured-products">

            <div className="featured-header">

                <h2 className="featured-title">
                    {title}
                </h2>

                <span className="featured-hint">

                    Elegí cantidad y pedí directo →

                </span>

            </div>

            <div
                className="featured-slider"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >

                <motion.div
                    className="featured-track"
                    style={{ x }}
                >

                    {cards.map((product, index) => (

                        <div
                            key={index}
                            className="featured-item"
                        >

                            <FeaturedCard
                                product={product}
                                openCart={openCart}
                            />

                        </div>

                    ))}

                </motion.div>

            </div>

        </section>

    );

}

export default FeaturedProducts;