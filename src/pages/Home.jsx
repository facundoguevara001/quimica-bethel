


import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import MainLayout from "../layout/MainLayout";
import products from "../data/products";
import ReviewsSection from "../components/home/ReviewsSection";
import FooterLinks from "../components/home/FooterLinks";
import FAQ from "../components/home/FAQ";
import AboutUs from "../components/home/AboutUs";
import PolicySection from "../components/home/PolicySection";
import ContactSection from "../components/home/ContactSection";

import FadeInSection from "../components/common/FadeInSection";

function Home() {

    const featuredProducts = products.filter(
        product => product.featured
    );

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

                <FadeInSection delay={0.35}>
    <PolicySection />
</FadeInSection>

                <ContactSection />



                
                <FooterLinks />

    
                

            </div>

        </MainLayout>


    );
}

export default Home;