import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckCircle,
  ArrowRight,
  Phone,
  Download,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";
import { useLocation } from "wouter";

export default function Hero() {
  const [_, setLocation] = useLocation();
  const statsItems = [
    { value: "10,000+", label: "Products" },
    { value: "50%+", label: "Profit Margin" },
    { value: "24/7", label: "Support" },
    { value: "₹0", label: "Investment" },
  ];

  return (
    <section
      id="hero"
      className="hero-gradient text-white relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-32 -left-20 w-60 h-60 rounded-full bg-white opacity-5"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Start Your <span className="text-yellow-300">Dropshipping</span>{" "}
                Business Today!
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-xl lg:text-2xl mb-8 text-white/90">
                Sell 10,000+ trending products under your own brand name with{" "}
                <strong>zero inventory</strong> and <strong>zero risk</strong>.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="primary-gradient animated-btn font-medium px-8 py-6 text-lg shadow-lg"
                onClick={() => scrollToElement("join-now")}
              >
                Join as Reseller
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-medium px-6 py-6 text-lg"
                onClick={() => scrollToElement("how-it-works")}
              >
                How It Works
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm md:text-base">
                  No investment required
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm md:text-base">
                  No inventory to manage
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm md:text-base">
                  Shipping across India
                </span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                <span className="text-sm md:text-base">
                  High profit margins
                </span>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              {statsItems.map((stat, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-lg py-2 px-2"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs md:text-sm text-white/80">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Demo Page Link - for developers */}
            <motion.div
              className="mt-8 text-center lg:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="bg-white/20 backdrop-blur-sm border-white/40 text-white hover:bg-white/30"
                onClick={() => setLocation("/demo")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Demo Page Template
              </Button>
              <p className="text-xs mt-2 text-white/70">
                Example page template for developers
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main image with decorative elements */}
              <motion.div
                className="absolute inset-0 bg-primary/20 rounded-xl blur-3xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/20">
                <img
                  src="https://placehold.co/600x400"
                  alt="Entrepreneur managing online dropshipping business"
                  className="w-full h-auto rounded-lg"
                  width="600"
                  height="400"
                />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-xl p-3 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-primary rounded-full p-2 mr-2">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">Easy to start</p>
                  <p className="text-xs text-gray-500">Beginner friendly</p>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-5 -right-5 bg-white rounded-lg shadow-xl p-3 flex items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-green-500 rounded-full p-2 mr-2">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold text-gray-800">
                    WhatsApp Support
                  </p>
                  <p className="text-xs text-gray-500">24/7 assistance</p>
                </div>
              </motion.div>
            </div>

            {/* Second floating CTA */}
            <motion.div
              className="hidden md:flex items-center mt-8 justify-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <Button
                className="whatsapp-btn shadow-lg bg-green-500"
                onClick={() =>
                  window.open("https://wa.me/yourphonenumber", "_blank")
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.269-.468-2.416-1.483-.893-.795-1.496-1.77-1.672-2.07-.173-.3-.018-.462.13-.61.134-.133.301-.347.451-.52.151-.174.2-.298.3-.497.099-.198.05-.371-.025-.52-.075-.149-.673-1.621-.923-2.22-.249-.6-.497-.61-.673-.61-.173 0-.4-.025-.6-.025-.199 0-.523.074-.797.372-.273.299-1.045 1.019-1.045 2.486 0 1.467 1.069 2.884 1.22 3.081.15.198 2.105 3.208 5.1 4.487.714.306 1.27.489 1.704.626.714.224 1.365.195 1.88.118.574-.077 1.767-.719 2.016-1.413.249-.694.249-1.29.173-1.414-.074-.124-.272-.198-.572-.347m-5.498 7.497h-.004c-1.521 0-3.025-.386-4.343-1.117l-.312-.186-3.234.827.85-3.102-.202-.324c-.802-1.267-1.231-2.743-1.231-4.353 0-4.41 3.586-7.997 8.001-7.997 2.139 0 4.143.834 5.65 2.341 1.506 1.503 2.35 3.507 2.347 5.644-.001 4.416-3.589 8.008-8.006 8.008"></path>
                </svg>
                Join on WhatsApp
              </Button>
              <Button
                variant="outline"
                className="bg-white text-primary border-white shadow-lg hover:bg-white/90 font-medium"
                onClick={() => scrollToElement("join-now")}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Catalog
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
