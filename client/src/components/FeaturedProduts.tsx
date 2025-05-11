import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

interface Product {
  id: number;
  title: string;
  handle: string;
  description: string | null;
  mainImageUrl: string | null;
  basePrice: string;
  compareAtPrice: string | null;
  sku: string | null;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/featured-products");

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <p className="text-center text-red-500">
          Failed to load featured products
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured Products
        </h2>
        <p className="text-center text-muted-foreground">
          No featured products available at the moment
        </p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">
          Featured Products
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          High margin, trending products ready to sell
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {products.slice(0, 5).map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden h-full flex flex-col group hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-square relative overflow-hidden bg-slate-100">
                {product.mainImageUrl ? (
                  <img
                    src={product.mainImageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
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
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/products/${product.handle}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/featured-products">View All Featured Products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
