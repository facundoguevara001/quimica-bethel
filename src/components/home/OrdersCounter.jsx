import { FaBoxOpen } from "react-icons/fa";

function OrdersCounter({ ordersToday }) {

    return (

        <section className="orders-counter">

            <div className="orders-icon">

                <FaBoxOpen />

            </div>

            <div className="orders-info">

                <h2>Pedidos del día</h2>

                <p>

                    Contador en tiempo real
                    <br />
                    de 8:00 AM a 5:00 PM
                    <br />
                    (Hora Argentina 🇦🇷)

                </p>

            </div>

            <div>

                <div className="orders-display">

                    <div className="digit">
                        {String(ordersToday).padStart(2, "0")[0]}
                    </div>

                    <div className="digit">
                        {String(ordersToday).padStart(2, "0")[1]}
                    </div>

                    <span className="slash">/</span>

                    <div className="digit">1</div>
                    <div className="digit">0</div>
                    <div className="digit">0</div>

                </div>

                <div className="orders-footer">

                    unidades vendidas hoy

                </div>

            </div>

        </section>

    );

}

export default OrdersCounter;