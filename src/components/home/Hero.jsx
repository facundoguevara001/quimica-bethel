import "./Hero.css";
import { Link } from "react-router-dom";
import products from "../../data/products";
import { useRef } from "react";
import { gsap, useGSAP } from "../../utils/animation";
import Navbar from "../layout/Navbar";

function Hero() {
    const container = useRef(null);

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out", clearProps: "transform,opacity,visibility" } })
                .from(".hero-badge", { autoAlpha: 0, y: 12 }, 0)
                .from(".hero-title", { autoAlpha: 0, y: 24 }, 0.08)
                .from(".hero-description", { autoAlpha: 0, y: 16 }, 0.18)
                .from(".hero-benefits li", { autoAlpha: 0, y: 12, stagger: 0.06 }, 0.25)
                // Keep the main action available throughout the entrance.
                .from(".hero-actions", { opacity: 0.6, y: 12 }, 0.38);
        }, container);

        return () => media.revert();
    }, { scope: container });

    return (

        <section
            ref={container}
            className="hero"
        >

            <div className="hero-inner">

                <Navbar transparent />

                <div className="hero-grid">
                <div className="hero-content">

                    <span className="hero-badge">

                        01 / Limpieza para todos los días

                    </span>

                    <h1 className="hero-title">

                        Tu casa limpia.
                        <em> Tu compra simple.</em>

                    </h1>

                    <p className="hero-description">

                        Productos de limpieza para tu hogar y negocio. Elegí lo que necesitás y te lo llevamos a tu puerta.

                    </p>

                    <ul className="hero-benefits">

                        <li>Sin adelanto</li>

                        <li>Entrega a domicilio</li>

                        <li>Revisás antes de pagar</li>

                        <li>Pagás solamente lo que te quedás</li>

                    </ul>

                    <div className="hero-actions">
                        <Link to="/catalogo" className="hero-cta-primary">Explorar catálogo ↗</Link>

                        <a
                            href="https://wa.me/5491125218692?text=Hola,%20quiero%20hacer%20un%20pedido"
                            target="_blank"
                            rel="noreferrer"
                            className="hero-cta-secondary"
                        >

                            Pedir por WhatsApp ↗

                        </a>

                    </div>

                </div>

                <div className="hero-showcase" aria-label="Productos de nuestro catálogo">
                    <div className="hero-showcase-heading"><span>Lo esencial, a mano.</span><span>QK / Selección</span></div>
                    <div className="hero-product-grid">
                        {["LVA005", "SUA003"].map(code => {
                            const product = products.find(item => item.code === code);
                            return product && <Link to={`/producto/${product.slug}`} className="hero-product" key={code}>
                                <img src={product.image} alt={product.name} fetchPriority="high" />
                                <span>{product.name}<strong>{product.price} ↗</strong></span>
                            </Link>;
                        })}
                    </div>
                    <p>Para la cocina. Para la ropa. Para todos los días.</p>
                </div>
                </div>
            </div>

        </section>

    );

}

export default Hero;
