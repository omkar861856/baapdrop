import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="hero-gradient text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Start Your E-Commerce Dropshipping Business Today!
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Sell 10,000+ products under your brand name. No inventory, no risk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 font-bold shadow-lg"
                onClick={() => scrollToElement("join-now")}
              >
                Become a Reseller
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary"
                onClick={() => scrollToElement("how-it-works")}
              >
                Learn How It Works
              </Button>
            </div>
            <div className="mt-8 flex items-center">
              <CheckCircle className="h-6 w-6 mr-2" />
              <span>Over 1,000+ resellers already earning</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
              alt="Entrepreneur managing online dropshipping business" 
              className="rounded-lg shadow-2xl max-w-full h-auto" 
              width="500" 
              height="350"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Wave Divider */}
      <div className="text-light">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150">
          <path fill="currentColor" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,150L1360,150C1280,150,1120,150,960,150C800,150,640,150,480,150C320,150,160,150,80,150L0,150Z"></path>
        </svg>
      </div>
    </section>
  );
}
