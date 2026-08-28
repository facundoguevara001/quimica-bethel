import "./ProductCard.css";
import { FaWhatsapp, FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

function ProductCard({ product, openCart }) {
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);

    const stock = product.stock ?? 999;

    const unitPrice =
        Number(product.cost) * (Number(product.margin) + 1);

    const subtotal = unitPrice * quantity;

    const whatsappMessage = encodeURIComponent(

`¡Hola! 👋 Quiero hacer este pedido:

🧴 ${quantity} x ${product.name}
💲 Subtotal: $${subtotal.toLocaleString("es-AR")}

¿Confirmamos?`

    );

    return (

        <motion.div
            className="product-card"
            whileHover={{
                y: -8,
                scale: 1.02
            }}
            transition={{
                duration: 0.2
            }}
        >

            <div className="product-image">

              <img
                 src={product.image}
                 alt={product.name}
                 loading="lazy"
                 />

             <div className="image-overlay">

             <Link
              to={`/producto/${product.slug}`}
              className="view-product-button"
             
        >


            👁 Ver detalles
        </Link>

    </div>

</div>

            <div className="product-info">

                <h3>{product.name}</h3>

                <p>🧴 {product.description}</p>

                <span className="price">
                    {product.price}
                </span>

                {
                    stock <= 0
            
                    ? (
                        <span className="stock agotado">
                            Sin stock
                        </span>
                    )
                    : (
                        <span className="stock disponible">
                            Disponible
                        </span>
                    )
                }

                <div className="qty-stepper">

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
                    className="buy-button"
                    href={`https://wa.me/5491125218692?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaWhatsapp />
                    Pedir por WhatsApp
                </a>
                <button
    className="cart-button"
    onClick={() => {

        addToCart(product, quantity);

        openCart();

    }}
>
    🛒 Agregar al carrito
</button>

            </div>

        </motion.div>

    );

}

export default ProductCard;