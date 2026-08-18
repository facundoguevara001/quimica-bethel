import "./AboutHero.css";
import Navbar from "../layout/Navbar";

function AboutHero() {

    return (

        <section className="about-hero">

            <div className="about-hero-bg">

                <img
                    src="/nosotros.jpg"
                    alt="Depósito de Químicas King"
                    className="about-hero-bg-image"
                />

                <div className="about-hero-overlay" />

            </div>

            <div className="about-hero-inner">

                <Navbar transparent />

                <div className="about-hero-content">

                    <span className="about-hero-badge">

                        Conocé la empresa

                    </span>

                    <h1 className="about-hero-title">

                        Detrás de cada pedido,{" "}
                        <em>logística real</em>.

                    </h1>

                </div>

            </div>

        </section>

    );

}

export default AboutHero;