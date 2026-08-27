import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import reviews from "../../data/reviews";
import LocationsMap from "./LocationsMap";
import "./ReviewsSection.css";

function ReviewsSection() {
    const [current, setCurrent] = useState(() =>
        Math.floor(Math.random() * reviews.length)
    );
    const review = reviews[current];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((previous) => (previous + 1) % reviews.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section id="reviews" className="reviews-section">
            <div className="reviews-content">
                <div className="reviews-panel">
                    <h2 className="reviews-title">⭐ Opiniones de nuestros clientes</h2>
                    <p className="reviews-average">
                        4.9 / 5 • Más de 1.200 clientes satisfechos
                    </p>

                    <div className="review-card">
                        <div className="review-stars" aria-label={`${review.stars} de 5 estrellas`}>
                            {Array.from({ length: review.stars }).map((_, index) => (
                                <FaStar key={index} aria-hidden="true" />
                            ))}
                        </div>

                        <p className="review-text">“{review.text}”</p>
                        <span className="review-author">— {review.author}</span>

                        <div className="review-dots" aria-label="Carrusel de opiniones">
                            {reviews.map((item, index) => (
                                <span
                                    key={item.id}
                                    className={current === index ? "dot active" : "dot"}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <LocationsMap />
            </div>
        </section>
    );
}

export default ReviewsSection;
