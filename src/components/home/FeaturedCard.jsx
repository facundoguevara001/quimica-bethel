import "./FeaturedCard.css";
import { Link } from "react-router-dom";

function FeaturedCard({ product }) {

    return (

        <Link
            to={`/producto/${product.slug}`}
            className="featured-card"
        >

            <div className="featured-card-image">

                <span className="featured-card-tag">

                    {product.category}

                </span>

                <span className="featured-card-size">

                    {product.description}

                </span>

                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                />

            </div>

            <div className="featured-card-info">

                <h3>

                    {product.name}

                </h3>

                <span className="featured-card-cta">

                    Tocá para ver precio →

                </span>

            </div>

        </Link>

    );

}

export default FeaturedCard;