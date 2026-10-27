import "./ProductCard.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const characteristics = String(product.characteristics || "")
        .split(/\r?\n|[•●▪]\s*|;|(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÜÑ0-9])/u)
        .map((item) => item.trim().replace(/^[-*]\s*/, ""))
        .filter(Boolean);

    const variantsCount = product.variants?.length || 1;

    return (
        <motion.article
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

                <p className="product-presentation">
                    📦 {variantsCount > 1
                        ? `${variantsCount} presentaciones disponibles`
                        : product.variantLabel}
                </p>

                {characteristics.length > 0 && (
                    <section className="product-characteristics" aria-label="Características">
                        <h4>Características</h4>
                        <ul>
                            {characteristics.map((item, index) => (
                                <li key={`${index}-${item}`}>{item}</li>
                            ))}
                        </ul>
                    </section>
                )}

                <span className="product-order-note">
                    🛡️ Recibís, revisás y pagás
                </span>

                <span className="price">
                    {variantsCount > 1 ? "Desde " : ""}
                    {product.price}
                </span>

                <Link
                    to={`/producto/${product.slug}`}
                    className="cart-button"
                >
                    Agregar al carrito
                </Link>
            </div>
        </motion.article>
    );
}

export default ProductCard;
