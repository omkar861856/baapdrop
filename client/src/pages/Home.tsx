import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductCategories from "@/components/ProductCategories";
import Testimonials from "@/components/Testimonials";
import JoinForm from "@/components/JoinForm";
import Features from "@/components/Features";
import PotentialCalculator from "@/components/PotentialCalculator";
import SuccessMetrics from "@/components/SuccessMetrics";
import WinningProducts from "@/components/WinningProducts";
import PricingPlans from "@/components/PricingPlans";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";
import SupportedPlatforms from "@/components/SupportedPlatforms";
import MediaRecognition from "@/components/MediaRecognition";
import FeaturedProducts from "@/components/FeaturedProduts";

export default function Home() {
  return (
    <div className="min-h-screen">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <SupportedPlatforms />
        <HowItWorks />
        <Features />
        <WhyChooseUs />
        <ProductCategories />
        <FeaturedProducts />
        <WinningProducts />
        <MediaRecognition />
        {/* <PotentialCalculator /> */}
        {/* <SuccessMetrics /> */}
        <PricingPlans />
        <Testimonials />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}
