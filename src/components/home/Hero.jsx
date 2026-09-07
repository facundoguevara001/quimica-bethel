import "./Hero.css";
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

            {/* FOTO DE FONDO */}

            <div className="hero-bg">

                <img
                    src="/hero.jpg"
                    alt="Logística Química Bethel"
                    className="hero-bg-image"
                />

                <div className="hero-overlay" />

            </div>

            {/* CONTENIDO */}

            <div className="hero-inner">

                <Navbar transparent />

                <div className="hero-content">

                    <span className="hero-badge">

                        Productos de limpieza a buen precio

                    </span>

                    <h1 className="hero-title">

                        Productos de limpieza
                        <em> a buen precio</em>

                    </h1>

                    <p className="hero-description">

                        Te los llevamos a tu casa.

                    </p>

                    <ul className="hero-benefits">

                        <li>🛡️ Sin adelanto</li>

                        <li>🚚 Entrega a domicilio</li>

                        <li>👀 Revisás antes de pagar</li>

                        <li>💰 Pagás solamente lo que te quedás</li>

                    </ul>

                    <div className="hero-actions">

                        <a
                            href="https://wa.me/5491125218692?text=Hola,%20quiero%20hacer%20un%20pedido"
                            target="_blank"
                            rel="noreferrer"
                            className="hero-cta-primary"
                        >

                            Pedir por WhatsApp ↗

                        </a>

                    </div>

                </div>

                <div className="hero-footer">

                    <span className="hero-caption">

                        Pedido simple, sin adelanto

                    </span>

                    <span className="hero-shipping-badge">

                        Recibís · Revisás · Pagás

                    </span>

                </div>

            </div>

        </section>

    );

}

export default Hero;
