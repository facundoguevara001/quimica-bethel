


import Hero from "../components/home/Hero";
import CategorySection from "../components/home/Categorysection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import MainLayout from "../layout/MainLayout";
import products from "../data/products";
import ReviewsSection from "../components/home/ReviewsSection";
import Footer from "../components/home/Footer";
import FAQ from "../components/home/FAQ";
import AboutUs from "../components/home/AboutUs";
import PolicySection from "../components/home/PolicySection";
import ContactSection from "../components/home/ContactSection";
import StatsStrip from "../components/home/StatsStrip";

import FadeInSection from "../components/common/FadeInSection";

function Home() {

    const featuredProducts = products.filter(
        product => product.featured
    );

    const activeProducts = products.filter(
        product => product.status === "Activo"
    ).length;

    const categoriesCount = new Set(
        products.map(product =>
            product.category.trim().toLowerCase()
        )
    ).size;

    const yearsSince = new Date().getFullYear() - 2020;

    const cards = [
    ...featuredProducts,
    ...featuredProducts
];

    return (

        <MainLayout>

            <div className="home">

               <Hero />

                <CategorySection />

                <FadeInSection delay={0.1}>
                <FeaturedProducts
    cards={cards}
/>
                
                 </FadeInSection>


                <FadeInSection delay={0.2}>
    <ReviewsSection />
</FadeInSection>

                <FAQ />
                <FadeInSection delay={0.3}>
    <AboutUs />
</FadeInSection>

                <StatsStrip
                    productsCount={activeProducts}
                    categoriesCount={categoriesCount}
                    yearsSince={yearsSince}
                />

                <FadeInSection delay={0.35}>
    <PolicySection />
</FadeInSection>

                <ContactSection />



                
                <Footer />

    
                

            </div>

        </MainLayout>


    );
}

export default Home;