import { motion } from "framer-motion";

const particles = [

    { left: "8%", top: "20%", size: 6, delay: 0 },
    { left: "18%", top: "70%", size: 4, delay: 1 },
    { left: "30%", top: "10%", size: 8, delay: 2 },
    { left: "48%", top: "85%", size: 5, delay: 3 },
    { left: "62%", top: "18%", size: 7, delay: 4 },
    { left: "74%", top: "72%", size: 4, delay: 5 },
    { left: "88%", top: "30%", size: 6, delay: 6 },
    { left: "95%", top: "65%", size: 5, delay: 7 }

];

function HeroParticles() {

    return (

        <div className="hero-particles">

            {particles.map((particle, index) => (

                <motion.span
                    key={index}
                    className="particle"
                    style={{
                        left: particle.left,
                        top: particle.top,
                        width: particle.size,
                        height: particle.size
                    }}
                    animate={{
                        y: [0, -18, 0],
                        opacity: [0.25, 1, 0.25],
                        scale: [1, 1.4, 1]
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay * 0.25
                    }}
                />

            ))}

        </div>

    );

}

export default HeroParticles;