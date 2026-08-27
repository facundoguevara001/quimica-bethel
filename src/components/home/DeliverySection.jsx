import "./DeliverySection.css";
import SectionHeader from "../common/SectionHeader";

import {
    FaWhatsapp,
    FaTruck,
    FaMapMarkerAlt
} from "react-icons/fa";

const zones = [

    {
        title: "CABA",
        places: [
            "Boedo",
            "Parque Patricios",
            "Caballito",
            "Almagro"
        ]
    },

    {
        title: "Gran Buenos Aires",
        places: [
            "Loma Hermosa",
            "Caseros",
            "Villa Bosch",
            "Podestá",
            "Libertador",
            "Santos Lugares",
            "Sáenz Peña",
            "San Martín",
            "Ballester"
        ]
    }

];

function DeliverySection() {

    return (

        <section
            id="envios"
            className="light-band"
        >

            <div className="delivery-inner">

                <SectionHeader
                    theme="light"
                    number="03"
                    eyebrow="Te lo llevamos a tu casa"
                    titleBold="Cómo funciona"
                    titleAccent="el envío."
                    subtitle="Hacé tu pedido por WhatsApp y coordinamos la entrega en tu zona. Simple, rápido y sin sorpresas."
                />

                <div className="delivery-grid">

                    <div className="delivery-step-card">

                        <span className="delivery-step-icon">
                            <FaWhatsapp />
                        </span>

                        <h3>1. Hacé tu pedido</h3>

                        <p>
                            Escribinos por WhatsApp con los productos
                            que necesitás y armamos tu pedido.
                        </p>

                    </div>

                    <div className="delivery-step-card">

                        <span className="delivery-step-icon">
                            <FaTruck />
                        </span>

                        <h3>2. Costo de envío</h3>

                        <p>
                            El envío tiene un costo de <strong>$8.500</strong>.
                            En compras superiores a <strong>$50.000</strong>{" "}
                            queda <strong>bonificado</strong>.
                        </p>

                    </div>

                    <div className="delivery-step-card">

                        <span className="delivery-step-icon">
                            <FaMapMarkerAlt />
                        </span>

                        <h3>3. Coordinamos la entrega</h3>

                        <p>
                            Confirmado el pedido, coordinamos día y
                            horario de entrega según tu zona.
                        </p>

                    </div>

                </div>

                <div className="delivery-zones">

                    {zones.map(zone => (

                        <div
                            key={zone.title}
                            className="delivery-zone-card"
                        >

                            <h4>{zone.title}</h4>

                            <ul>

                                {zone.places.map(place => (

                                    <li key={place}>
                                        {place}
                                    </li>

                                ))}

                            </ul>

                        </div>

                    ))}

                </div>

                <p className="delivery-zone-note">

                    ¿Tu zona no está en la lista? Consultanos por
                    WhatsApp, es posible que igual podamos llegar.

                </p>

            </div>

        </section>

    );

}

export default DeliverySection;