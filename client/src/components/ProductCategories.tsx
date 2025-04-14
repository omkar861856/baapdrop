import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToElement } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Fashion",
    description: "Clothing, Accessories, Footwear",
    productCount: "2,500+ Products",
    image: "https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Home & Living",
    description: "Decor, Kitchen, Furniture",
    productCount: "3,200+ Products",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Electronics",
    description: "Gadgets, Accessories, Smart Home",
    productCount: "1,800+ Products",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
  }
];

export default function ProductCategories() {
  return (
    <section id="products" className="bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose from thousands of high-quality products across popular categories.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              className="relative rounded-xl overflow-hidden shadow-lg group scale-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={category.image}
                alt={`${category.name} products including ${category.description}`}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                width="400"
                height="300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-75"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-4">{category.description}</p>
                <span className="text-white font-medium flex items-center">
                  <span>{category.productCount}</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="shadow-md"
            onClick={() => scrollToElement("join-now")}
          >
            Explore All Categories
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
