import { HeroSection } from "@/components/storefront/hero-section";
import { CategorySection } from "@/components/storefront/category-section";
import { FeaturedProductsSection } from "@/components/storefront/featured-products-section";

const StoreFrontLandingPage = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProductsSection />
    </>
  );
};

export default StoreFrontLandingPage;