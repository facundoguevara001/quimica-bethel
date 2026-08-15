import "./CategorySection.css";
import { useNavigate } from "react-router-dom";
import { FaTint, FaTshirt, FaFire, FaArrowRight } from "react-icons/fa";

const categories = [

    {
        number: "01",
        icon: <FaTint />,
        title: "Limpieza",
        subtitle: "Hogar y negocio",
        to: "/catalogo"
    },

    {
        number: "02",
        icon: <FaTshirt />,
        title: "Lavandería",
        subtitle: "Ropa y textiles",
        to: "/catalogo?buscar=detergente"
    },

    {
        number: "03",
        icon: <FaFire />,
        title: "Ofertas",
        subtitle: "Combos del mes",
        to: "/promociones",
        hot: true
    }

];

function CategorySection() {

    const navigate = useNavigate();

    return (

        <section className="category-section">

            <div className="category-header">

                <div>

                    <span className="category-eyebrow">

                        02 · Compra simple, reposición segura

                    </span>

                    <h2>

                        Elegí, girá y conocé el precio.

                    </h2>

                </div>

                <p>

                    Los productos más buscados, en una selección clara.
                    Tocá una ficha para ver el precio o comprar.

                </p>

            </div>

            <div className="category-grid">

                {categories.map(category => (

                    <button
                        key={category.number}
                        className={
                            category.hot
                                ? "category-tile category-tile-hot"
                                : "category-tile"
                        }
                        onClick={() => navigate(category.to)}
                    >

                        <span className="category-tile-number">

                            {category.number}

                        </span>

                        <span className="category-tile-icon">

                            {category.icon}

                        </span>

                        <span className="category-tile-text">

                            <strong>{category.title}</strong>

                            <small>{category.subtitle}</small>

                        </span>

                        {category.hot && (

                            <span className="category-tile-badge">

                                HOT

                            </span>

                        )}

                        <FaArrowRight className="category-tile-arrow" />

                    </button>

                ))}

            </div>

        </section>

    );

}

export default CategorySection;