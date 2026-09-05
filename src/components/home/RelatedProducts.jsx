import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useCart } from "../../context/CartContext";
import "./FeaturedCard.css";
import "./RelatedProducts.css";

export default function RelatedProducts({ cards, title }) {
    const { addToCart } = useCart();
    const reducedMotion = useReducedMotion();
    const id = useId();
    const viewport = useRef(null);
    const group = useRef(null);
    const panel = useRef(null);
    const trigger = useRef(null);
    const gesture = useRef(null);
    const suppressClick = useRef(false);
    const interaction = useRef({ active: false, hover: false, focus: false, until: 0 });
    const fraction = useRef(0);
    const [active, setActive] = useState(null);
    const [variantSlug, setVariantSlug] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [paused, setPaused] = useState(false);
    const variants = active ? (active.variants?.length ? active.variants : [active]) : [];
    const selected = variants.find(item => item.slug === variantSlug);

    function close(restoreFocus = false) {
        interaction.current.active = false;
        setActive(null);
        setConfirmation("");
        if (restoreFocus && interaction.current.focus) trigger.current?.focus({ preventScroll: true });
    }

    useEffect(() => {
        function outside(event) {
            if (panel.current?.contains(event.target) || trigger.current?.contains(event.target)) return;
            interaction.current.active = false;
            setActive(null);
            setConfirmation("");
        }
        function release() { gesture.current = null; }
        document.addEventListener("pointerdown", outside);
        window.addEventListener("pointerup", release);
        window.addEventListener("pointercancel", release);
        return () => {
            document.removeEventListener("pointerdown", outside);
            window.removeEventListener("pointerup", release);
            window.removeEventListener("pointercancel", release);
        };
    }, []);

    useAnimationFrame((_, delta) => {
        const state = interaction.current;
        const el = viewport.current;
        const width = group.current?.getBoundingClientRect().width;
        if (!el || !width || cards.length < 2 || reducedMotion || paused || state.active ||
            state.hover || state.focus || gesture.current || performance.now() < state.until) return;
        // Keep fractional pixels without a React render on every animation frame.
        fraction.current += Math.min(delta, 50) * 0.036;
        const step = Math.floor(fraction.current);
        fraction.current -= step;
        if (step) el.scrollLeft = (el.scrollLeft + step) % width;
    });

    function reveal(product, event) {
        if (suppressClick.current) return;
        interaction.current.active = true;
        trigger.current = event.currentTarget;
        setActive(product);
        setVariantSlug(product.variants?.length > 1 ? "" : product.slug);
        setConfirmation("");
        // Move keyboard focus directly into the actions; touch keeps its position.
        if (event.detail === 0) requestAnimationFrame(() => panel.current?.querySelector("button")?.focus({ preventScroll: true }));
    }

    if (!cards.length) return null;

    return (
        <section className="related-carousel" aria-labelledby={`${id}-title`}
            onFocusCapture={event => { interaction.current.focus = event.target.matches(":focus-visible"); }}
            onBlurCapture={event => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                    interaction.current.focus = false;
                    close();
                }
            }}
            onKeyDown={event => {
                if (event.key === "Escape" && active) { event.preventDefault(); close(true); }
            }}>
            <div className="related-carousel-header">
                <h2 id={`${id}-title`}>{title}</h2>
                <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}
                    disabled={!!reducedMotion || cards.length < 2}>
                    {reducedMotion ? "Movimiento reducido" : paused ? "Reanudar movimiento" : "Pausar movimiento"}
                </button>
            </div>
            <p className="related-carousel-hint">Deslizá para explorar. Tocá un producto para ver las opciones.</p>
            <div className="related-carousel-viewport" ref={viewport}
                onPointerEnter={event => { if (event.pointerType === "mouse") interaction.current.hover = true; }}
                onPointerLeave={() => { interaction.current.hover = false; }}
                onWheel={() => { interaction.current.until = performance.now() + 800; }}
                onPointerDown={event => {
                    if (!event.isPrimary || event.button !== 0) return;
                    suppressClick.current = false;
                    gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, left: viewport.current.scrollLeft };
                }}
                onPointerMove={event => {
                    const start = gesture.current;
                    if (!start || start.id !== event.pointerId) return;
                    const dx = event.clientX - start.x;
                    const dy = event.clientY - start.y;
                    if (Math.hypot(dx, dy) > 8) suppressClick.current = true;
                    if (suppressClick.current && Math.abs(dx) > Math.abs(dy)) {
                        event.currentTarget.setPointerCapture(event.pointerId);
                        viewport.current.scrollLeft = start.left - dx;
                    }
                }}
                onPointerUp={() => { gesture.current = null; interaction.current.until = performance.now() + 300; }}
                onPointerCancel={() => { suppressClick.current = true; gesture.current = null; }}
                onClickCapture={event => {
                    if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); }
                }}>
                <div className="related-carousel-track">
                    {(cards.length > 1 ? [0, 1] : [0]).map(copy => (
                        <div className="related-carousel-group" key={copy} ref={copy === 0 ? group : undefined}>
                            {cards.map(product => (
                                <button key={product.slug} type="button"
                                    className={`featured-card related-carousel-card${active?.slug === product.slug ? " is-active" : ""}`}
                                    tabIndex={copy === 0 ? 0 : -1}
                                    aria-expanded={active?.slug === product.slug}
                                    aria-controls={active?.slug === product.slug ? `${id}-actions` : undefined}
                                    aria-label={`Opciones de ${product.name}`}
                                    onDragStart={event => event.preventDefault()}
                                    onClick={event => { if (event.detail === 0) suppressClick.current = false; reveal(product, event); }}>
                                    <span className="featured-card-image">
                                        <img src={product.image} alt="" loading="lazy" draggable="false" />
                                    </span>
                                    <span className="featured-card-info">
                                        <strong>{product.name}</strong>
                                        <span>{product.variants?.length > 1 ? `${product.variants.length} presentaciones` : product.variantLabel}</span>
                                        <span className="featured-card-price">{product.variants?.length > 1 ? "Desde " : ""}{product.price}</span>
                                        <span className="related-carousel-hint">Ver opciones →</span>
                                    </span>
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            {active && (
                <div className="related-carousel-actions" id={`${id}-actions`} ref={panel}
                    role="region" aria-label={`Acciones para ${active.name}`}>
                    <div className="related-carousel-action-heading">
                        <strong>{active.name}</strong>
                        <button type="button" aria-label="Cerrar acciones" onClick={() => close(true)}>✕</button>
                    </div>
                    {variants.length > 1 && (
                        <label>Elegí una presentación
                            <select value={variantSlug} onChange={event => { setVariantSlug(event.target.value); setConfirmation(""); }}>
                                <option value="" disabled>Seleccionar presentación</option>
                                {variants.map(item => <option key={item.slug} value={item.slug}>{item.variantLabel} · {item.price}</option>)}
                            </select>
                        </label>
                    )}
                    <div className="related-carousel-buttons">
                        <Link to={`/producto/${selected?.slug || active.slug}`}>Ver producto</Link>
                        <button type="button" disabled={!selected} onClick={() => {
                            addToCart(selected, 1);
                            setConfirmation(`✓ Agregado al carrito: ${selected.name} · ${selected.variantLabel} (1 unidad).`);
                        }}>Agregar al carrito</button>
                    </div>
                    <p role="status" aria-live="polite" aria-atomic="true" className="related-carousel-confirmation">{confirmation}</p>
                </div>
            )}
        </section>
    );
}
