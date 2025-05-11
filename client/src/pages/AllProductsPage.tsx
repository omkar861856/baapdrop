import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pagination } from "@/components/ui/pagination";

// Types for our product data
interface Product {
  id: number;
  handle: string;
  title: string;
  description: string | null;
  mainImageUrl: string | null;
  basePrice: string;
  compareAtPrice: string | null;
  vendor: string | null;
  productType: string | null;
  tags: string | null;
  createdAt: string;
}

interface ProductsResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  };
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

// Product Card Component
const ProductCard = ({ product }: { product: Product }) => {
  // Extract tags as an array
  const tags = product.tags
    ? product.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 overflow-hidden bg-gray-100 relative">
        {product.mainImageUrl ? (
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-110"
            style={{ backgroundImage: `url(${product.mainImageUrl})` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {product.vendor && (
            <span className="text-xs font-medium text-gray-500">
              By {product.vendor}
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-primary">
            ₹{parseFloat(product.basePrice).toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{parseFloat(product.compareAtPrice).toFixed(2)}
            </span>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" asChild>
          <a href={`/products/${product.handle}`}>View Details</a>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Product Filters Component
const ProductFilters = ({
  search,
  setSearch,
  categorySlug,
  setCategorySlug,
  categories,
  sortOrder,
  setSortOrder,
}: {
  search: string;
  setSearch: (search: string) => void;
  categorySlug: string;
  setCategorySlug: (categorySlug: string) => void;
  categories: Category[];
  sortOrder: string;
  setSortOrder: (sortOrder: string) => void;
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700"
          >
            Search
          </label>
          <Input
            id="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <Select value={categorySlug} onValueChange={setCategorySlug}>
            <SelectTrigger id="category">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700"
          >
            Sort By
          </label>
          <Select value={sortOrder} onValueChange={setSortOrder}>
            <SelectTrigger id="sort">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="title_asc">Name: A to Z</SelectItem>
              <SelectItem value="title_desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategorySlug("");
              setSortOrder("newest");
            }}
            className="w-full"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main Products Page Component
export default function AllProductsPage() {
  const [search, setSearch] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [page, setPage] = useState(1);
  const limit = 20;

  // Parse sort order into sortField and sortDirection
  let sortField = "createdAt";
  let sortDirection = "desc";

  if (sortOrder === "price_asc") {
    sortField = "basePrice";
    sortDirection = "asc";
  } else if (sortOrder === "price_desc") {
    sortField = "basePrice";
    sortDirection = "desc";
  } else if (sortOrder === "title_asc") {
    sortField = "title";
    sortDirection = "asc";
  } else if (sortOrder === "title_desc") {
    sortField = "title";
    sortDirection = "desc";
  } else if (sortOrder === "newest") {
    sortField = "createdAt";
    sortDirection = "desc";
  }

  // Fetch categories
  const { data: categoriesResponse } = useQuery({
    queryKey: ["/api/product-categories"],
    queryFn: async () => {
      const response = await apiRequest("/api/product-categories");
      return response.json();
    },
  });

  // Extract categories data with fallback to empty array
  const categories: Category[] = categoriesResponse?.data || [];

  // Fetch products with filters
  const {
    data: productsResponseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "/api/products",
      {
        page,
        limit,
        search,
        category: categorySlug,
        sortField,
        sortOrder: sortDirection,
      },
    ],
    queryFn: async () => {
      const response = await apiRequest(
        `/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}&category=${encodeURIComponent(
          categorySlug
        )}&sortField=${sortField}&sortOrder=${sortDirection}`
      );
      return response.json();
    },
  });

  // Type-safe access to products response with fallbacks
  const productsResponse: ProductsResponse | undefined = productsResponseData;

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, categorySlug, sortOrder]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
              All Products
            </h1>
            <div>
              <p className="text-gray-600">
                {isLoading
                  ? "Loading products..."
                  : isError
                  ? "Error loading products"
                  : productsResponse && productsResponse.data
                  ? `Showing ${productsResponse.data.length || 0} of ${
                      productsResponse.pagination.totalProducts || 0
                    } products`
                  : "No products to display"}
              </p>
            </div>
          </div>

          <ProductFilters
            search={search}
            setSearch={setSearch}
            categorySlug={categorySlug}
            setCategorySlug={setCategorySlug}
            categories={categories}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Spinner size="lg" />
            </div>
          ) : isError ? (
            <div className="bg-gray-50 border border-gray-200 text-gray-600 p-4 rounded-lg text-center">
              Failed to load products. Please try again later.
            </div>
          ) : !productsResponse || !productsResponse.data ? (
            <div className="bg-yellow-50 text-yellow-700 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">No data available</h3>
              <p>Unable to retrieve product information at this time.</p>
            </div>
          ) : productsResponse.data.length === 0 ? (
            <div className="bg-yellow-50 text-yellow-700 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-2">No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productsResponse.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {productsResponse.pagination &&
                productsResponse.pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination
                      currentPage={page}
                      totalPages={productsResponse.pagination.totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
