import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CartButton({ onClick }) {

    const { totalItems } = useCart();
    console.log("TOTAL ITEMS:", totalItems);

    return (

        <button
            className="cart-floating-button"
            onClick={onClick}
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