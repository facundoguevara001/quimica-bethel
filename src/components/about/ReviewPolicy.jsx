import "./ReviewPolicy.css";
import SectionHeader from "../common/SectionHeader";

import {
    FaWhatsapp,
    FaCheckCircle,
    FaBan
} from "react-icons/fa";

function ReviewPolicy() {

    return (
        <section
            id="revision"
            className="light-band"
        >

            <div className="review-policy-inner">

                <SectionHeader
                    theme="light"
                    number="04"
                    eyebrow="Comprá con total confianza"
                    titleBold="Revisás el pedido,"
                    titleAccent="pagás lo que te llevás."
                    subtitle="Recibís el pedido, lo revisás y si algo no te sirve, lo descontamos. Así de simple."
                />

                <div className="review-policy-callout">

                    <span className="review-policy-callout-icon">
                        <FaCheckCircle />
                    </span>

                    <div>
                        <strong>Cómo funciona</strong>

                        <p>
                            Cuando el repartidor te entrega el pedido, lo
                            revisás ahí mismo. Si hay algún producto que no
                            querés o no es lo que esperabas, lo descontamos
                            del total en el momento y pagás únicamente lo
                            que te quedás.
                        </p>
                    </div>

                </div>

                <div className="review-policy-points">

                    <div className="review-policy-point">

                        <span className="review-policy-point-icon">
                            <FaBan />
                        </span>

                        <h4>No trabajamos con reembolsos</h4>

                        <p>
                            Al resolverse todo en el momento de la entrega,
                            no hay que esperar devoluciones ni gestionar
                            reintegros después de la compra.
                        </p>

                    </div>

                    <div className="review-policy-point">

                        <span className="review-policy-point-icon">
                            <FaCheckCircle />
                        </span>

                        <h4>Vos decidís qué te llevás</h4>

                        <p>
                            Si no te convence un producto, simplemente no lo
                            pagás. No hace falta llevártelo para después
                            devolverlo.
                        </p>

                    </div>

                </div>

                <a
                    className="review-policy-whatsapp"
                    href="https://wa.me/5491125218692?text=Hola,%20quiero%20consultar%20por%20la%20pol%C3%ADtica%20de%20revisi%C3%B3n%20del%20pedido"
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaWhatsapp />
                    Consultar por este proceso
                </a>

            </div>

        </section>
    );
}

export default ReviewPolicy;