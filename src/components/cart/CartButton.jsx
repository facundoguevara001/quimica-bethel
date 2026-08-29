import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

function CartButton({ onClick }) {

    const { totalItems } = useCart();

    return (

        <button
            className="cart-floating-button"
            onClick={onClick}
            type="button"
aria-label="Abrir carrito"
        >

            <FaShoppingCart />

            {

                totalItems > 0 && (

                    <span className="cart-badge">

                        {totalItems}

                    </span>

                )

            }

        </button>

    );

}

export default CartButton;