import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cart, setCart] = useState(() => {

        const saved = localStorage.getItem("bethel-cart");

        return saved ? JSON.parse(saved) : [];

    });

    useEffect(() => {

        localStorage.setItem(
            "bethel-cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    function addToCart(product) {

        setCart(current => {

            const existing = current.find(
                item => item.id === product.id
            );

            if (existing) {

                return current.map(item =>

                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item

                );

            }

            return [

                ...current,

                {
                    ...product,
                    quantity: 1
                }

            ];

        });

    }

    function removeFromCart(id) {

        setCart(current =>
            current.filter(item => item.id !== id)
        );

    }

    function increaseQuantity(id) {

        setCart(current =>

            current.map(item =>

                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item

            )

        );

    }

    function decreaseQuantity(id) {

        setCart(current =>

            current.flatMap(item => {

                if (item.id !== id) return item;

                if (item.quantity === 1) return [];

                return {

                    ...item,

                    quantity: item.quantity - 1

                };

            })

        );

    }function clearCart() {

    setCart([]);

}
    

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (acc, item) =>
            acc +
            Number(item.cost) *
            (Number(item.margin) + 1) *
            item.quantity,
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
