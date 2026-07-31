import ProductCard from "./ProductCard";

function ProductGrid({ products, openCart }) {

    if (products.length === 0) {

        return (
            <div className="no-products">
                No se encontraron productos.
            </div>
        );

    }

    return (

        <div className="catalog-grid">

            {products.map(product => (

                <ProductCard
    key={product.id}
    product={product}
    openCart={openCart}
/>

            ))}

        </div>

    );

}

export default ProductGrid;