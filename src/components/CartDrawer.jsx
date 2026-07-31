import {
    FaWhatsapp,
    FaTimes,
    FaMinus,
    FaPlus,
    FaTrash
} from "react-icons/fa";

import { useCart } from "../context/CartContext";

function CartDrawer({ open, onClose }) {

    const {

        cart,

        increaseQuantity,

        decreaseQuantity,

        removeFromCart,

        clearCart,

        totalPrice

    } = useCart();
    function sendWhatsApp() {

    if (cart.length === 0) return;

    const message = `
🧪 *Pedido Química Bethel*

Hola, quisiera realizar el siguiente pedido:

${cart
    .map(
        item =>
`• ${item.name}
Cantidad: ${item.quantity}
Precio: ${item.price}`
    )
    .join("\n\n")}

----------------------------

💲 Total: $${totalPrice.toLocaleString("es-AR")}

Muchas gracias.
`;

    window.open(
        `https://wa.me/5491125218692?text=${encodeURIComponent(message)}`,
        "_blank"
    );

}

    if (!open) return null;

    return (

        <>

            <div
                className="cart-overlay"
                onClick={onClose}
            />

            <div className="cart-drawer">

                <div className="cart-header">

                    <h2>🛒 Mi Pedido</h2>

                    <button onClick={onClose}>
                        <FaTimes />
                    </button>

                </div>

                <div className="cart-items">

                    {

                        cart.length === 0 ?

                        (

                            <p className="empty-cart">

                                Tu carrito está vacío.

                            </p>

                        )

                        :

                        cart.map(item => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

                                <img
                                    src={item.image}
                                    alt={item.name}
                                />

                                <div className="cart-info">

                                    <h4>

                                        {item.name}

                                    </h4>

                                    <span>

                                        {item.price}

                                    </span>

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

                        ))

                    }

                </div>

                <div className="cart-footer">

                    <h3>

                        Total

                    </h3>

                    <span>

                        ${totalPrice.toLocaleString("es-AR")}

                    </span>
<button
    className="clear-cart"
    onClick={clearCart}
>

    🗑 Vaciar carrito

</button>
                    <button
    className="send-order"
    onClick={sendWhatsApp}
>

    <FaWhatsapp />

    Enviar pedido

</button>

                </div>

            </div>

        </>

    );

}

export default CartDrawer;