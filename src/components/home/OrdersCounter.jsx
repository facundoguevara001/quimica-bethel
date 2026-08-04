import "./OrdersCounter.css";
import { FaBoxOpen, FaCircle } from "react-icons/fa";

function OrdersCounter({ ordersToday }) {

    const now = new Date();

    const lastUpdate = now.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (

        <section className="orders-counter">

            <div className="orders-left">

                <div className="orders-icon">

                    <FaBoxOpen />

                </div>

                <div className="orders-info">

                    <span className="orders-label">

                        PEDIDOS DE HOY

                    </span>

                    <h2>

                        {ordersToday}

                    </h2>

                    <div className="orders-status">

                        <FaCircle />

                        <span>Actualización automática</span>

                    </div>

                    <small>

                        Última actualización {lastUpdate} hs

                    </small>

                </div>

            </div>

        </section>

    );

}

export default OrdersCounter;