import "./FeaturedCard.css";
import { Link } from "react-router-dom";

function FeaturedCard({ product }) {
    return (

        <Link
            to={`/producto/${product.slug}`}
            className="featured-card"
        >

            <div className="featured-content">

                {/* PARTE DE ATRÁS */}
                <div className="featured-back">

                    <div className="featured-back-content">

                        <div className="card-glow"></div>

                        <div className="featured-circle"></div>

                        <div
                            className="featured-circle"
                            id="bottom"
                        ></div>

                        <div
                            className="featured-circle"
                            id="right"
                        ></div>

                        <img
                            src={product.image}
                            alt={product.name}
                            className="featured-back-image"
                        />

                    </div>

                </div>

                {/* PARTE DELANTERA */}
                <div className="featured-front">

                    <img
                        src={product.image}
                        alt={product.name}
                        className="featured-front-image"
                    />

                    <div className="featured-front-content">

                        <span className="featured-badge">
                            {product.category}
                        </span>

                        <div className="featured-description">

                            <div className="featured-title">

                                <h3>{product.name}</h3>

                            </div>

                            <span className="featured-price">
                                {product.price}
                            </span>

                            <div className="featured-button">
                                Ver producto →
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Link>

    );
}

export default FeaturedCard;