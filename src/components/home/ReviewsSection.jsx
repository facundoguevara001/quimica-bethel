import "./ReviewsSection.css";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import reviews from "../../data/reviews";

function ReviewsSection() {

    const [current, setCurrent] = useState(
    Math.floor(Math.random() * reviews.length)
);

useEffect(() => {

    const interval = setInterval(() => {

        setCurrent(prev =>

            (prev + 1) % reviews.length

        );

    }, 6000);

    return () => clearInterval(interval);

}, []);

const review = reviews[current];

    return (

        <section
    id="reviews"
    className="reviews-section"
>

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

                <div className="review-dots">

    {reviews.map((_, index) => (

        <span

            key={index}

            className={
                current === index
                    ? "dot active"
                    : "dot"
            }

        />

    ))}

</div>

            </div>

        </section>

    );

}

export default ReviewsSection;