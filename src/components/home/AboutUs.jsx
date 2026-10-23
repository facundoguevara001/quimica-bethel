import "./AboutUs.css";
import SectionHeader from "../common/SectionHeader";

function AboutUs() {

    return (

        <section
            id="nosotros"
            className="about-section"
        >

            <div className="light-band">

                <div className="about-band-inner">

                    <SectionHeader
                        theme="light"
                        number="01"
                        eyebrow="Conocé la empresa"
                        titleBold="Productos confiables."
                        titleAccent="Atención directa."
                    />

                    <div className="about-copy">

                        <p>

                            En <strong>Químicas King</strong> trabajamos para
                            que hogares, comercios y negocios puedan resolver
                            su limpieza sin complicaciones: productos
                            rendidores, precios competitivos y reposición en
                            un solo pedido.

                        </p>

                        <p>

                            Elegimos una atención cercana y entregas ágiles,
                            para que siempre encuentres exactamente lo que
                            necesitás.

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AboutUs;