import {
    FaMinus,
    FaPlus,
    FaTrash
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";

function CartItem({ item }) {

    const {

        increaseQuantity,
        decreaseQuantity,
        removeFromCart

    } = useCart();

    return (

        <div className="cart-item">

            <img
                src={item.image}
                alt={item.name}
            />

            <div className="cart-info">

                <h4>{item.name}</h4>

                {item.variantLabel && (
    <p>{item.variantLabel}</p>
)}

                <span>{item.price}</span>

                <div className="cart-quantity">

                    <button
                        onClick={() =>
                            decreaseQuantity(item.id)
                        }
                    >
                        <FaMinus />
                    </button>

                    <span>
                        {item.quantity}
                    </span>

                    <button
                        onClick={() =>
                            increaseQuantity(item.id)
                        }
                    >
                        <FaPlus />
                    </button>

                </div>

            </div>

            <button
                className="delete-item"
                onClick={() =>
                    removeFromCart(item.id)
                }
            >
                <FaTrash />
            </button>

        </div>

    );

}

export default CartItem;