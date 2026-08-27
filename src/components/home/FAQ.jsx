import { useState } from "react";
import "./FAQ.css";
import SectionHeader from "../common/SectionHeader";

const questions = [

    {
        question: "¿Realizan envíos?",
        answer: "Sí. Envíos a zonas de CABA y Gran Buenos Aires, con un costo de $8.500 bonificado en compras mayores a $50.000. Más abajo detallamos las zonas exactas."
    },

    {
        question: "¿Puedo comprar por mayor?",
        answer: "Sí. Tenemos precios especiales para revendedores, empresas y comercios."
    },

    {
        question: "¿Qué métodos de pago aceptan?",
        answer: "Aceptamos efectivo, transferencia bancaria y billeteras virtuales."
    },

    {
        question: "¿Cómo consulto por un producto?",
        answer: "Escribinos por WhatsApp desde cualquier ficha de producto o desde el botón de contacto al pie de la página."
    }

];

function FAQ() {

    const [open, setOpen] = useState(null);

    return (

        <section
            id="faq"
            className="faq-section"
        >

            <SectionHeader
                theme="dark"
                number="02"
                eyebrow="Resolvemos tus dudas"
                titleBold="Preguntas"
                titleAccent="Frecuentes."
                subtitle="Lo importante, respondido antes de que tengas que preguntar. Si necesitás más ayuda, estamos a un mensaje de distancia."
            />

            <div className="faq-list">

                {questions.map((item, index) => (

                    <div
                        key={index}
                        className="faq-row"
                    >

                        <button
                            className="faq-question"
                            onClick={() =>
                                setOpen(open === index ? null : index)
                            }
                        >

                            <span>

                                {item.question}

                            </span>

                            <span className="faq-toggle">

                                {open === index ? "−" : "+"}

                            </span>

                        </button>

                        {open === index && (

                            <div className="faq-answer">

                                {item.answer}

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </section>

    );

}

export default FAQ;