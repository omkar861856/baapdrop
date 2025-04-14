import { useState } from "react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (id: string) => {
    scrollToElement(id);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {/* Logo */}
            <a href="#" className="flex items-center" onClick={() => handleNavClick("hero")}>
              <span className="text-primary text-2xl font-bold">DropMaster</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            <a 
              href="#how-it-works" 
              className="text-gray-700 hover:text-primary font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("how-it-works");
              }}
            >
              How It Works
            </a>
            <a 
              href="#why-us" 
              className="text-gray-700 hover:text-primary font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("why-us");
              }}
            >
              Why Choose Us
            </a>
            <a 
              href="#products" 
              className="text-gray-700 hover:text-primary font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("products");
              }}
            >
              Products
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-primary font-medium"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("testimonials");
              }}
            >
              Success Stories
            </a>
          </nav>
          
          {/* CTA Button */}
          <div>
            <Button 
              className="hidden md:inline-block"
              onClick={() => handleNavClick("join-now")}
            >
              Become a Reseller
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              type="button" 
              className="text-gray-500 hover:text-primary focus:outline-none" 
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className={`md:hidden pb-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <a 
            href="#how-it-works" 
            className="block py-2 text-gray-700 hover:text-primary font-medium"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("how-it-works");
            }}
          >
            How It Works
          </a>
          <a 
            href="#why-us" 
            className="block py-2 text-gray-700 hover:text-primary font-medium"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("why-us");
            }}
          >
            Why Choose Us
          </a>
          <a 
            href="#products" 
            className="block py-2 text-gray-700 hover:text-primary font-medium"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("products");
            }}
          >
            Products
          </a>
          <a 
            href="#testimonials" 
            className="block py-2 text-gray-700 hover:text-primary font-medium"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("testimonials");
            }}
          >
            Success Stories
          </a>
          <Button 
            className="block w-full mt-2"
            onClick={() => handleNavClick("join-now")}
          >
            Become a Reseller
          </Button>
        </div>
      </div>
    </header>
  );
}
