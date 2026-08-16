import "./PolicySection.css";
import SectionHeader from "../common/SectionHeader";

import {
    FaTruck,
    FaMoneyBillWave,
    FaExchangeAlt,
    FaShieldAlt
} from "react-icons/fa";

function PolicySection() {

    const policies = [

        {
            icon: <FaTruck />,
            title: "Envíos",
            text: "Entregas rápidas en CABA y Gran Buenos Aires. Envío bonificado a partir de $50.000."
        },

        {
            icon: <FaMoneyBillWave />,
            title: "Formas de pago",
            text: "Abonás al recibir, o consultá por efectivo y transferencias disponibles."
        },

        {
            icon: <FaExchangeAlt />,
            title: "Cambios",
            text: "Si el producto no es el esperado, escribinos y coordinamos una solución."
        },

        {
            icon: <FaShieldAlt />,
            title: "Calidad",
            text: "Todos los productos son controlados antes de ser preparados para entrega."
        }

    ];

    return (

        <section
            id="politica"
            className="light-band"
        >

            <div className="policy-inner">

                <SectionHeader
                    theme="light"
                    number="02"
                    eyebrow="Antes y después de tu compra"
                    titleBold="Nuestra política comercial."
                    subtitle="Información simple y visible para comprar con confianza, sin letras chicas ni recorridos innecesarios."
                />

                <div className="policy-grid">

                    {policies.map((policy, index) => (

                        <div
                            key={index}
                            className="policy-card"
                        >

                            <span className="policy-icon">

                                {policy.icon}

                            </span>

                            <h3>

                                {policy.title}

                            </h3>

                            <p>

                                {policy.text}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default PolicySection;