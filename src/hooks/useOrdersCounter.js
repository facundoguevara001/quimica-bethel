import { useEffect, useState } from "react";

function useOrdersCounter() {

    const [ordersToday, setOrdersToday] = useState(0);

    useEffect(() => {

        const today = new Date().toDateString();

        let targetOrders =
            Number(localStorage.getItem("targetOrders"));

        let targetDate =
            localStorage.getItem("targetDate");

        if (targetDate !== today) {

            targetOrders =
                Math.floor(Math.random() * 61) + 35;

            localStorage.setItem(
                "targetOrders",
                targetOrders
            );

            localStorage.setItem(
                "targetDate",
                today
            );

        }

        function calculateOrders() {

            const now = new Date();

            const argentina = new Date(
                now.toLocaleString("en-US", {
                    timeZone: "America/Argentina/Buenos_Aires"
                })
            );

            const hour = argentina.getHours();
            const minute = argentina.getMinutes();

            const currentMinutes =
                hour * 60 + minute;

            const start = 8 * 60;
            const end = 17 * 60;

            if (currentMinutes <= start) {

                setOrdersToday(0);
                return;

            }

            if (currentMinutes >= end) {

                setOrdersToday(targetOrders);
                return;

            }

            const progress =
                (currentMinutes - start) /
                (end - start);

            setOrdersToday(
                Math.floor(progress * targetOrders)
            );

        }

        calculateOrders();

        const interval = setInterval(
            calculateOrders,
            60000
        );

        return () => clearInterval(interval);

    }, []);

    return ordersToday;

}

export default useOrdersCounter;