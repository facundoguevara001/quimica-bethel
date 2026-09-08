import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "../../utils/animation";

// Smaller values give a softer stop and less travel per wheel gesture.
const SCROLL_SETTINGS = { lerp: 0.075, wheelMultiplier: 0.75 };

export default function SmoothScroll() {
    const { key, pathname, hash } = useLocation();

    useLayoutEffect(() => {
        // Show the new product before paint, after old scroll inertia is cleared.
        // Reset before creating Lenis so its initial position is also at the top.
        if (pathname.startsWith("/producto/") && !hash) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }

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
    }, [key, pathname, hash]);

    return null;
}
