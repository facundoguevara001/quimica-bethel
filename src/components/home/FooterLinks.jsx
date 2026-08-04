import "./FooterLinks.css";

import {
    FaQuestionCircle,
    FaBuilding,
    FaClipboardList,
    FaCommentDots
} from "react-icons/fa";

function FooterLinks() {

    return (

        <section className="footer-links">

            <button className="footer-link">

                <FaQuestionCircle />

                <span>Preguntas frecuentes</span>

            </button>

            <button className="footer-link">

                <FaBuilding />

                <span>Quiénes somos</span>

            </button>

            <button className="footer-link">

                <FaClipboardList />

                <span>Política comercial</span>

            </button>

            <button className="footer-link">

                <FaCommentDots />

                <span>Déjanos tu comentario</span>

            </button>

        </section>

    );

}

export default FooterLinks;