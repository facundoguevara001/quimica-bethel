import "./StatsStrip.css";

function StatsStrip({

    productsCount,
    categoriesCount,
    yearsSince

}) {

    const stats = [

        {
            value: `+${productsCount}`,
            label: "Productos en catálogo"
        },

        {
            value: categoriesCount,
            label: "Categorías distintas"
        },

        {
            value: `${yearsSince}`,
            label: "Años en el rubro"
        },

        {
            value: "$50.000",
            label: "Envío bonificado a partir de"
        }

    ];

    return (

        <section className="stats-strip">

            {stats.map((stat, index) => (

                <div
                    key={index}
                    className="stats-item"
                >

                    <span className="stats-value">

                        {stat.value}

                    </span>

                    <span className="stats-label">

                        {stat.label}

                    </span>

                </div>

            ))}

        </section>

    );

}

export default StatsStrip;