import { motion, useMotionValue, useReducedMotion } from "framer-motion";

import FeaturedCard from "./FeaturedCard";
import "./FeaturedProducts.css";
import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

function FeaturedProducts({

    cards,

    title = "⭐ Productos destacados",

    openCart

}) {

    const x = useMotionValue(0);
    const track = useRef(null);
    const loopWidth = useRef(0);
    const reduceMotion = useReducedMotion();
    const [isPaused, setIsPaused] = useState(false);
    const [manualScroll, setManualScroll] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 768px), (pointer: coarse)");
        const update = () => {
            setManualScroll(media.matches);
            x.set(0);
        };
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, [x]);

    useEffect(() => {
        const element = track.current;
        if (!element) return;
        const measure = () => {
            const first = element.children[0];
            const repeated = element.children[cards.length / 2];
            loopWidth.current = first && repeated
                ? repeated.offsetLeft - first.offsetLeft
                : 0;
            x.set(0);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
    }, [cards.length, x]);

    useAnimationFrame((_, delta) => {
        if (isPaused || manualScroll || reduceMotion || !loopWidth.current) return;
        const next = x.get() - Math.min(delta, 64) * 0.036;
        x.set(-((-next) % loopWidth.current));
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
                onFocusCapture={() => setIsPaused(true)}
                onBlurCapture={event => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
                }}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
                onTouchCancel={() => setIsPaused(false)}
            >

                <motion.div
                    ref={track}
                    className="featured-track"
                    style={{ x: manualScroll || reduceMotion ? 0 : x }}
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
