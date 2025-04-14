import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingBag,
  Truck,
  Package,
  Search,
  Star,
  Filter,
  Tag,
  ArrowUpRight,
  ChevronLeft,
  Heart,
  TrendingUp,
  Percent,
  ArrowRight,
  Phone,
  Info,
  Clock
} from "lucide-react";
import { scrollToElement } from "@/lib/utils";

// Define interfaces for product data
interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  wholesalePrice: number;
  margin: number;
  rating: number;
  reviews: number;
  sales: number;
  images: string[];
  tags: string[];
  description: string;
  features: string[];
  shipping: {
    domestic: number;
    international: number;
  };
  trending: boolean;
  inStock: boolean;
}

// Product categories
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

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: "Premium Smart Watch with Heart Rate Monitor",
    category: "Electronics & Gadgets",
    subcategory: "Wearable Tech",
    price: 1599,
    wholesalePrice: 899,
    margin: 44,
    rating: 4.7,
    reviews: 542,
    sales: 2145,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Smart Watch", "Wearable", "Health Tracker", "Top Selling"],
    description: "Premium smart watch with heart rate monitor, sleep tracking, and notifications. Water resistant up to 50m with 7+ days of battery life.",
    features: [
      "Heart rate & SpO2 monitoring",
      "Multiple sport modes",
      "Call & message notifications",
      "Sleep tracking",
      "5 ATM water resistance",
      "7+ days battery life"
    ],
    shipping: {
      domestic: 0,
      international: 350
    },
    trending: true,
    inStock: true
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds with Charging Case",
    category: "Electronics & Gadgets",
    subcategory: "Audio Devices",
    price: 1299,
    wholesalePrice: 699,
    margin: 46,
    rating: 4.5,
    reviews: 758,
    sales: 3672,
    images: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1598331668826-20cecc596b86?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Earbuds", "Wireless", "Bluetooth", "Best Seller"],
    description: "Premium wireless Bluetooth earbuds with charging case, offering crystal clear sound, touch controls, and IPX7 waterproof rating.",
    features: [
      "Bluetooth 5.0 technology",
      "Touch controls",
      "IPX7 waterproof rating",
      "25 hours total playtime",
      "Built-in microphone",
      "Ergonomic design"
    ],
    shipping: {
      domestic: 0,
      international: 250
    },
    trending: true,
    inStock: true
  },
  {
    id: 3,
    name: "Minimalist Stainless Steel Watch",
    category: "Fashion & Lifestyle",
    subcategory: "Watches",
    price: 1899,
    wholesalePrice: 849,
    margin: 55,
    rating: 4.8,
    reviews: 426,
    sales: 1876,
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Watch", "Stainless Steel", "Minimalist", "Fashion"],
    description: "Elegant minimalist stainless steel watch with Japanese movement. Features a scratch-resistant sapphire crystal and genuine leather strap.",
    features: [
      "Japanese quartz movement",
      "316L stainless steel case",
      "Sapphire crystal glass",
      "Genuine leather strap",
      "3 ATM water resistance",
      "1 year warranty"
    ],
    shipping: {
      domestic: 0,
      international: 300
    },
    trending: true,
    inStock: true
  },
  {
    id: 4,
    name: "Portable LED Ring Light with Tripod Stand",
    category: "Electronics & Gadgets",
    subcategory: "Photography",
    price: 999,
    wholesalePrice: 499,
    margin: 50,
    rating: 4.6,
    reviews: 352,
    sales: 1543,
    images: [
      "https://images.unsplash.com/photo-1610298324618-73fdb2151bd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Ring Light", "Photography", "Streaming", "Trending"],
    description: "Professional LED ring light with adjustable tripod stand, ideal for photography, vlogging, makeup application, and live streaming.",
    features: [
      "10\" LED ring light",
      "3 color modes (warm, cool, daylight)",
      "10 brightness levels",
      "Adjustable tripod stand (50-160cm)",
      "USB powered",
      "Phone holder included"
    ],
    shipping: {
      domestic: 0,
      international: 400
    },
    trending: true,
    inStock: true
  },
  {
    id: 5,
    name: "Multi-Purpose Ceramic Kitchen Knife Set",
    category: "Home & Living",
    subcategory: "Kitchen",
    price: 1499,
    wholesalePrice: 699,
    margin: 53,
    rating: 4.5,
    reviews: 287,
    sales: 1298,
    images: [
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1566454825481-9c645f0a692c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Kitchen", "Knife Set", "Ceramic", "Cooking"],
    description: "Premium 5-piece ceramic knife set that stays sharp longer than steel. Includes chef's knife, santoku knife, utility knife, paring knife, and peeler.",
    features: [
      "Ultra-sharp ceramic blades",
      "Lightweight ergonomic handles",
      "Rust-proof and stain-resistant",
      "Preserves food flavor and nutrients",
      "Protective sheaths included",
      "Elegant gift box packaging"
    ],
    shipping: {
      domestic: 0,
      international: 500
    },
    trending: false,
    inStock: true
  },
  {
    id: 6,
    name: "Premium Korean Skincare Set",
    category: "Beauty & Personal Care",
    subcategory: "Skincare",
    price: 1699,
    wholesalePrice: 799,
    margin: 53,
    rating: 4.9,
    reviews: 642,
    sales: 2876,
    images: [
      "https://images.unsplash.com/photo-1612778992781-15be069bdba9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1570194065650-d68fcec1b4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Skincare", "Korean Beauty", "Beauty", "Premium"],
    description: "Complete Korean 10-step skincare routine set including cleanser, toner, essence, serum, moisturizer, and more. For all skin types.",
    features: [
      "10-step Korean skincare routine",
      "Natural ingredients",
      "Paraben and sulfate free",
      "Suitable for all skin types",
      "Cruelty-free production",
      "Travel-sized options included"
    ],
    shipping: {
      domestic: 0,
      international: 350
    },
    trending: true,
    inStock: true
  },
  {
    id: 7,
    name: "Foldable Laptop Stand with Cooling Fan",
    category: "Electronics & Gadgets",
    subcategory: "Computer Accessories",
    price: 899,
    wholesalePrice: 449,
    margin: 50,
    rating: 4.4,
    reviews: 305,
    sales: 1532,
    images: [
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Laptop Stand", "Work From Home", "Cooling", "Ergonomic"],
    description: "Adjustable and foldable laptop stand with built-in cooling fans. Ergonomic design improves posture and prevents overheating.",
    features: [
      "Adjustable height and angle",
      "Built-in dual cooling fans",
      "USB powered",
      "Foldable and portable design",
      "Compatible with 11-17\" laptops",
      "Non-slip silicone pads"
    ],
    shipping: {
      domestic: 0,
      international: 300
    },
    trending: false,
    inStock: true
  },
  {
    id: 8,
    name: "Bamboo Bathroom Organizer Set",
    category: "Home & Living",
    subcategory: "Bathroom",
    price: 1299,
    wholesalePrice: 599,
    margin: 54,
    rating: 4.6,
    reviews: 238,
    sales: 1087,
    images: [
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Bathroom", "Organization", "Bamboo", "Eco-friendly"],
    description: "5-piece eco-friendly bamboo bathroom organizer set including toothbrush holder, soap dish, dispenser, and storage containers.",
    features: [
      "100% natural bamboo material",
      "Water-resistant finish",
      "Minimalist design",
      "Easy to clean",
      "Eco-friendly production",
      "Complete 5-piece set"
    ],
    shipping: {
      domestic: 0,
      international: 450
    },
    trending: false,
    inStock: true
  },
  {
    id: 9,
    name: "Handmade Leather Wallet with RFID Blocking",
    category: "Fashion & Lifestyle",
    subcategory: "Accessories",
    price: 999,
    wholesalePrice: 499,
    margin: 50,
    rating: 4.7,
    reviews: 412,
    sales: 1876,
    images: [
      "https://images.unsplash.com/photo-1559694097-8c1cec9fa86c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584472376859-7f6d81288339?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Wallet", "Leather", "RFID", "Handmade"],
    description: "Handcrafted genuine leather wallet with RFID blocking technology. Slim design with multiple card slots and compartments.",
    features: [
      "Genuine full-grain leather",
      "RFID blocking technology",
      "8 card slots + ID window",
      "2 cash compartments",
      "Coin pocket with snap closure",
      "Gift box included"
    ],
    shipping: {
      domestic: 0,
      international: 250
    },
    trending: false,
    inStock: true
  },
  {
    id: 10,
    name: "Portable Bluetooth Speaker with LED Lights",
    category: "Electronics & Gadgets",
    subcategory: "Audio Devices",
    price: 1199,
    wholesalePrice: 599,
    margin: 50,
    rating: 4.5,
    reviews: 328,
    sales: 1562,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1612795146865-919253de020c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Speaker", "Bluetooth", "LED", "Portable"],
    description: "Wireless Bluetooth speaker with 360° LED light display. Features 12 hours playtime, IPX7 waterproof rating, and rich bass sound.",
    features: [
      "Bluetooth 5.0 technology",
      "12 hours playtime",
      "IPX7 waterproof rating",
      "360° LED light show",
      "Built-in microphone",
      "TWS stereo pairing"
    ],
    shipping: {
      domestic: 0,
      international: 350
    },
    trending: true,
    inStock: true
  },
  {
    id: 11,
    name: "Natural Crystal Salt Lamp with Wooden Base",
    category: "Home & Living",
    subcategory: "Home Decor",
    price: 899,
    wholesalePrice: 399,
    margin: 56,
    rating: 4.6,
    reviews: 275,
    sales: 1325,
    images: [
      "https://images.unsplash.com/photo-1616046328096-e81607752466?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1602437038681-a1be525ee59c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Salt Lamp", "Home Decor", "Natural", "Lighting"],
    description: "Authentic Himalayan salt lamp with wooden base. Natural air purifier with warm amber glow for a calming atmosphere.",
    features: [
      "100% authentic Himalayan salt",
      "Handcrafted wooden base",
      "Dimmer control switch",
      "Natural air ionizer",
      "1.5m UL-certified cord",
      "2 replacement bulbs included"
    ],
    shipping: {
      domestic: 0,
      international: 500
    },
    trending: false,
    inStock: true
  },
  {
    id: 12,
    name: "Multipurpose Fitness Resistance Bands Set",
    category: "Fashion & Lifestyle",
    subcategory: "Fitness",
    price: 799,
    wholesalePrice: 349,
    margin: 56,
    rating: 4.7,
    reviews: 394,
    sales: 1842,
    images: [
      "https://images.unsplash.com/photo-1598268030800-7d8a2ad1f887?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1620188526357-ff08e03da266?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
    ],
    tags: ["Fitness", "Workout", "Resistance Bands", "Exercise"],
    description: "Complete set of 5 resistance bands with different strength levels. Ideal for home workouts, stretching, strength training, and physical therapy.",
    features: [
      "5 resistance levels (10-50 lbs)",
      "Natural latex material",
      "Handles, ankle straps & door anchor",
      "Travel carrying bag included",
      "Exercise guide with 30+ workouts",
      "Online video tutorials access"
    ],
    shipping: {
      domestic: 0,
      international: 300
    },
    trending: true,
    inStock: true
  }
];

// Product item component
const ProductItem = ({ product }: { product: Product }) => {
  return (
    <motion.div 
      className="product-card h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-60 w-full object-cover"
          />
          {product.trending && (
            <Badge className="absolute top-3 right-3 bg-primary text-white">
              <TrendingUp className="h-3 w-3 mr-1" /> Trending
            </Badge>
          )}
          <div className="absolute top-3 left-3 flex items-center bg-white/90 text-primary rounded-full py-0.5 px-2 text-xs font-medium">
            <Percent className="h-3 w-3 mr-1" />
            {product.margin}% margin
          </div>
          <Button variant="ghost" size="icon" className="absolute bottom-3 right-3 bg-white/80 hover:bg-white rounded-full shadow-sm">
            <Heart className="h-4 w-4 text-pink-500" />
          </Button>
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base font-medium line-clamp-2">{product.name}</CardTitle>
          </div>
          <CardDescription className="text-xs">
            {product.category} • {product.subcategory}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-3">
              {Array(5).fill(0).map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">{product.reviews} reviews</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex justify-between items-center mt-auto">
            <div className="text-gray-600 font-semibold">
              <span className="text-sm line-through text-gray-400">₹{product.price}</span> 
              <span className="text-primary ml-1">₹{product.wholesalePrice}</span>
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <ShoppingBag className="h-3 w-3 mr-1" />
              {product.sales}+ sold
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3">
          <Button className="w-full" size="sm" onClick={() => scrollToElement("join-now")}>
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default function ProductsPage() {
  // Extract category from URL query parameters if present
  const getQueryParam = (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };
  
  const categoryParam = getQueryParam('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("trending");
  
  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch(sortBy) {
      case "trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.sales - a.sales;
      case "bestselling":
        return b.sales - a.sales;
      case "rating":
        return b.rating - a.rating;
      case "margin":
        return b.margin - a.margin;
      case "price_low":
        return a.wholesalePrice - b.wholesalePrice;
      case "price_high":
        return b.wholesalePrice - a.wholesalePrice;
      default:
        return 0;
    }
  });
  
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary to-purple-700 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/">
              <Button variant="ghost" className="text-white mb-6 hover:bg-white/10">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Button>
            </Link>
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Explore Our Product Catalog
              </h1>
              <p className="text-lg text-white/90 mb-8">
                Browse thousands of high-quality, trending products with excellent profit margins for your dropshipping business.
              </p>
              <div className="max-w-2xl mx-auto relative">
                <div className="relative flex items-center">
                  <Search className="absolute left-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products, categories, or keywords..."
                    className="w-full h-12 pl-10 pr-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/70"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Category Filters */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Product Categories</h2>
              <div className="flex items-center">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  className="mx-1"
                  onClick={() => setSelectedCategory(null)}
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "outline"}
                    size="sm"
                    className="mx-1 hidden md:inline-flex"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Mobile Category Selector */}
            <div className="md:hidden mb-4">
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-700 font-medium mr-3">Sort By:</span>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant={sortBy === "trending" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("trending")}
                  >
                    Trending
                  </Button>
                  <Button 
                    variant={sortBy === "bestselling" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("bestselling")}
                  >
                    Best Selling
                  </Button>
                  <Button 
                    variant={sortBy === "rating" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("rating")}
                  >
                    Top Rated
                  </Button>
                  <Button 
                    variant={sortBy === "margin" ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setSortBy("margin")}
                  >
                    Highest Margin
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant={sortBy === "price_low" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setSortBy("price_low")}
                >
                  Price: Low to High
                </Button>
                <Button 
                  variant={sortBy === "price_high" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setSortBy("price_high")}
                >
                  Price: High to Low
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory ? 
                  `${selectedCategory} Products` : 
                  searchTerm ? 
                    `Search Results for "${searchTerm}"` : 
                    "All Products"
                }
              </h2>
              <div className="text-gray-500 text-sm">
                Showing {sortedProducts.length} of {products.length} products
              </div>
            </div>
            
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                }}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
                <p className="text-gray-600">
                  Everything you need to know about our products and dropshipping
                </p>
              </div>
              
              <Tabs defaultValue="products">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="reselling">Reselling</TabsTrigger>
                </TabsList>
                
                <TabsContent value="products" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="h-5 w-5 mr-2 text-primary" />
                        Are the product images available for download?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Yes, all product listings include high-quality product images that you can download and use on your online store. We also provide lifestyle images for many products to help with your marketing efforts.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="h-5 w-5 mr-2 text-primary" />
                        Can I get product samples before listing them?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Absolutely! Registered resellers can order product samples at wholesale prices. This allows you to test the quality firsthand before adding them to your store. Sample orders are processed with priority shipping.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Info className="h-5 w-5 mr-2 text-primary" />
                        How often are new products added to the catalog?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We add new trending products weekly. Every Monday, you'll receive an email highlighting the newest additions to our catalog with early-bird reseller discounts for the first 48 hours.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="shipping" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-primary" />
                        How does shipping work for my customers?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We handle all shipping directly to your customers with white-labeled packaging. Domestic orders are delivered within 3-5 business days, while international shipping takes 7-14 business days. Tracking information is automatically provided.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-primary" />
                        Is express shipping available?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Yes, we offer express shipping options that can be selected during the order process. Express domestic shipping delivers within 1-2 business days, and express international shipping delivers within 3-5 business days at additional costs.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Truck className="h-5 w-5 mr-2 text-primary" />
                        Which countries do you ship to?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        We currently ship to over 150 countries worldwide. Some product categories may have shipping restrictions to certain regions due to local regulations. Each product listing indicates if there are any shipping limitations.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reselling" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                        How do I get started with reselling?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        Getting started is simple: Create a free account, browse our product catalog, select products you want to sell, set your pricing, and list them on your chosen sales channels. When your customer places an order, you forward it to us, and we handle the rest!
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-primary" />
                        How long does it take to set up my reseller account?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        The registration process takes less than 10 minutes. Once you've completed the signup, you'll have immediate access to our product catalog and can start selling right away. Our onboarding team will reach out within 24 hours to help with any questions.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Phone className="h-5 w-5 mr-2 text-primary" />
                        What kind of support do resellers receive?
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">
                        All resellers receive dedicated support through our Reseller Success team. We provide marketing materials, product descriptions, high-quality images, sales data, and trend reports. Premium resellers get additional benefits like priority shipping and higher discounts.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/90 to-purple-700/90 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Dropshipping Business?</h2>
              <p className="text-lg text-white/90 mb-8">
                Join thousands of successful resellers and start selling high-quality, in-demand products with no inventory costs.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
                <Button 
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto animated-btn shadow-lg"
                  onClick={() => scrollToElement("join-now")}
                >
                  Become a Reseller
                  <ArrowUpRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  onClick={() => scrollToElement("join-now")}
                >
                  View Pricing Plans
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}