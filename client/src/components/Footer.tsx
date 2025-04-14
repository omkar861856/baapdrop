import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Youtube, 
  CreditCard, 
  ShieldCheck, 
  Truck, 
  Heart, 
  ChevronRight, 
  ArrowUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };
  
  // Show scroll to top button when user scrolls down
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-primary-950 text-white relative">
      {/* Newsletter and CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-lg shadow-xl py-10 px-6 md:px-10 -mt-20 mb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Join Our Community</h3>
              <p className="text-white/80 mb-0">
                Subscribe to our newsletter for updates, new products and special offers. 
                Join thousands of successful dropshipping entrepreneurs.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 py-3 px-4 rounded-lg text-white w-full md:w-2/3"
              />
              <Button 
                className="bg-white text-primary hover:bg-white/90 shadow-lg w-full md:w-auto"
              >
                Subscribe Now
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Badges */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { icon: <ShieldCheck className="h-10 w-10" />, title: "Secure Payments", desc: "Multiple payment options" },
            { icon: <Truck className="h-10 w-10" />, title: "Fast Delivery", desc: "Across India" },
            { icon: <CreditCard className="h-10 w-10" />, title: "Easy Refunds", desc: "Hassle-free process" },
            { icon: <Heart className="h-10 w-10" />, title: "Quality Assured", desc: "All products verified" }
          ].map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-sm">
                {badge.icon}
              </div>
              <h4 className="font-bold text-lg mb-1">{badge.title}</h4>
              <p className="text-white/70 text-sm">{badge.desc}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">BaapDrop</h3>
            <p className="text-gray-300 mb-6">
              India's leading dropshipping platform for entrepreneurs to start and grow their business without inventory or upfront investment.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/10">
              <h4 className="font-semibold mb-3">Download Our App</h4>
              <div className="flex space-x-3">
                <a href="#" className="bg-black rounded-lg p-2 flex-1 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.9184 13.3841C17.8901 10.9848 19.8983 9.73055 20.0057 9.66948C18.6391 7.62422 16.5056 7.35058 15.7679 7.32782C13.9618 7.13595 12.199 8.3447 11.2853 8.3447C10.3504 8.3447 8.92123 7.35058 7.40707 7.38243C5.42618 7.41429 3.59552 8.56443 2.59702 10.3297C0.525327 13.9348 2.0598 19.6245 4.04069 22.8756C5.031 24.4681 6.17864 26.2561 7.6848 26.1923C9.15729 26.1194 9.70436 25.2479 11.471 25.2479C13.2172 25.2479 13.7278 26.1923 15.2692 26.1512C16.8561 26.1194 17.8345 24.5542 18.7899 22.9434C19.9466 21.1281 20.4117 19.3537 20.4395 19.2763C20.3944 19.2581 17.9532 18.2912 17.9184 13.3841Z"/>
                    <path d="M14.7132 5.25735C15.5288 4.23333 16.0783 2.84367 15.9253 1.4313C14.7495 1.47225 13.2936 2.25581 12.4421 3.24617C11.682 4.13033 11.0152 5.58818 11.1961 6.93055C12.5238 7.02159 13.8616 6.25713 14.7132 5.25735Z"/>
                  </svg>
                </a>
                <a href="#" className="bg-black rounded-lg p-2 flex-1 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12l-10.183 10.186c-0.287-0.307-0.464-0.723-0.464-1.184V2.997c0-0.461 0.177-0.877 0.464-1.184z" />
                    <path d="M14.727 12.936L5.764 21.898l10.929-6.462c0.418-0.247 0.688-0.702 0.688-1.197 0-0.5-0.27-0.95-0.688-1.197l-10.929-6.462 8.963 8.956z" />
                    <path d="M5.764 2.102l8.963 8.834-8.963 8.962c-0.287-0.307-0.464-0.723-0.464-1.184V3.286c0-0.461 0.177-0.877 0.464-1.184z" />
                    <path d="M19.609 12l-3.255-1.926-10.59-6.26c0.418-0.247 0.913-0.311 1.377-0.166l15.667 8.352z" />
                    <path d="M19.609 12l-13.845 8.186c-0.464 0.145-0.959 0.081-1.377-0.166l10.59-6.26 4.632-1.76z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { id: "hero", label: "Home" },
                { id: "how-it-works", label: "How It Works" },
                { id: "why-us", label: "Why Choose Us" },
                { id: "products", label: "Products" },
                { id: "testimonials", label: "Success Stories" },
                { id: "join-now", label: "Join Now" }
              ].map((link) => (
                <li key={link.id}>
                  <a 
                    href={`#${link.id}`} 
                    className="text-gray-300 hover:text-white flex items-center group transition duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Resources</h3>
            <ul className="space-y-4">
              {[
                "Help Center", "Reseller Guide", "Product Catalog", 
                "Shipping Policy", "Refund Policy", "FAQ"
              ].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-300 hover:text-white flex items-center group transition duration-300">
                    <ChevronRight className="h-4 w-4 mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary-400" />
                <span className="text-gray-300">support@baapdrop.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary-400" />
                <span className="text-gray-300">
                  123 Business Hub, Floor 5<br />
                  Andheri East, Mumbai 400069<br />
                  Maharashtra, India
                </span>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-semibold mb-3">Customer Support Hours</h4>
              <p className="text-gray-300 text-sm">
                Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: 10:00 AM - 5:00 PM
              </p>
            </div>
          </div>
        </div>
        
        {/* Payment Methods and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <h4 className="font-semibold mb-4">Secured Payment Methods</h4>
            <div className="flex flex-wrap gap-3">
              {["Visa", "Mastercard", "PayPal", "UPI", "Net Banking", "Cash on Delivery"].map((payment, index) => (
                <div key={index} className="bg-white/10 px-4 py-2 rounded-md text-sm">
                  {payment}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Certifications & Partnerships</h4>
            <div className="flex flex-wrap gap-3">
              {["ISO Certified", "Trusted Merchant", "SSL Secured", "MSME Registered"].map((cert, index) => (
                <div key={index} className="bg-white/10 px-4 py-2 rounded-md text-sm flex items-center">
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-400" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} BaapDrop. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-300">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-300">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-300">Shipping Policy</a>
            <a href="#" className="text-gray-300 hover:text-white text-sm transition duration-300">Refund Policy</a>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showScrollButton && (
        <motion.button
          className="fixed bottom-8 right-8 bg-primary text-white p-3 rounded-full shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowUp className="h-6 w-6" />
        </motion.button>
      )}
    </footer>
  );
}
