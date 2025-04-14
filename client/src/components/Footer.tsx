import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { scrollToElement } from "@/lib/utils";

export default function Footer() {
  const handleNavClick = (id: string) => {
    scrollToElement(id);
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">DropMaster</h3>
            <p className="text-gray-400 mb-4">
              The leading platform for entrepreneurs to start and grow their dropshipping business without inventory or upfront investment.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#hero" 
                  className="text-gray-400 hover:text-white transition duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("hero");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#how-it-works" 
                  className="text-gray-400 hover:text-white transition duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("how-it-works");
                  }}
                >
                  How It Works
                </a>
              </li>
              <li>
                <a 
                  href="#why-us" 
                  className="text-gray-400 hover:text-white transition duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("why-us");
                  }}
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a 
                  href="#products" 
                  className="text-gray-400 hover:text-white transition duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("products");
                  }}
                >
                  Products
                </a>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="text-gray-400 hover:text-white transition duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("testimonials");
                  }}
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a 
                  href="#join-now" 
                  className="text-gray-400 hover:text-white transition duration-300"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("join-now");
                  }}
                >
                  Join Now
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Reseller Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Success Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400">support@dropmaster.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400">+1 (234) 567-8901</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-gray-400" />
                <span className="text-gray-400">123 Business Street, Suite 100<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} DropMaster. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
