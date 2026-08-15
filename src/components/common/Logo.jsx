import "./Logo.css";
import { Link } from "react-router-dom";

function Logo({ variant = "default" }) {

    return (

        <Link
            to="/"
            className={`brand-logo brand-logo-${variant}`}
        >

            <span className="brand-mark">

                QK

            </span>

            <span className="brand-wordmark">

                <strong>Químicas King</strong>

                <span>Limpieza profesional</span>

            </span>

        </Link>

    );

}

export default Logo;