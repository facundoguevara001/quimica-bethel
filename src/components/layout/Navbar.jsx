import "./Navbar.css";

import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../common/Logo";

function Navbar({ transparent = false }) {

    const [menuOpen, setMenuOpen] = useState(false);

    return (

<header className={`navbar ${transparent ? "navbar-transparent" : ""}`}>

    <div className="navbar-logo">

        <Logo variant={transparent ? "hero" : "default"} />

    </div>

    <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <Link to="/" onClick={() => setMenuOpen(false)}>

            Inicio

        </Link>

        <Link to="/catalogo" onClick={() => setMenuOpen(false)}>

            Catálogo

        </Link>

        <Link to="/promociones" onClick={() => setMenuOpen(false)}>

            Promociones

        </Link>

        <a href="#faq" onClick={() => setMenuOpen(false)}>

            FAQ

        </a>

        <a href="#nosotros" onClick={() => setMenuOpen(false)}>

            Nosotros

        </a>

        <a href="#politica" onClick={() => setMenuOpen(false)}>

            Política

        </a>

    </nav>

    <button

        className="navbar-toggle"

        onClick={() => setMenuOpen(!menuOpen)}

    >

        {

            menuOpen

                ? <FaTimes />

                : <FaBars />

        }

    </button>

</header>

);

}

export default Navbar;