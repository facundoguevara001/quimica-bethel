export function getCatalogProducts(products) {

    const groups = new Map();

    products.forEach(product => {

        const key = product.group || product.code;
        const current = groups.get(key);

        if (!current || product.unitPrice < current.unitPrice) {
            groups.set(key, product);
        }

    });

    return Array.from(groups.values());

}

export function getVariants(products, product) {

    const key = product.group || product.code;

    return products
        .filter(p => (p.group || p.code) === key)
        .sort((a, b) => a.unitPrice - b.unitPrice);

}