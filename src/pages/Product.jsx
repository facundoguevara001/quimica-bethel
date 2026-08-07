import "./Product.css";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import products from "../data/products";

import FeaturedProducts from "../components/home/FeaturedProducts";

import {
    FaWhatsapp,
    FaCheckCircle,
    FaTruck,
    FaFileInvoice,
    FaCreditCard,
} from "react-icons/fa";

function Product() {

    const { slug } = useParams();
    const navigate = useNavigate();

    const [imageOpen, setImageOpen] = useState(false);

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

    const whatsappMessage = encodeURIComponent(

`¡Hola! 👋

Me interesa este producto:

🧴 ${product.name}

📦 Código: ${product.code}

💲 Precio: ${product.price}

¿Podrían brindarme más información?`

    );

    const whatsappUrl =
        `https://wa.me/54911525218692?text=${whatsappMessage}`;

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

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="whatsapp-button"
                    >

                        <FaWhatsapp />

                        Consultar por WhatsApp

                    </a>

                </div>

            </div>

            {/* PRODUCTOS RELACIONADOS */}

            <div className="related-products">

                <FeaturedProducts

                    cards={relatedCards}

                    title="🧴 También te puede interesar"

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

        </div>

    );

}

export default Product;