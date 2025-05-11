import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToElement } from "@/lib/utils";
import {
  ArrowRight,
  ShoppingBag,
  Tag,
  TrendingUp,
  Percent,
  Loader2,
} from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
}

// Define category images with fallbacks
const categoryImages: Record<string, string> = {
  "Mobile Case Cover":
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  "Home Decor":
    "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  "Apparels & Fashion":
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
  "Fashion Accessories":
    "https://images.unsplash.com/photo-1588508065123-287b28e013da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
};

// Define gradient colors for categories
const categoryColors: Record<string, string> = {
  "Mobile Case Cover": "from-blue-500 to-indigo-600",
  "Home Decor": "from-green-500 to-teal-600",
  "Apparels & Fashion": "from-blue-500 to-purple-600",
  "Fashion Accessories": "from-amber-500 to-orange-600",
  default: "from-blue-600 to-indigo-700",
};

// Trending categories for display
const trending = [
  "Sarees & Kurtis",
  "Mobile Accessories",
  "Kitchen Accessories",
  "Footwear",
  "Imitation Jewellery",
  "Health & Fitness",
  "Home Furnishing",
  "Plus Size Clothing",
];

export default function ProductCategories() {
  const [_, setLocation] = useLocation();
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        // Using dynamic categories endpoint that only returns categories with products
        const response = await fetch("/api/dynamic-categories");

        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  // Default category stats (for presentation)
  const getCategoryStats = (name: string) => {
    const stats = {
      "Mobile Case Cover": {
        productCount: "1,200+ Products",
        margin: "45-65% Margin",
      },
      "Home Decor": {
        productCount: "1,500+ Products",
        margin: "35-55% Margin",
      },
      "Apparels & Fashion": {
        productCount: "2,000+ Products",
        margin: "40-60% Margin",
      },
      "Fashion Accessories": {
        productCount: "1,800+ Products",
        margin: "50-70% Margin",
      },
    };

    return (
      stats[name as keyof typeof stats] || {
        productCount: "1,000+ Products",
        margin: "40-60% Margin",
      }
    );
  };

  return (
    <section
      id="product-categories"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-3">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              7,000+ Product Varieties
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Explore Our Product Catalogue
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from thousands of high-quality products at Baap Price - 50%
            below wholesale prices even for single items.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            <div className="col-span-4 flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="col-span-4 text-center text-red-500 py-10">
              Failed to load categories. Please try again later.
            </div>
          ) : categories.length === 0 ? (
            <div className="col-span-4 text-center text-muted-foreground py-10">
              No categories available at the moment
            </div>
          ) : (
            <>
              {categories.map((category, index) => {
                const categoryImage =
                  categoryImages[
                    category.name as keyof typeof categoryImages
                  ] ||
                  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
                const categoryColor =
                  categoryColors[
                    category.name as keyof typeof categoryColors
                  ] || categoryColors.default;
                const stats = getCategoryStats(category.name);

                return (
                  <motion.div
                    key={category.id}
                    className="product-card rounded-xl overflow-hidden shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={category.imageUrl || categoryImage}
                        alt={`${category.name} products${
                          category.description
                            ? ` including ${category.description}`
                            : ""
                        }`}
                        className="w-full h-full object-cover transition duration-700"
                        width="400"
                        height="300"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${categoryColor} opacity-70`}
                      ></div>
                      <div className="absolute top-3 right-3 bg-white rounded-full py-1 px-3 text-xs font-bold text-primary shadow-md">
                        HOT SELLING
                      </div>
                    </div>

                    <div className="p-5 bg-white">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {category.description ||
                          "High quality products at wholesale prices"}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-sm font-medium text-gray-700">
                          <ShoppingBag className="h-4 w-4 mr-1 text-primary" />
                          <span>{stats.productCount}</span>
                        </div>
                        <div className="flex items-center text-sm font-medium text-green-600">
                          <Percent className="h-4 w-4 mr-1" />
                          <span>{stats.margin}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 border border-[#E40446] text-[#E40446] bg-white hover:bg-[#E40446] hover:text-white transition-colors"
                        onClick={() => setLocation(`/category/${category.id}`)}
                      >
                        Browse Products
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </>
          )}
        </div>

        {/* Trending Categories */}
        <motion.div
          className="mt-20 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="absolute left-0 top-0 w-full h-1 bg-[#E40446]"></div>
            <div className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <div className="inline-block mb-2 bg-primary/10 px-3 py-1 rounded-full">
                    <div className="flex items-center">
                      <TrendingUp className="text-primary h-4 w-4 mr-2" />
                      <span className="text-primary font-medium text-sm">
                        High Demand
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold">Trending Categories</h3>
                  <p className="text-gray-600 mt-1">
                    Most popular product categories with high demand in the
                    market
                  </p>
                </div>
                <Button
                  className="mt-4 md:mt-0 border border-[#E40446] text-[#E40446] bg-white hover:bg-[#E40446] hover:text-white transition-colors shadow-md"
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
            More than 7,000 product varieties across 15+ categories worth ₹100
            crores. Join now to access our complete catalog.
          </p>
          <Button
            size="lg"
            className="border border-[#E40446] text-[#E40446] bg-white hover:bg-[#E40446] hover:text-white transition-colors font-medium px-8 py-6 text-lg shadow-lg"
            onClick={() => setLocation("/products")}
          >
            View Complete Catalog
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
