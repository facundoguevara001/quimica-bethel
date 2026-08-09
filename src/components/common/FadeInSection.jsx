import { motion } from "framer-motion";

function FadeInSection({ children, delay = 0 }) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 50
            }}
            whileInView={{
                opacity: 1,
                y: 0
            }}
            viewport={{
                once: true,
                amount: 0,
                margin: "0px 0px -100px 0px"
            }}
            transition={{
                duration: 0.6,
                delay
            }}
        >
            {children}
        </motion.div>
    );
}

export default FadeInSection;