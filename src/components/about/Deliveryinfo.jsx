
import "./DeliveryInfo.css";
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

function DeliveryInfo() {

    return (
        <section
            id="envios"
            className="light-band"
        >

            <div className="delivery-info-inner">

                <SectionHeader
                    theme="light"
                    number="03"
                    eyebrow="Te lo llevamos a tu casa"
                    titleBold="Zonas de entrega"
                    titleAccent="y costo de envío."
                    subtitle="Después de confirmar tu pedido por WhatsApp, coordinamos día y horario de entrega según tu zona."
                />

                <div className="delivery-info-cost">

                    <span className="delivery-info-cost-icon">
                        <FaTruck />
                    </span>

                    <div>
                        <strong>Costo de envío: $8.500</strong>

                        <p>
                            Bonificado en compras mayores a $50.000.
                        </p>
                    </div>

                </div>

                <div className="delivery-info-zones">

                    {zones.map(zone => (

                        <div
                            key={zone.title}
                            className="delivery-info-zone-card"
                        >

                            <h4>
                                <FaMapMarkerAlt />
                                {zone.title}
                            </h4>

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

                <a
                    className="delivery-info-whatsapp"
                    href="https://wa.me/5491125218692?text=Hola,%20quiero%20consultar%20por%20el%20env%C3%ADo%20a%20mi%20zona"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaWhatsapp />
                    Consultar por mi zona
                </a>

            </div>

        </section>
    );
}

export default DeliveryInfo;
