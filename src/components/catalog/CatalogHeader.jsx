function CatalogHeader({ total }) {

    return (

        <>

            <div className="catalog-banner">

                <h1>

                    🧪 Química Bethel

                </h1>

                <p>

                    Productos de limpieza para hogares,
                    empresas y comercios.

                </p>

            </div>

            <div className="products-counter">

                Mostrando {total} productos

            </div>

        </>

    );

}

export default CatalogHeader;