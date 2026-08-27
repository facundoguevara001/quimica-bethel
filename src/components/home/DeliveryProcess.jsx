import "./DeliveryProcess.css";
import SectionHeader from "../common/SectionHeader";
import { Link } from "react-router-dom";

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

    return (

        <section
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

                                <span className="delivery-step-connector" />

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