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

        <Link to="/nosotros" onClick={() => setMenuOpen(false)}>

            Nosotros

        </Link>

        <Link to="/nosotros#contacto" onClick={() => setMenuOpen(false)}>

            Contacto

        </Link>

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