import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("bethel-cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("bethel-cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product, quantity = 1) {
        setCart(current => {
            const existing = current.find(
                item => item.slug === product.slug
            );

            if (existing) {
                return current.map(item =>
                    item.slug === product.slug
                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                        : item
                );
            }

            return [
                ...current,
                {
                    ...product,
                    quantity
                }
            ];
        });
    }

    function removeFromCart(slug) {
        setCart(current =>
            current.filter(item => item.slug !== slug)
        );
    }

    function increaseQuantity(slug) {
        setCart(current =>
            current.map(item =>
                item.slug === slug
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(slug) {
        setCart(current =>
            current.flatMap(item => {
                if (item.slug !== slug) return item;

                if (item.quantity === 1) return [];

                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            })
        );
    }

    function clearCart() {
        setCart([]);
    }

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (acc, item) =>
            acc + Number(item.salePrice) * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}