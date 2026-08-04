import "../../styles/FeaturedCard.css";

function FeaturedCard({ product }) {

    return (

        <div className="featured-card">

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

            </div>

        </div>

    );

}

export default FeaturedCard;