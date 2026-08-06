import "./Product.css";

import {
    useParams,
    useNavigate,
    Link
} from "react-router-dom";

import products from "../data/products";

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

const relatedProducts = products
    .filter(
        p =>
            p.category === product.category &&
            p.slug !== product.slug
    )
    .slice(0,4);

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
                   />

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
                   <section className="related-products">

    <h2>

        También te puede interesar

    </h2>

    <div className="related-grid">

        {relatedProducts.map(item => (

            <Link

                key={item.slug}

                to={`/producto/${item.slug}`}

                className="related-card"

            >

                <img

                    src={item.image}

                    alt={item.name}

                />

                <h4>

                    {item.name}

                </h4>

                <span>

                    {item.price}

                </span>

            </Link>

        ))}

    </div>

</section>

                </div>

            </div>

        </div>

    );

}

export default Product;