import "./Product.css";

import {
    useParams,
    useNavigate,
    Link
} from "react-router-dom";

import products from "../data/products";
import { useState } from "react";
import FeaturedProducts from "../components/home/FeaturedProducts";

import {
    FaWhatsapp,
    FaCheckCircle,
    FaTruck,
    FaFileInvoice,
    FaCreditCard
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

const whatsappMessage = encodeURIComponent(
`¡Hola! 👋

Me interesa este producto:

🧴 ${product?.name}

📦 Código: ${product?.code}

💲 Precio: ${product?.price}

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

    if (!product) {

        return (

            <div className="product-not-found">

                <h2>Producto no encontrado</h2>

            </div>

        );

    }

    return (

        <div className="product-page">

            <button
                   className="back-button"
                   onClick={() => navigate(-1)}
                >
                   ← Volver
                   </button>

            <div className="product-container">

                <div className="product-image">

            <div className="image-wrapper">

             <img
    src={product.image}
    alt={product.name}
    onClick={() => setImageOpen(true)}
    style={{ cursor: "zoom-in" }}
/>
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

    </div>

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

<section className="related-products">

                     <FeaturedProducts

                     cards={relatedCards}

                      title="🧴 También te puede interesar"

                      />

                    </section>


            </div>

        </div>

    );

}

export default Product;