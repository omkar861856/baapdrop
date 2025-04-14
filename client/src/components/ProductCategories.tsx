import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToElement } from "@/lib/utils";
import { ArrowRight, ShoppingBag, Tag, TrendingUp, Percent } from "lucide-react";

const categories = [
  {
    name: "Fashion & Lifestyle",
    description: "Clothing, Accessories, Watches, Jewelry",
    productCount: "3,500+ Products",
    margin: "40-60% Margin",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    color: "from-blue-500 to-purple-600"
  },
  {
    name: "Home & Living",
    description: "Decor, Kitchen, Furniture, Organizers",
    productCount: "2,800+ Products",
    margin: "35-55% Margin",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    color: "from-green-500 to-teal-600"
  },
  {
    name: "Electronics & Gadgets",
    description: "Mobile Accessories, Speakers, Smart Home",
    productCount: "2,200+ Products",
    margin: "30-50% Margin",
    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    color: "from-orange-500 to-red-600"
  },
  {
    name: "Beauty & Personal Care",
    description: "Skincare, Makeup, Hair Care, Grooming",
    productCount: "1,500+ Products",
    margin: "45-65% Margin",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    color: "from-pink-500 to-purple-600"
  }
];

const trending = [
  "Phone Accessories", "Smart Watches", "Women's Fashion", "Home Decor",
  "Kitchen Gadgets", "LED Lights", "Fitness Products", "Baby Products"
];

export default function ProductCategories() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-3">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              10,000+ Products Available
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Top Product Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from thousands of high-quality, trending products with excellent profit margins.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div 
              key={index}
              className="product-card rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={category.image}
                  alt={`${category.name} products including ${category.description}`}
                  className="w-full h-full object-cover transition duration-700"
                  width="400"
                  height="300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70`}></div>
                <div className="absolute top-3 right-3 bg-white rounded-full py-1 px-3 text-xs font-bold text-primary shadow-md">
                  HOT SELLING
                </div>
              </div>
              
              <div className="p-5 bg-white">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm font-medium text-gray-700">
                    <ShoppingBag className="h-4 w-4 mr-1 text-primary" />
                    <span>{category.productCount}</span>
                  </div>
                  <div className="flex items-center text-sm font-medium text-green-600">
                    <Percent className="h-4 w-4 mr-1" />
                    <span>{category.margin}</span>
                  </div>
                </div>
                
                <Button
                  variant="ghost" 
                  className="w-full mt-4 text-primary hover:bg-primary/10 border border-gray-200"
                  onClick={() => scrollToElement("join-now")}
                >
                  Browse Products
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Trending Categories */}
        <motion.div 
          className="mt-20 bg-white rounded-xl shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <div className="flex items-center mb-2">
                  <TrendingUp className="text-primary h-5 w-5 mr-2" />
                  <h3 className="text-2xl font-bold">Trending Categories</h3>
                </div>
                <p className="text-gray-600">Most popular product categories with high demand in the market</p>
              </div>
              <Button
                className="mt-4 md:mt-0 primary-gradient animated-btn shadow-md"
                onClick={() => scrollToElement("join-now")}
              >
                Become a Reseller
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {trending.map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Tag className="h-4 w-4 mr-2 text-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* View All CTA */}
        <motion.div 
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            More than 10,000 products available across 20+ categories. Join now to view our complete catalog.
          </p>
          <Button
            size="lg"
            className="primary-gradient animated-btn font-medium px-8 py-6 text-lg shadow-lg"
            onClick={() => scrollToElement("join-now")}
          >
            View Complete Catalog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
