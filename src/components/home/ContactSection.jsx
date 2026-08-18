import "./ContactSection.css";

function ContactSection() {
  return (
    <section
            id="contacto"
            className="contact-banner"
        >
          
      <h2>¿Necesitás ayuda con tu pedido?</h2>

      <p>
        Atención personalizada para consultar productos, precios y entregas.
      </p>

      <div className="contact-banner-actions">
        <a
          className="contact-whatsapp"
          href="https://wa.me/5491125218692"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp ↗
        </a>

        <a
          className="contact-facebook"
          href="https://facebook.com/"
          target="_blank"
          rel="noreferrer"
        >
          Facebook ↗
        </a>
      </div>
    </section>
  );
}

export default ContactSection;