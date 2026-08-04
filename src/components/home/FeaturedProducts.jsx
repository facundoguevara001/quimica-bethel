import { motion } from "framer-motion";

import FeaturedCard from "./FeaturedCard";

function FeaturedProducts({ cards, x }) {

    return (

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