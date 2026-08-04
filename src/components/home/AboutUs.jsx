import "./AboutUs.css";

function AboutUs() {

    return (

        <section className="about-us">

            <div className="about-image">

                <img
                    src="/logo.png"
                    alt="Química Bet. Inc."
                />

            </div>

            <div className="about-content">

                <span className="about-badge">

                    Desde 2020

                </span>

                <h2>

                    🏢 Quiénes Somos

                </h2>

                <p>

                    En <strong>Química Bet. Inc.</strong> trabajamos para ofrecer
                    productos de limpieza de excelente calidad para hogares,
                    empresas y comercios.

                </p>

                <p>

                    Nuestro compromiso es brindar atención personalizada,
                    precios competitivos y entregas rápidas, para que cada
                    cliente encuentre exactamente lo que necesita.

                </p>

                <p>

                    Buscamos construir relaciones de confianza ofreciendo
                    productos confiables y un servicio cada vez mejor.

                </p>

            </div>

        </section>

    );

}

export default AboutUs;