import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Loader2, ChevronLeft, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";

// Define product type
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
  categoryId: number;
  featured: boolean;
  winning: boolean;
}

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  const [_, setLocation] = useLocation();

  // Calculate discount percentage if compareAtPrice exists
  const basePrice = parseFloat(product.basePrice);
  const compareAtPrice = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const discountPercentage = compareAtPrice
    ? Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100)
    : 0;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-all">
      <div className="aspect-square relative overflow-hidden">
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 left-2 z-10 bg-[#E40446] hover:bg-[#E40446]/90">
            {discountPercentage}% OFF
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-2 right-2 z-10">
          Featured
        </Badge>
        {product.mainImageUrl ? (
          <img
            src={product.mainImageUrl}
            alt={product.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-slate-200">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <CardContent className="flex-grow py-4">
        <CardTitle className="line-clamp-2 text-base h-12">
          {product.title}
        </CardTitle>
        {product.sku && (
          <div className="mt-1 text-xs text-muted-foreground">
            SKU: {product.sku}
          </div>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-lg text-primary">
            {formatPrice(product.basePrice)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setLocation(`/products/${product.handle}`)}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function AllFeaturedProducts() {
  const [_, setLocation] = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/featured-products?limit=100");

        if (!response.ok) {
          throw new Error(
            `Error fetching featured products: ${response.status}`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Apply search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return (
          product.title.toLowerCase().includes(query) ||
          (product.description &&
            product.description.toLowerCase().includes(query)) ||
          (product.sku && product.sku.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "price_asc":
          return parseFloat(a.basePrice) - parseFloat(b.basePrice);
        case "price_desc":
          return parseFloat(b.basePrice) - parseFloat(a.basePrice);
        case "title_asc":
          return a.title.localeCompare(b.title);
        case "title_desc":
          return b.title.localeCompare(a.title);
        case "newest":
        default:
          // Assuming newer products have higher IDs
          return b.id - a.id;
      }
    });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/products")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          <div className="bg-gray-50 border border-gray-200 text-gray-600 p-8 rounded-lg text-center max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Error Loading Products</h2>
            <p className="mb-6">
              {error ||
                "There was an error loading the featured products. Please try again later."}
            </p>
            <Button onClick={() => setLocation("/products")}>
              Browse All Products
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center mb-4 text-sm text-gray-600">
            <button
              onClick={() => setLocation("/")}
              className="hover:text-primary"
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => setLocation("/products")}
              className="hover:text-primary"
            >
              Products
            </button>
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">Featured Products</span>
          </div>

          {/* Page Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h1>
            <p className="text-gray-600">
              Our hand-picked collection of high-quality, trending products with
              excellent profit margins. These products have been selected for
              their exceptional performance and customer demand.
            </p>
          </div>

          {/* Filters Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Search Featured Products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, SKU, etc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">
                  Sort By
                </label>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort products" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price_asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price_desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="title_asc">Name: A to Z</SelectItem>
                    <SelectItem value="title_desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setLocation("/winning-products")}
                >
                  View Winning Products
                </Button>
              </div>
            </div>
          </div>

          {/* Products Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} featured
              products
            </p>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-yellow-50 text-yellow-800 p-8 rounded-lg text-center">
              <h3 className="text-lg font-bold mb-2">
                No featured products found
              </h3>
              <p>Try adjusting your filters or search terms.</p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Back to Home CTA */}
          <div className="mt-16 text-center">
            <Button
              variant="outline"
              className="mr-4"
              onClick={() => setLocation("/products")}
            >
              Browse All Products
            </Button>
            <Button onClick={() => setLocation("/")}>Back to Home</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
