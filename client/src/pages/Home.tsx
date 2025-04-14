import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProductCategories from "@/components/ProductCategories";
import Testimonials from "@/components/Testimonials";
import JoinForm from "@/components/JoinForm";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <WhyChooseUs />
        <ProductCategories />
        <Testimonials />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}
