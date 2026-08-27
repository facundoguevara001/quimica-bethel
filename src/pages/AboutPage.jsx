import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import AboutHero from "../components/about/AboutHero";
import FAQ from "../components/home/FAQ";
import AboutUs from "../components/home/AboutUs";
import PolicySection from "../components/home/PolicySection";
import DeliveryInfo from "../components/about/Deliveryinfo";
import ReviewPolicy from "../components/about/ReviewPolicy";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/home/Footer";

function AboutPage() {

    const location = useLocation();

    useEffect(() => {

        if (location.hash) {

            const target = document.querySelector(location.hash);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        } else {

            window.scrollTo(0, 0);

        }

    }, [location]);

     return (

        <MainLayout>

            <div className="home">

                <AboutHero />

                <FAQ />

                <AboutUs />

                <PolicySection />

                <DeliveryInfo />

                <ReviewPolicy />

                <ContactSection />

                <Footer />

            </div>

        </MainLayout>

    );

}

export default AboutPage;