import "./ContactSection.css";

import {
    FaWhatsapp,
    FaFacebookF,
    FaCommentDots
} from "react-icons/fa";

function ContactSection() {

    return (

        <section className="contact-section">

            <h2>

                📞 Contactanos

            </h2>

            <p className="contact-subtitle">

                ¿Tenés alguna consulta?
                Estamos para ayudarte.

            </p>

            <div className="contact-grid">

                <a
                    className="contact-card whatsapp"
                    href="https://wa.me/5491125218692"
                    target="_blank"
                    rel="noreferrer"
                >

                    <FaWhatsapp />

                    <h3>WhatsApp</h3>

                    <p>

                        Atención rápida y personalizada.

                    </p>

                </a>

                <a
                    className="contact-card facebook"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                >

                    <FaFacebookF />

                    <h3>Facebook</h3>

                    <p>

                        Seguinos para conocer novedades.

                    </p>

                </a>

                <button
                    className="contact-card comment"
                >

                    <FaCommentDots />

                    <h3>Dejanos tu opinión</h3>

                    <p>

                        Tu experiencia nos ayuda a mejorar.

                    </p>

                </button>

            </div>

        </section>

    );

}

export default ContactSection;