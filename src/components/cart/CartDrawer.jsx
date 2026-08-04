import {
    FaWhatsapp,
    FaTimes,
} from "react-icons/fa";

import { useCart } from "../../context/CartContext";
import CartItem from "./CartItem";

function CartDrawer({ open, onClose }) {

    const {

    cart,

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

                        <div className="cart-items">

{

    cart.length === 0

    ? (

        <p className="empty-cart">

            Tu carrito está vacío.

        </p>

    )

    : (

        cart.map(item => (

            <CartItem
                key={item.id}
                item={item}
            />

        ))

    )

}

</div>

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