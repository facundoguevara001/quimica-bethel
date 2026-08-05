import "./PolicySection.css";

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
            text: "Realizamos entregas rápidas en CABA y Gran Buenos Aires."
        },

        {
            icon: <FaMoneyBillWave />,
            title: "Formas de pago",
            text: "Aceptamos efectivo, transferencia bancaria y billeteras virtuales."
        },

        {
            icon: <FaExchangeAlt />,
            title: "Cambios",
            text: "Si un producto presenta inconvenientes, realizamos el reemplazo correspondiente."
        },

        {
            icon: <FaShieldAlt />,
            title: "Calidad",
            text: "Todos nuestros productos son controlados antes de ser entregados."

        }

    ];

    return (

        <section 
        
        id="politica"
        className="policy-section">

            <h2>

                📋 Política Comercial

            </h2>

            <div className="policy-grid">

                {

                    policies.map((policy, index) => (

                        <div
                            key={index}
                            className="policy-card"
                        >

                            <div className="policy-icon">

                                {policy.icon}

                            </div>

                            <h3>

                                {policy.title}

                            </h3>

                            <p>

                                {policy.text}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default PolicySection;