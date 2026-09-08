import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "../../utils/animation";

// Smaller values give a softer stop and less travel per wheel gesture.
const SCROLL_SETTINGS = { lerp: 0.075, wheelMultiplier: 0.75 };

export default function SmoothScroll() {
    const { key } = useLocation();

    useEffect(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            const lenis = new Lenis({
                ...SCROLL_SETTINGS,
                smoothWheel: true,
                syncTouch: false,
                anchors: true,
                allowNestedScroll: true,
                stopInertiaOnNavigate: true
            });
            const tick = (time) => lenis.raf(time * 1000);
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add(tick);

            return () => {
                gsap.ticker.remove(tick);
                lenis.destroy();
            };
        });

        return () => media.revert();
        // Drop pending wheel inertia on every navigation, including Back/Forward.
    }, [key]);

    return null;
}
