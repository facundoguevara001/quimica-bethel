import "./HomeLinks.css";

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
              <span className="catalog-button-bg"></span>
              <span className="catalog-button-content"> 

              <span className="catalog-icon">
                📦
              </span> 

              <span>
                Ver catálogo completo
              </span>

              <span className="catalog-arrow">
                →
              </span>

              </span>

            </button>

            {/* PROMOCIONES */}

            <button
                className="promo-premium-button"
                onClick={() => navigate("/promociones")}
            >

                <span className="promo-button-bg"></span>
                <span className="promo-button-content">
                    <span className="promo-badge">HOT</span>
                    <span className="promo-icon">🔥</span>
                    <span className="promo-text">Ofertas y promociones</span>
                    <span className="promo-arrow">→</span>

                </span>

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