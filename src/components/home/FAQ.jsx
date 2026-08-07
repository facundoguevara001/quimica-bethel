import { useState } from "react";
import "./FAQ.css";

const questions = [
    {
        question: "¿Realizan envíos?",
        answer:
            "Sí. Realizamos envíos dentro de CABA y Gran Buenos Aires."
            
        

            
            
    },
    {
        question: "¿Puedo comprar por mayor?",
        answer:
            "Sí. Tenemos precios especiales para revendedores, empresas y comercios."
    },
    {
        question: "¿Qué métodos de pago aceptan?",
        answer:
            "Aceptamos efectivo, transferencia bancaria y billeteras virtuales."
    },
    {
        question: "¿Los productos tienen garantía?",
        answer:
            "Sí. Todos nuestros productos cuentan con garantía de calidad."
    }
];

function FAQ() {

    const [open, setOpen] = useState(null);

    return (

        <section 
        
        id="faq"
        className="faq-section">

            <h2>

                ❓ Preguntas Frecuentes

            </h2>

            {

                questions.map((item, index) => (

                    <div
                        key={index}
                        className="faq-item"
                    >

                        <button
                            className="faq-question"
                            onClick={() =>
                                setOpen(
                                    open === index
                                        ? null
                                        : index
                                )
                            }
                        >

                            <span>

                                {item.question}

                            </span>

                            <span>

                                {open === index ? "−" : "+"}

                            </span>

                        </button>

                        {

                            open === index && (

                                <div className="faq-answer">

                                    {item.answer}

                                </div>

                            )

                        }

                    </div>

                ))

            }

        </section>

    );

}

export default FAQ;