import "./FeaturedCard.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaWhatsapp, FaMinus, FaPlus } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

function FeaturedCard({ product, openCart }) {

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const unitPrice = Number(product.salePrice);

    const subtotal = unitPrice * quantity;

    const whatsappMessage = encodeURIComponent(

`¡Hola! 👋 Quiero hacer este pedido:

🧴 ${quantity} x ${product.name}
💲 Subtotal: $${subtotal.toLocaleString("es-AR")}

¿Confirmamos?`

    );

    return (

        <div className="featured-card">

            <Link
                to={`/producto/${product.slug}`}
                className="featured-card-image"
            >

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

            </Link>

            <div className="featured-card-info">

                <Link to={`/producto/${product.slug}`}>

                    <h3>

                        {product.name}

                    </h3>

                </Link>

                <span className="featured-card-price">

                    {product.price}

                </span>

                <div className="featured-card-qty">

                    <button
                        type="button"
                        onClick={() =>
                            setQuantity(q => Math.max(1, q - 1))
                        }
                        aria-label="Restar cantidad"
                    >
                        <FaMinus />
                    </button>

                    <span>{quantity}</span>

                    <button
                        type="button"
                        onClick={() => setQuantity(q => q + 1)}
                        aria-label="Sumar cantidad"
                    >
                        <FaPlus />
                    </button>

                </div>

                <a
                    className="featured-card-whatsapp"
                    href={`https://wa.me/5491125218692?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaWhatsapp />
                    Pedir por WhatsApp
                </a>

                <button
                    className="featured-card-add"
                    onClick={() => {

                        addToCart(product, quantity);

                        if (openCart) openCart();

                    }}
                >
                    🛒 Agregar al carrito
                </button>

            </div>

        </div>

    );

}

export default FeaturedCard;
