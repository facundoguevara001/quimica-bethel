import {
    FaFacebookF,
    FaChevronRight,
    FaBoxOpen,
    FaTag,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import products from "../../data/products";

function HomeLinks() {

    const navigate = useNavigate();

    return (

        <div className="home-links">

            {/* CATÁLOGO */}

            <button
                className="catalog-button"
                onClick={() => navigate("/catalogo")}
            >

                <div className="catalog-left">

                    <FaBoxOpen className="catalog-icon" />

                    <div className="catalog-text">

                        <span className="catalog-badge">

                            {products.length} productos disponibles

                        </span>

                        <h2>

                            Ver Catálogo Completo

                        </h2>

                        <p>

                            Encontrá productos para el hogar,
                            empresas y comercios.

                        </p>

                    </div>

                </div>

                <FaChevronRight className="catalog-arrow" />

            </button>

            {/* PROMOCIONES */}

            <button
                className="home-button promo-button"
                onClick={() => navigate("/promociones")}
            >

                <div>

                    <FaTag />

                    <span>

                        Ofertas y promociones

                    </span>

                </div>

                <FaChevronRight />

            </button>

            {/* FACEBOOK */}

            <a
                className="home-button"
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
            >

                <div>

                    <FaFacebookF />

                    <span>

                        Facebook

                    </span>

                </div>

                <FaChevronRight />

            </a>

        </div>

    );

}

export default HomeLinks;