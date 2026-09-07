import "./DeliveryProcess.css";
import SectionHeader from "../common/SectionHeader";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { gsap, useGSAP } from "../../utils/animation";

import {
    FaSearch,
    FaWhatsapp,
    FaTruck,
    FaCheckCircle,
    FaMoneyBillWave
} from "react-icons/fa";

const steps = [

    {
        icon: <FaSearch />,
        title: "Elegís",
        text: "Recorrés el catálogo y elegís los productos que necesitás."
    },

    {
        icon: <FaWhatsapp />,
        title: "Pedís",
        text: "Confirmás tu pedido por WhatsApp o desde el carrito."
    },

    {
        icon: <FaTruck />,
        title: "Recibís",
        text: "Te lo llevamos hasta la puerta de tu casa o negocio.",
        link: "/nosotros#envios",
        hint: "Ver zonas y costo →"
    },

    {
        icon: <FaCheckCircle />,
        title: "Revisás",
        text: "Chequeás que esté todo completo y en buen estado.",
        link: "/nosotros#revision",
        hint: "Cómo funciona →"
    },

    {
        icon: <FaMoneyBillWave />,
        title: "Pagás",
        text: "Pagás recién cuando estás conforme. Sin adelantos."
    }

];

function DeliveryProcess() {
    const container = useRef(null);

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add({
            desktop: "(min-width: 769px)",
            mobile: "(max-width: 768px)",
            reduceMotion: "(prefers-reduced-motion: reduce)"
        }, (context) => {
            if (context.conditions.reduceMotion) return;

            const desktop = context.conditions.desktop;
            const cards = container.current.querySelectorAll(".delivery-step");
            const desktopTimeline = desktop ? gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 82%",
                    end: "bottom 55%",
                    scrub: 0.3
                }
            }) : null;

            cards.forEach((card, index) => {
                const timeline = desktopTimeline || gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        end: "top 45%",
                        scrub: 0.25
                    }
                });
                const position = desktop ? index : 0;

                // Only decorative accents track scrolling; instructions stay readable.
                timeline.fromTo(card.querySelector(".delivery-step-icon"), {
                    backgroundColor: "rgba(198,255,61,0)", color: "#c6ff3d"
                }, {
                    backgroundColor: "#c6ff3d", color: "#0b0f2b", duration: 0.6, ease: "none"
                }, position);
                timeline.fromTo(card.querySelector(".delivery-step-number"), {
                    color: "#6b7488"
                }, { color: "#c6ff3d", duration: 0.6, ease: "none" }, position);

                const progress = card.querySelector(".delivery-step-progress");
                if (progress) {
                    timeline.fromTo(progress, desktop ? { scaleX: 0 } : { scaleY: 0 }, {
                        ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
                        duration: 0.4, ease: "none"
                    }, position + 0.6);
                }
            });
        }, container);

        return () => media.revert();
    }, { scope: container });

    return (

        <section
            ref={container}
            id="pago-contra-entrega"
            className="delivery-process-section"
        >

            <SectionHeader
                theme="dark"
                number="03"
                eyebrow="Comprá sin riesgos"
                titleBold="Pagás"
                titleAccent="cuando estás conforme."
                subtitle="Nuestro proceso está pensado para que compres con total tranquilidad, de principio a fin."
            />

                        <div className="delivery-steps">

                                {steps.map((step, index) => {

                    const content = (

                        <>

                            <span className="delivery-step-number">

                                {String(index + 1).padStart(2, "0")}

                            </span>

                            <span className="delivery-step-icon">

                                {step.icon}

                            </span>

                            <h3>

                                {step.title}

                            </h3>

                            <p>

                                {step.text}

                            </p>

                            {step.hint && (

                                <span className="delivery-step-hint">

                                    {step.hint}

                                </span>

                            )}

                            {index < steps.length - 1 && (

                                <span className="delivery-step-connector" aria-hidden="true">
                                    <span className="delivery-step-progress" />
                                </span>

                            )}

                        </>

                    );

                    if (step.link) {

                        return (

                            <Link
                                key={index}
                                to={step.link}
                                className="delivery-step delivery-step-link"
                            >

                                {content}

                            </Link>

                        );

                    }

                    return (

                        <div
                            key={index}
                            className="delivery-step"
                        >

                            {content}

                        </div>

                    );

                })}

            </div>

        </section>

    );

}

export default DeliveryProcess;
