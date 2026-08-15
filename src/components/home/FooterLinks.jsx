import "./FooterLinks.css";

import {
    FaQuestionCircle,
    FaBuilding,
    FaClipboardList
} from "react-icons/fa";

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (element) {

        element.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}

function FooterLinks() {

    return (

        <section className="footer-links">

            <button
                className="footer-link"
                onClick={() => scrollToSection("faq")}
            >

                <FaQuestionCircle />

                <span>Preguntas frecuentes</span>

            </button>

            <button
                className="footer-link"
                onClick={() => scrollToSection("nosotros")}
            >

                <FaBuilding />

                <span>Quiénes somos</span>

            </button>

            <button
                className="footer-link"
                onClick={() => scrollToSection("politica")}
            >

                <FaClipboardList />

                <span>Política comercial</span>

            </button>

        </section>

    );

}

export default FooterLinks;