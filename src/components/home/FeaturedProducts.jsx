import { motion } from "framer-motion";

import FeaturedCard from "./FeaturedCard";
import "./FeaturedProducts.css";
import { useState } from "react";
import { useAnimationFrame } from "framer-motion";

function FeaturedProducts({

    cards,

    title = "⭐ Productos destacados"

}) {

    const [x, setX] = useState(0);

useAnimationFrame(() => {

    setX(prev => {

        const next = prev - 0.6;

        if (next <= -(cards.length / 2 * 310)) {

            return 0;

        }

        return next;

    });

});

    return (

        <section className="featured-products">

            <h2 className="featured-title">
    {title}
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

                            <FeaturedCard
                                product={product}
                            />

                        </div>

                    ))}

                </motion.div>

            </div>

        </section>

    );

}

export default FeaturedProducts;