import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneCall, Download, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (id: string) => {
    // Slight delay for mobile menu to ensure DOM is updated before scrolling
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Add a small delay before scrolling on mobile
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    } else {
      scrollToElement(id);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2" 
          : "bg-gradient-to-r from-[#ffebf1] via-white to-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo */}
            <a href="#" className="flex items-center" onClick={() => handleNavClick("hero")}>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="text-primary text-2xl font-bold">BaapDrop</span>
              </div>
            </a>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { id: "how-it-works", label: "How It Works" },
              { id: "why-us", label: "Why Choose Us" },
              { id: "products", label: "Products" },
              { id: "calculator", label: "Profit Calculator" },
              { id: "success-metrics", label: "Success Metrics" },
              { id: "testimonials", label: "Success Stories" }
            ].map((item, index) => (
              <motion.a 
                key={item.id}
                href={`#${item.id}`} 
                className="text-gray-700 hover:text-primary font-medium relative"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Button 
                variant="outline"
                size="sm"
                className="border-primary text-primary hover:bg-primary hover:text-white"
                onClick={() => handleNavClick("join-now")}
              >
                <Download className="mr-1 h-4 w-4" />
                Download App
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Button 
                size="sm"
                className="primary-gradient animated-btn"
                onClick={() => handleNavClick("join-now")}
              >
                <PhoneCall className="mr-1 h-4 w-4" />
                Join Now
              </Button>
            </motion.div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button 
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-primary focus:outline-none p-1" 
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="md:hidden py-4 mt-2 bg-white rounded-lg shadow-lg"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {[
                { id: "how-it-works", label: "How It Works" },
                { id: "why-us", label: "Why Choose Us" },
                { id: "products", label: "Products" },
                { id: "calculator", label: "Profit Calculator" },
                { id: "success-metrics", label: "Success Metrics" },
                { id: "testimonials", label: "Success Stories" }
              ].map((item, index) => (
                <motion.a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className="block py-2 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * index }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-3 px-4 space-y-2">
                <Button 
                  variant="outline"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={() => handleNavClick("join-now")}
                >
                  <Download className="mr-1 h-4 w-4" />
                  Download App
                </Button>
                <Button 
                  className="w-full primary-gradient"
                  onClick={() => handleNavClick("join-now")}
                >
                  <PhoneCall className="mr-1 h-4 w-4" />
                  Join Now
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
