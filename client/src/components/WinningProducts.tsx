import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronRight,
  TrendingUp,
  Star,
  BarChart2,
  Package,
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
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
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
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
    tags: ["Trending", "Low Competition", "High Margin"],
    trending: false,
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
      "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=",
    tags: ["Trending", "Easy to Ship"],
    trending: true,
  },
];

// Product card component
const WinningProductCard = ({ product }: { product: WinningProduct }) => {
  const profit = product.retailPrice - product.wholesalePrice;
  const isLinkDisabled = true;

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
            <Badge className="bg-primary/90 backdrop-blur-sm font-medium">
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
        <Link href={isLinkDisabled ? "#" : `/products?id=${product.id}`}>
          <Button disabled={isLinkDisabled} className="w-full">
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default function WinningProducts() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Winning Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover high-margin, trending products with proven sales potential
            and low competition. Updated weekly based on market data and sales
            performance.
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

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-4 mb-6 bg-primary/10 rounded-full">
            <BarChart2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Data-Driven Product Selection
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our winning products are selected based on comprehensive market
            analysis, competitor research, and real sales data to maximize your
            profit potential.
          </p>

          <Link href="/products">
            <Button size="lg" className="animated-btn">
              Browse All Winning Products
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
