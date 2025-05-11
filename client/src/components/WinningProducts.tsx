import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ChevronRight,
  TrendingUp,
  Star,
  BarChart2,
  Package,
  Loader2,
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
import { formatPrice } from "@/lib/utils";

// Define types
interface Product {
  id: number;
  title: string;
  handle: string;
  description: string | null;
  mainImageUrl: string | null;
  basePrice: string;
  compareAtPrice: string | null;
  sku: string | null;
  productType: string | null;
  categoryName?: string;
  tags?: string | null;
  profitMargin?: number;
  salesPotential?: number;
  lowCompetition?: number;
}

// Product card component
const WinningProductCard = ({ product }: { product: Product }) => {
  // Calculate margin percentage if compareAtPrice exists or use profit margin
  const basePrice = parseFloat(product.basePrice);
  const compareAtPrice = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const calculatedMargin = compareAtPrice
    ? Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100)
    : 0;
  // Use product.profitMargin if available, otherwise use calculated margin
  const marginPercentage = product.profitMargin || calculatedMargin;

  // Create tags array from comma-separated string
  const tagsArray = product.tags
    ? product.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    : [];

  // Add default tags
  if (marginPercentage >= 40) tagsArray.push("High Margin");
  if (!tagsArray.includes("Trending")) tagsArray.push("Trending");

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden" style={{ height: "180px" }}>
        {product.mainImageUrl ? (
          <img
            src={product.mainImageUrl}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-200">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
        <div className="absolute top-0 left-0 w-full px-3 py-2 flex justify-between">
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm font-medium"
          >
            {formatPrice(product.basePrice)}
          </Badge>
          <Badge className="bg-[#E40446]/90 backdrop-blur-sm font-medium">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-2">
          {product.title}
        </CardTitle>
        <CardDescription>
          {product.categoryName || product.productType || "General"}
        </CardDescription>
        {product.sku && (
          <div className="text-xs text-muted-foreground mt-1">
            SKU: {product.sku}
          </div>
        )}
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Profit Margin</span>
              <span className="font-medium">{marginPercentage}%</span>
            </div>
            <Progress value={marginPercentage} max={100} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Sales Potential</span>
              <span className="font-medium">
                {product.salesPotential || 85}%
              </span>
            </div>
            <Progress value={product.salesPotential || 85} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Low Competition</span>
              <span className="font-medium">
                {product.lowCompetition || 75}%
              </span>
            </div>
            <Progress value={product.lowCompetition || 75} className="h-2" />
          </div>

          <div className="pt-1 flex flex-wrap gap-1">
            {tagsArray.map((tag, i) => (
              <Badge key={i} variant="outline" className="text-xs font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button className="w-full" asChild>
          <Link href={`/products/${product.handle}`}>
            View Details
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function WinningProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWinningProducts() {
      try {
        setIsLoading(true);
        // Fetch products marked as "winning" in the database
        const response = await fetch("/api/winning-products");

        if (!response.ok) {
          throw new Error(
            `Error fetching winning products: ${response.status}`
          );
        }

        const data = await response.json();
        console.log("Winning products data:", data);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching winning products:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchWinningProducts();
  }, []);

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

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 py-10">
            Failed to load winning products
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">
            No winning products available at the moment
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {products.slice(0, 5).map((product) => (
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
        )}

        <div className="mt-12 text-center">
          <div className="inline-flex items-center justify-center p-4 mb-6 bg-[#E40446]/10 rounded-full">
            <BarChart2 className="h-6 w-6 text-[#E40446]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">
            Data-Driven Product Selection
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our winning products are selected based on comprehensive market
            analysis, competitor research, and real sales data to maximize your
            profit potential.
          </p>

          <Link href="/winning-products">
            <Button size="lg" className="primary-gradient animated-btn">
              Browse All Winning Products
              <ChevronRight className="h-5 w-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
