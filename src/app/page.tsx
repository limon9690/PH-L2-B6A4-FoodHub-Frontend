import { FeaturedMeals } from "@/components/featured-meals";
import { FeaturedProviders } from "@/components/featured-providers";
import { HeroSection } from "@/components/hero-component";
import { TrustSection } from "@/components/trust-section";

export default function Home() {
  return (
    <div className="container py-10 px-4 sm:px-6 lg:px-12">
      <HeroSection />
      <FeaturedMeals/>
      <FeaturedProviders/>
      <TrustSection />
    </div>
  );
}
