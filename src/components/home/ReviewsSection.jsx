import "./ReviewsSection.css";

import { useMemo } from "react";
import { FaStar } from "react-icons/fa";

import reviews from "../../data/reviews";

function ReviewsSection() {

    const review = useMemo(() => {

        return reviews[
            Math.floor(Math.random() * reviews.length)
        ];

    }, []);

    return (

        <section className="reviews-section">

            <h2 className="reviews-title">

                ⭐ Opiniones de nuestros clientes

            </h2>

            <p className="reviews-average">

                4.9 / 5 • Más de 1.200 clientes satisfechos

            </p>

            <div className="review-card">

                <div className="review-stars">

                    {Array.from({ length: review.stars }).map((_, index) => (

                        <FaStar key={index} />

                    ))}

                </div>

                <p className="review-text">

                    "{review.text}"

                </p>

                <span className="review-author">

                    — {review.author}

                </span>

            </div>

        </section>

    );

}

export default ReviewsSection;