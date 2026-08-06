import "./FeaturedCard.css";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


function FeaturedCard({ product }) {

    return (

    <Link
        to={`/producto/${product.slug}`}
        className="featured-card"
    >

        <div className="featured-image">

            <img
                src={product.image}
                alt={product.name}
            />

        </div>

        <div className="featured-info">

            <h3>{product.name}</h3>

            <span className="featured-price">

                {product.price}

            </span>

            <div className="featured-button">

                Ver promoción

                <FaArrowRight />

            </div>

        </div>

    </Link>

);

}

export default FeaturedCard;