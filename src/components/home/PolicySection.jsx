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
            text: "Realizamos entregas rápidas en CABA y Gran Buenos Aires. Costo envio de $8500."
        },

        {
            icon: <FaMoneyBillWave />,
            title: "Formas de pago",
            text: "¡Abonas al recibir! Además, poder abonar en efectivo o transferencias😉."
        },

        {
            icon: <FaExchangeAlt />,
            title: "Cambios",
            text: "Si el producto no es lo que esperabas, solamente no lo abonas y el repartidor te hace el descuento por el mismo."
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