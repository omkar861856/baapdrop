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
  ArrowUp,
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
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
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
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-primary-950 text-white relative">
      {/* Newsletter and CTA Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="bg-primary rounded-lg shadow-xl py-10 px-6 md:px-10 -mt-20 mb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Join Our Community
              </h3>
              <p className="text-white/80 mb-0">
                Subscribe to our newsletter for updates, new products and
                special offers. Join thousands of successful dropshipping
                entrepreneurs.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white backdrop-blur-sm border border-white/30 py-3 px-4 rounded-lg text-primary/90 placeholder:text-primary/90 w-full md:w-2/3"
              />
              <Button className="bg-white text-primary hover:bg-white/90 shadow-lg w-full md:w-auto">
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
            {
              icon: <ShieldCheck className="h-10 w-10" />,
              title: "Secure Payments",
              desc: "Multiple payment options",
            },
            {
              icon: <Truck className="h-10 w-10" />,
              title: "Fast Delivery",
              desc: "Across India",
            },
            {
              icon: <CreditCard className="h-10 w-10" />,
              title: "Easy Refunds",
              desc: "Hassle-free process",
            },
            {
              icon: <Heart className="h-10 w-10" />,
              title: "Quality Assured",
              desc: "All products verified",
            },
          ].map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-white/10 p-4 rounded-full mb-4 backdrop-blur-sm">
                {badge.icon}
              </div>
              <h4 className="font-bold text-lg mb-1">{badge.title}</h4>
              <p className="text-white/80 text-sm font-medium">{badge.desc}</p>
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
              India's leading dropshipping platform for entrepreneurs to start
              and grow their business without inventory or upfront investment.
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { id: "hero", label: "Home" },
                { id: "how-it-works", label: "How It Works" },
                { id: "why-us", label: "Why Us?" },
                { id: "products", label: "Products" },
                { id: "testimonials", label: "Success Stories" },
                { id: "join-now", label: "Join Now" },
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
                { label: "Pricing", url: "#pricing" },
                { label: "Demo Stores", url: "#demo-stores" },
                { label: "Ecommerce Features", url: "#features" },
                { label: "About Affiliate", url: "#affiliate" },
                {
                  label: "Affiliate Registration/Login",
                  url: "#affiliate-login",
                },
                { label: "Terms & Conditions", url: "#terms" },
                { label: "Privacy Policy", url: "#privacy" },
                { label: "Refund Policy", url: "#refund" },
                { label: "Blog", url: "#blog" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="text-gray-300 hover:text-white flex items-center group transition duration-300"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">More Information</h3>
            <ul className="space-y-4">
              {[
                { label: "Why Trust BaapDrop?", url: "#why-trust" },
                { label: "Contact Us", url: "#contact" },
                { label: "About us", url: "#about" },
                { label: "BaapDrop vs Others", url: "#comparison" },
                { label: "Become our supplier", url: "#supplier" },
                { label: "Invest @ baapstore", url: "#invest" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="text-gray-300 hover:text-white flex items-center group transition duration-300"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-primary-400 group-hover:translate-x-1 transition-transform duration-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-white/10">
              <h4 className="font-semibold mb-3">Contact Information</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 text-primary-400" />
                  <span className="text-gray-300">support@baapdrop.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 text-primary-400" />
                  <span className="text-gray-300">+91 98765 43210</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 pb-12 border-b border-black/30">
          <div>
            <h4 className="font-semibold mb-4">Secured Payment Methods</h4>
            <div className="flex flex-wrap gap-3">
              {[
                "Visa",
                "Mastercard",
                "PayPal",
                "UPI",
                "Net Banking",
                "Cash on Delivery",
              ].map((payment, index) => (
                <div
                  key={index}
                  className="bg-gray-600 px-4 py-2 rounded-md text-sm font-medium"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">
              Certifications & Partnerships
            </h4>
            <div className="flex flex-wrap gap-3">
              {[
                "ISO Certified",
                "Trusted Merchant",
                "SSL Secured",
                "MSME Registered",
              ].map((cert, index) => (
                <div
                  key={index}
                  className="bg-gray-600 px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <ShieldCheck className="h-4 w-4 mr-2 text-green-400" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Links */}
        <div className="flex flex-col md:flex-row justify-between items-center font-bold">
          <p className="text-gray-700 text-sm mb-6 md:mb-0">
            &copy; {new Date().getFullYear()} BaapDrop. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="text-gray-700 hover:text-white text-sm transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-white text-sm transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-white text-sm transition duration-300"
            >
              Shipping Policy
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-white text-sm transition duration-300"
            >
              Refund Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollButton && (
        <motion.button
          className="fixed bottom-8 left-8 bg-primary text-white p-3 rounded-full shadow-lg z-50"
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
