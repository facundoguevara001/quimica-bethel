import "./Navbar.css";

import { Link } from "react-router-dom";

function Navbar() {

    return (

        <header className="navbar">

            <div className="navbar-logo">

                <Link to="/">

                    🧪 <span>Bethel</span>

                </Link>

            </div>

            <nav className="navbar-links">

                <Link to="/">Inicio</Link>

                <Link to="/catalogo">Catálogo</Link>

                <Link to="/promociones">Promociones</Link>

                <a href="#faq">FAQ</a>

                <a href="#nosotros">Nosotros</a>

                <a href="#politica">Política</a>

            </nav>

        </header>

    );

}

export default Navbar;