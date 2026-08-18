import Hero from "../components/home/Hero";
import CategorySection from "../components/home/CategorySection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import MainLayout from "../layout/MainLayout";
import products from "../data/products";
import ReviewsSection from "../components/home/ReviewsSection";
import StatsStrip from "../components/home/StatsStrip";
import Footer from "../components/home/Footer";

import FadeInSection from "../components/common/FadeInSection";

function Home() {

    const featuredProducts = products.filter(
        product => product.featured
    );

    const cards = [
        ...featuredProducts,
        ...featuredProducts
    ];

    const activeProducts = products.filter(
        product => product.status === "Activo"
    ).length;

    const categoriesCount = new Set(
        products.map(product =>
            product.category.trim().toLowerCase()
        )
    ).size;

    const yearsSince = new Date().getFullYear() - 2020;

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

                <StatsStrip
                    productsCount={activeProducts}
                    categoriesCount={categoriesCount}
                    yearsSince={yearsSince}
                />

                <FadeInSection delay={0.2}>
                    <ReviewsSection />
                </FadeInSection>

                <Footer />

            </div>

        </MainLayout>

    );

}

export default Home;