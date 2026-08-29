import "./Product.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import products from "../data/products";
import { getVariants } from "../utils/productGroups";

import FeaturedProducts from "../components/home/FeaturedProducts";
import CartButton from "../components/cart/CartButton";
import CartDrawer from "../components/cart/CartDrawer";
import { useCart } from "../context/CartContext";

import {
    FaWhatsapp,
    FaCheckCircle,
    FaTruck,
    FaFileInvoice,
    FaCreditCard,
    FaMinus,
    FaPlus,
} from "react-icons/fa";

function Product() {

    const { slug } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [imageOpen, setImageOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [cartOpen, setCartOpen] = useState(false);

    const product = products.find(

        p =>

            String(p.slug).trim().toLowerCase() ===
            String(slug).trim().toLowerCase()

    );

    if (!product) {

        return (

            <div className="product-not-found">

                <h2>Producto no encontrado</h2>

            </div>

        );

    }

    const variants = getVariants(products, product);

    const unitPrice =
        Number(product.cost) * (Number(product.margin) + 1);

    const subtotal = unitPrice * quantity;

    const whatsappMessage = encodeURIComponent(

`¡Hola! 👋

Quiero pedir:

🧴 ${quantity} x ${product.name}

📦 Código: ${product.code}

💲 Subtotal: $${subtotal.toLocaleString("es-AR")}

¿Confirmamos el pedido?`

    );

    const whatsappUrl =
        `https://wa.me/5491125218692?text=${whatsappMessage}`;

    const relatedProducts = products.filter(

        p =>

            p.category === product.category &&
            p.slug !== product.slug

    );

    const relatedCards = [

        ...relatedProducts,
        ...relatedProducts

    ];

    return (

        <div className="product-page">

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Volver
            </button>

            <div className="product-container">

                {/* FOTO */}

                <div className="product-image">

                    <div className="image-wrapper">

                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ cursor: "zoom-in" }}
                            onClick={() => setImageOpen(true)}
                        />

                    </div>

                </div>

                {/* INFORMACIÓN */}

                <div className="product-info">

                    <span className="product-category">

                        {product.category}

                    </span>

                    <h1>

                        {product.name}

                    </h1>

                    <h2>

                        {product.price}

                    </h2>

                    <div className="product-benefits">

                        <div>

                            <FaCheckCircle />

                            <span>

                                Stock disponible

                            </span>

                        </div>

                        <div>

                            <FaTruck />

                            <span>

                                Envíos a todo el país

                            </span>

                        </div>

                        <div>

                            <FaFileInvoice />

                            <span>

                                Factura A y B

                            </span>

                        </div>

                        <div>

                            <FaCreditCard />

                            <span>

                                Todos los medios de pago

                            </span>

                        </div>

                    </div>

                                        <p>

                        {product.description}

                    </p>

                    {

                        variants.length > 1 && (

                            <div className="variant-selector">

                                {variants.map(variant => (

                                    <button
                                        key={variant.slug}
                                        type="button"
                                        className={
                                            variant.slug === product.slug
                                                ? "variant-chip variant-chip-active"
                                                : "variant-chip"
                                        }
                                        onClick={() =>
                                            navigate(`/producto/${variant.slug}`)
                                        }
                                    >

                                        {variant.variantLabel}

                                    </button>

                                ))}

                            </div>

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

                    <div className="product-cta-group">

                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="whatsapp-button"
                        >

                            <FaWhatsapp />

                            Pedir por WhatsApp

                        </a>

                        <button
                            className="add-to-cart-button"
                            onClick={() => {

                                addToCart(product, quantity);

                                setCartOpen(true);

                            }}
                        >

                            🛒 Agregar al carrito

                        </button>

                    </div>

                </div>

            </div>

            {/* PRODUCTOS RELACIONADOS */}

            <div className="related-products">

                <FeaturedProducts

                    cards={relatedCards}

                    title="🧴 También te puede interesar"

                    openCart={() => setCartOpen(true)}

                />

            </div>

            {/* MODAL IMAGEN */}

            {

                imageOpen && (

                    <div
                        className="image-modal"
                        onClick={() => setImageOpen(false)}
                    >

                        <img
                            src={product.image}
                            alt={product.name}
                            className="image-modal-content"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <button
                            className="image-close"
                            onClick={() => setImageOpen(false)}
                        >

                            ✕

                        </button>

                    </div>

                )

            }

            <CartButton
                onClick={() => setCartOpen(true)}
            />

            <CartDrawer
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            />

        </div>

    );

}

export default Product;