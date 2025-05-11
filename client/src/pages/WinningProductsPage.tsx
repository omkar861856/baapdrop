import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronRight,
  TrendingUp,
  Star,
  BarChart2,
  Package,
  Filter,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { updateMetadata } from "@/lib/seo";

// Define types
interface WinningProduct {
  id: number;
  name: string;
  category: string;
  wholesalePrice: number;
  retailPrice: number;
  margin: number;
  profitPotential: number;
  salesVelocity: number; // 1-100
  competition: number; // 1-100 (lower is better)
  image: string;
  tags: string[];
  trending: boolean;
}

// Sample winning products data
const winningProducts: WinningProduct[] = [
  {
    id: 1,
    name: "Portable LED Ring Light with Tripod Stand",
    category: "Photography",
    wholesalePrice: 499,
    retailPrice: 999,
    margin: 50,
    profitPotential: 85,
    salesVelocity: 92,
    competition: 30,
    image:
      "https://images.unsplash.com/photo-1610298324618-73fdb2151bd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Trending", "Low Competition", "High Margin"],
    trending: true,
  },
  {
    id: 2,
    name: "Wireless Bluetooth Earbuds with Charging Case",
    category: "Electronics",
    wholesalePrice: 699,
    retailPrice: 1299,
    margin: 46,
    profitPotential: 78,
    salesVelocity: 89,
    competition: 45,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Trending", "High Demand"],
    trending: true,
  },
  {
    id: 3,
    name: "Premium Korean Skincare Set",
    category: "Beauty",
    wholesalePrice: 799,
    retailPrice: 1699,
    margin: 53,
    profitPotential: 80,
    salesVelocity: 85,
    competition: 25,
    image:
      "https://images.unsplash.com/photo-1612778992781-15be069bdba9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Trending", "Low Competition", "High Margin"],
    trending: true,
  },
  {
    id: 4,
    name: "Multipurpose Fitness Resistance Bands Set",
    category: "Fitness",
    wholesalePrice: 349,
    retailPrice: 799,
    margin: 56,
    profitPotential: 75,
    salesVelocity: 80,
    competition: 40,
    image:
      "https://images.unsplash.com/photo-1598268030800-7d8a2ad1f887?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Trending", "Easy to Ship"],
    trending: true,
  },
  {
    id: 5,
    name: "Portable Smartphone Gimbal Stabilizer",
    category: "Photography",
    wholesalePrice: 1299,
    retailPrice: 2499,
    margin: 48,
    profitPotential: 79,
    salesVelocity: 81,
    competition: 35,
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["High Demand", "Premium"],
    trending: true,
  },
  {
    id: 6,
    name: "Digital Kitchen Scale with LCD Display",
    category: "Kitchen",
    wholesalePrice: 349,
    retailPrice: 699,
    margin: 50,
    profitPotential: 72,
    salesVelocity: 78,
    competition: 38,
    image:
      "https://images.unsplash.com/photo-1620367860387-a8b352a78505?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Essential", "High Volume"],
    trending: true,
  },
  {
    id: 7,
    name: "Adjustable Laptop Stand for Desk",
    category: "Office",
    wholesalePrice: 549,
    retailPrice: 1199,
    margin: 54,
    profitPotential: 76,
    salesVelocity: 83,
    competition: 30,
    image:
      "https://images.unsplash.com/photo-1611174797134-29b800e210de?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Work From Home", "Low Competition"],
    trending: true,
  },
  {
    id: 8,
    name: "Smart WiFi Home Security Camera",
    category: "Electronics",
    wholesalePrice: 999,
    retailPrice: 1999,
    margin: 50,
    profitPotential: 82,
    salesVelocity: 87,
    competition: 42,
    image:
      "https://images.unsplash.com/photo-1580981433055-a19b3a2cf6e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["Smart Home", "High Value"],
    trending: true,
  },
];

// Product card component
const WinningProductCard = ({ product }: { product: WinningProduct }) => {
  const profit = product.retailPrice - product.wholesalePrice;

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 left-0 w-full px-3 py-2 flex justify-between">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm font-medium"
          >
            ₹{product.wholesalePrice}
          </Badge>
          {product.trending && (
            <Badge className="bg-[#E40446]/90 backdrop-blur-sm font-medium">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-2">{product.name}</CardTitle>
        <CardDescription>{product.category}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Profit Potential</span>
              <span className="font-medium">{product.profitPotential}%</span>
            </div>
            <Progress value={product.profitPotential} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Sales Velocity</span>
              <span className="font-medium">{product.salesVelocity}%</span>
            </div>
            <Progress value={product.salesVelocity} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Low Competition</span>
              <span className="font-medium">{100 - product.competition}%</span>
            </div>
            <Progress value={100 - product.competition} className="h-2" />
          </div>

          <div className="pt-1 flex flex-wrap gap-1">
            {product.tags.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link href={`/products?id=${product.id}`}>
          <Button className="w-full">
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

// Main feature component
export default function WinningProductsPage() {
  React.useEffect(() => {
    // Update SEO metadata
    updateMetadata({
      title: "Winning Products - BAAPSTORE",
      description:
        "Discover curated high-margin winning products with proven sales potential and low competition to boost your dropshipping business.",
      keywords:
        "winning products, dropshipping, high margin, trending products, ecommerce",
    });

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />

      {/* Hero section */}
      <section className="py-16 bg-white border-y border-[#E40446]/20 text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Winning Products
              </h1>
              <p className="text-xl mb-8">
                Curated high-margin products with proven sales potential to
                jumpstart your dropshipping business
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-white/10 hover:bg-white/20 text-white"
                >
                  <Filter className="mr-2 h-5 w-5" />
                  Filter Products
                </Button>

                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Media recognition section */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              BAAPSTORE Media Recognition
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dropshipping platform has been featured in leading business
              publications
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="shadow-lg rounded-lg overflow-hidden bg-white p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src="/assets/1_Forbes India - Outperformers List_500-500x501.jpg"
                alt="Forbes India"
                className="h-16 md:h-20 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="shadow-lg rounded-lg overflow-hidden bg-white p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src="/assets/2_Baapstore on Times_500-500x375.jpg"
                alt="Times City"
                className="h-16 md:h-20 object-contain"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="shadow-lg rounded-lg overflow-hidden bg-white p-4 hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src="/assets/3_Yourstory Baapstore_500-500x371.jpg"
                alt="YourStory"
                className="h-16 md:h-20 object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products grid section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Trending Winning Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover high-margin, trending products with proven sales
              potential and low competition. Updated weekly based on market data
              and sales performance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {winningProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <WinningProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">
              Why Choose These Products?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team analyzes thousands of products to find the best
              opportunities for your business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-[#E40446]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <TrendingUp className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">High Profit Margins</h3>
              <p className="text-gray-600">
                All products are selected with 40-60% profit margins to maximize
                your earnings on every sale.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-[#E40446]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Star className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Proven Demand</h3>
              <p className="text-gray-600">
                Products with verified sales history and consistent demand,
                reducing the risk of stocking unpopular items.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="rounded-full bg-[#E40446]/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Package className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Low Competition</h3>
              <p className="text-gray-600">
                Carefully selected products with lower market saturation, giving
                you a competitive edge in your niche.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-y border-[#E40446]/20 text-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Ready to Start Selling Winning Products?
            </h2>
            <p className="text-xl mb-8">
              Join BAAPSTORE today and get access to our complete catalog of
              high-margin products, marketing materials, and reseller support.
            </p>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => (window.location.href = "/#join-now")}
            >
              Become a Reseller
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
