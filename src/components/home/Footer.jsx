import "./Footer.css";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import Logo from "../common/Logo";

function Footer() {

    const year = new Date().getFullYear();

    return (

        <footer className="site-footer">

            <div className="footer-inner">

                <div className="footer-top">

                    {/* MARCA */}

                    <div className="footer-brand">

                        <Logo />

                        <p>

                            Productos de limpieza y lavandería para hogares,
                            comercios y negocios. Pedido mensual, precio
                            mayorista.

                        </p>

                    </div>

                    {/* COMPRAR */}

                    <div className="footer-column">

                        <h4>Comprar</h4>

                        <Link to="/catalogo">Catálogo</Link>

                        <Link to="/promociones">Promociones</Link>

                    </div>

                    {/* AYUDA */}

                    <div className="footer-column">

                        <h4>Ayuda</h4>

                        <a href="#faq">Preguntas frecuentes</a>

                        <a href="#nosotros">Quiénes somos</a>

                        <a href="#politica">Política comercial</a>

                    </div>

                    {/* CONTACTO */}

                    <div className="footer-column">

                        <h4>Contacto</h4>

                        <a
                            href="https://wa.me/5491125218692"
                            target="_blank"
                            rel="noreferrer"
                        >

                            <FaWhatsapp /> WhatsApp

                        </a>

                        <a
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noreferrer"
                        >

                            <FaFacebookF /> Facebook

                        </a>

                        <span className="footer-zone">

                            Envíos a CABA y Gran Buenos Aires

                        </span>

                    </div>

                </div>

                <div className="footer-bottom">

                    <span>

                        © {year} Químicas King. Todos los derechos
                        reservados.

                    </span>

                    <span className="footer-credit">

                        Sitio desarrollado por{" "}
                        <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                        >
                            [ tu nombre / marca ]
                        </a>

                    </span>

                </div>

            </div>

        </footer>

    );

}

export default Footer;