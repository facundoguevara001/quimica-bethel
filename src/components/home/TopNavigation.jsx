import "./TopNavigation.css";

function scrollToSection(id) {

    const element = document.getElementById(id);

    if (element) {

        element.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    }

}

function TopNavigation() {

    return (

        <nav className="top-navigation">

            <button
                onClick={() => scrollToSection("faq")}
            >
                Preguntas Frecuentes
            </button>

            <button
                onClick={() => scrollToSection("about")}
            >
                Quiénes Somos
            </button>

            <button
                onClick={() => scrollToSection("policy")}
            >
                Política Comercial
            </button>

            <button
                onClick={() => scrollToSection("reviews")}
            >
                Comentarios
            </button>

        </nav>

    );

}

export default TopNavigation;