import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

function ProductCard({ product, openCart }) {
    const { addToCart } = useCart();

    const stock = product.stock ?? 999;

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

            <img
                src={product.image}
                alt={product.name}
                loading="lazy"
            />

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

                <a
                    className="buy-button"
                    href={`https://wa.me/5491125218692?text=Hola,%20quiero%20consultar%20por%20${product.name}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaWhatsapp />
                    Consultar
                </a>
                <button
    className="cart-button"
    onClick={() => {

        addToCart(product);

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