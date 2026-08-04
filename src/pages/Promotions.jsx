import products from "../data/products";

import Catalog from "./Catalog";

function Promotions() {

    const promotionProducts = products.filter(
        product => product.category === "Promociones"
    );

    return (

        <Catalog
            customProducts={promotionProducts}
            title="🔥 Ofertas y Promociones"
        />

    );

}

export default Promotions;