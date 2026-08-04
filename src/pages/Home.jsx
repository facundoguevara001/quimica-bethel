import Hero from "../components/home/Hero";
import HomeLinks from "../components/home/HomeLinks";
import FeaturedProducts from "../components/home/FeaturedProducts";
import OrdersCounter from "../components/home/OrdersCounter";

import MainLayout from "../layout/MainLayout";

import products from "../data/products";

import useOrdersCounter from "../hooks/useOrdersCounter";

import { useState } from "react";
import { useAnimationFrame } from "framer-motion";

function Home() {

    const ordersToday = useOrdersCounter();

    const featuredProducts = products.filter(
        product => product.featured
    );

    const [x, setX] = useState(0);

    const cards = [
        ...featuredProducts,
        ...featuredProducts
    ];

    useAnimationFrame(() => {

        setX(prev => {

            const next = prev - 0.6;

            if (next <= -(featuredProducts.length * 310)) {
                return 0;
            }

            return next;

        });

    });

    return (

        <MainLayout>

            <div className="home">

                <Hero />

                <HomeLinks />

                <FeaturedProducts
                    cards={cards}
                    x={x}
                />

                <OrdersCounter
                    ordersToday={ordersToday}
                />

            </div>

        </MainLayout>

    );

}

export default Home;