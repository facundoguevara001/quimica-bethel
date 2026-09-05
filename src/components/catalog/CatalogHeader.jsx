import { FaArrowLeft, FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import Logo from "../common/Logo";
import "./CatalogHeader.css";

function CatalogHeader({ search, setSearch, onBack, onOpenCart }) {
    const { totalItems } = useCart();

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <header className="catalog-commerce-header">
            <div className="catalog-header-main">
                <div className="catalog-brand-area">
                    <button
                        className="catalog-back-link"
                        type="button"
                        onClick={onBack}
                    >
                        <FaArrowLeft aria-hidden="true" />
                        Volver al inicio
                    </button>

                    <Logo />

                    <p className="catalog-shipping-threshold">
                        <FaTruck aria-hidden="true" />
                        Envío bonificado en compras mayores a $50.000
                    </p>
                </div>

                <form className="catalog-header-search" onSubmit={handleSubmit}>
                    <label className="visually-hidden" htmlFor="catalog-header-search-input">
                        Buscar productos
                    </label>
                    <input
                        id="catalog-header-search-input"
                        type="search"
                        placeholder="Buscá productos, marcas y categorías..."
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                    <button type="submit" aria-label="Buscar productos">
                        <FaSearch aria-hidden="true" />
                    </button>
                </form>

                <div className="catalog-header-actions">
                    <p className="catalog-first-purchase">
                        <FaTruck aria-hidden="true" />
                        Envío gratis en tu primera compra
                    </p>

                    <button
                        className="catalog-cart-button"
                        type="button"
                        onClick={onOpenCart}
                        aria-label={`Abrir carrito${totalItems ? `, ${totalItems} productos` : ""}`}
                    >
                        <FaShoppingCart aria-hidden="true" />
                        <span>Carrito</span>
                        {totalItems > 0 && (
                            <strong className="catalog-cart-badge">{totalItems}</strong>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default CatalogHeader;
