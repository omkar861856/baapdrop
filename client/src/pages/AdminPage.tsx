import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define Product type
interface Product {
  id: number;
  handle: string;
  title: string;
  description: string | null;
  vendor: string | null;
  productType: string | null;
  sku: string | null;
  baseCost: string;
  basePrice: string;
  featured: boolean;
  winning: boolean;
  profitMargin: number;
  salesPotential: number;
  lowCompetition: number;
  mainImageUrl: string | null;
  createdAt: string;
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const { toast } = useToast();

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [featuredFilter, setFeaturedFilter] = useState<boolean | null>(null);
  const [winningFilter, setWinningFilter] = useState<boolean | null>(null);

  // Winning product metrics state
  const [showWinningMetricsDialog, setShowWinningMetricsDialog] =
    useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedProductTitle, setSelectedProductTitle] = useState("");
  const [profitMargin, setProfitMargin] = useState(50); // Default to 50%
  const [salesPotential, setSalesPotential] = useState(50); // Default to 50%
  const [lowCompetition, setLowCompetition] = useState(50); // Default to 50%

  const [, setLocation] = useLocation();

  // Check authentication and fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/admin/dashboard");

        if (!response.ok) {
          if (response.status === 403) {
            toast({
              title: "Unauthorized",
              description:
                "You must be logged in as an admin to access this page.",
              variant: "destructive",
            });
            // Redirect to login page if unauthorized
            setLocation("/login");
            return;
          }
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [toast, setLocation]);

  // Fetch dynamic categories for filtering
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Use the dynamic categories endpoint that only shows categories with products
        const response = await fetch("/api/admin/dynamic-categories");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const categoriesData = await response.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when page, limit, category, search, or filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const offset = (currentPage - 1) * productsPerPage;

        let url = `/api/admin/products?limit=${productsPerPage}&offset=${offset}`;
        if (selectedCategory) {
          url += `&categoryId=${selectedCategory}`;
        }

        if (searchQuery.trim()) {
          url += `&search=${encodeURIComponent(searchQuery.trim())}`;
        }

        // Add featured filter if it's not null
        if (featuredFilter !== null) {
          url += `&featured=${featuredFilter}`;
        }

        // Add winning filter if it's not null
        if (winningFilter !== null) {
          url += `&winning=${winningFilter}`;
        }

        console.log(
          `Fetching products with filters: featured=${featuredFilter}, winning=${winningFilter}`
        );

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setProductsLoading(false);
      }
    };

    const handler = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [
    currentPage,
    productsPerPage,
    selectedCategory,
    searchQuery,
    featuredFilter,
    winningFilter,
    toast,
  ]);

  // Handle category change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? null : value);
    setCurrentPage(1); // Reset to first page when changing category
  };

  // Handle featured filter change - works with winning filter to show all permutations
  const handleFeaturedFilterChange = (value: string) => {
    if (value === "all") {
      setFeaturedFilter(null);
    } else if (value === "featured") {
      setFeaturedFilter(true);
    } else if (value === "not-featured") {
      setFeaturedFilter(false);
    }
    setCurrentPage(1); // Reset to first page when changing filters
  };

  // Handle winning filter change - works with featured filter to show all permutations
  const handleWinningFilterChange = (value: string) => {
    if (value === "all") {
      setWinningFilter(null);
    } else if (value === "winning") {
      setWinningFilter(true);
    } else if (value === "not-winning") {
      setWinningFilter(false);
    }
    setCurrentPage(1); // Reset to first page when changing filters
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle file change for CSV import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle toggling featured status
  const handleFeaturedToggle = async (
    productId: number,
    currentStatus: boolean
  ) => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/admin/products/${productId}/toggle-featured`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ featured: !currentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Update the local products state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, featured: !currentStatus } : p
        )
      );

      toast({
        title: "Success",
        description: `Product is now ${
          !currentStatus ? "" : "no longer"
        } featured`,
      });
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast({
        title: "Error",
        description: "Failed to update featured status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle toggling winning status
  const handleWinningToggle = async (
    productId: number,
    currentStatus: boolean
  ) => {
    // Get the product details
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    // If turning on winning status, show the dialog for setting metrics
    if (!currentStatus) {
      setSelectedProductId(productId);
      setSelectedProductTitle(product.title);
      setProfitMargin(product.profitMargin || 50);
      setSalesPotential(product.salesPotential || 50);
      setLowCompetition(product.lowCompetition || 50);
      setShowWinningMetricsDialog(true);
      return;
    }

    // If turning off winning status, directly update
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/admin/products/${productId}/toggle-winning`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ winning: false }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Update the local products state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, winning: false } : p
        )
      );

      toast({
        title: "Success",
        description: "Product is no longer marked as winning",
      });
    } catch (error) {
      console.error("Error toggling winning status:", error);
      toast({
        title: "Error",
        description: "Failed to update winning status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving winning product metrics
  const handleSaveWinningMetrics = async () => {
    if (!selectedProductId) return;

    try {
      setIsLoading(true);

      // First, set the product as winning
      const winningResponse = await fetch(
        `/api/admin/products/${selectedProductId}/toggle-winning`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ winning: true }),
        }
      );

      if (!winningResponse.ok) {
        throw new Error(
          `Error ${winningResponse.status}: ${winningResponse.statusText}`
        );
      }

      // Then, update the metrics
      const metricsResponse = await fetch(
        `/api/admin/products/${selectedProductId}/update-winning-metrics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            profitMargin,
            salesPotential,
            lowCompetition,
          }),
        }
      );

      if (!metricsResponse.ok) {
        throw new Error(
          `Error ${metricsResponse.status}: ${metricsResponse.statusText}`
        );
      }

      const updatedProduct = await metricsResponse.json();

      // Update the local products state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProductId
            ? {
                ...p,
                winning: true,
                profitMargin,
                salesPotential,
                lowCompetition,
              }
            : p
        )
      );

      // Close the dialog
      setShowWinningMetricsDialog(false);

      toast({
        title: "Success",
        description: "Product is now marked as winning with custom metrics",
      });
    } catch (error) {
      console.error("Error saving winning product metrics:", error);
      toast({
        title: "Error",
        description:
          "Failed to update winning product metrics. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout function
  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      toast({
        title: "Success",
        description: "Logged out successfully",
      });

      // Redirect to login page after successful logout
      setLocation("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete all products function
  const handleDeleteAllProducts = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/admin/products/delete-all", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      // Clear the products state
      setProducts([]);
      setTotalProducts(0);

      // Update dashboard data
      const dashboardResponse = await fetch("/api/admin/dashboard");
      const newDashboardData = await dashboardResponse.json();
      setDashboardData(newDashboardData);

      toast({
        title: "Success",
        description: "All products have been deleted successfully.",
      });
    } catch (error) {
      console.error("Delete all products error:", error);
      toast({
        title: "Error",
        description: "Failed to delete all products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file upload for CSV import
  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setUploadStatus("Uploading...");

      const formData = new FormData();
      formData.append("csvFile", selectedFile);

      const response = await fetch("/api/admin/products/import", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        setUploadStatus("Upload successful!");
        toast({
          title: "Success",
          description: result.message,
        });
        // Refresh dashboard data
        const dashboardResponse = await fetch("/api/admin/dashboard");
        const dashboardData = await dashboardResponse.json();
        setDashboardData(dashboardData);
      } else {
        setUploadStatus("Upload failed.");
        toast({
          title: "Import Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload failed.");
      toast({
        title: "Error",
        description: "Failed to upload CSV file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Winning Product Metrics Dialog */}
      <Dialog
        open={showWinningMetricsDialog}
        onOpenChange={setShowWinningMetricsDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Configure Winning Product Metrics</DialogTitle>
            <DialogDescription>
              Set the metrics for "{selectedProductTitle}" as a winning product.
              These values help resellers understand the product's potential.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="profit-margin">Profit Margin</Label>
                <span className="text-sm font-medium">{profitMargin}%</span>
              </div>
              <Slider
                id="profit-margin"
                defaultValue={[profitMargin]}
                max={100}
                step={1}
                className="cursor-pointer"
                onValueChange={(values) => setProfitMargin(values[0])}
              />
              <p className="text-xs text-gray-500">
                Higher values indicate better profit potential for resellers.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="sales-potential">Sales Potential</Label>
                <span className="text-sm font-medium">{salesPotential}%</span>
              </div>
              <Slider
                id="sales-potential"
                defaultValue={[salesPotential]}
                max={100}
                step={1}
                className="cursor-pointer"
                onValueChange={(values) => setSalesPotential(values[0])}
              />
              <p className="text-xs text-gray-500">
                Higher values indicate better sales volume potential.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="low-competition">Low Competition</Label>
                <span className="text-sm font-medium">{lowCompetition}%</span>
              </div>
              <Slider
                id="low-competition"
                defaultValue={[lowCompetition]}
                max={100}
                step={1}
                className="cursor-pointer"
                onValueChange={(values) => setLowCompetition(values[0])}
              />
              <p className="text-xs text-gray-500">
                Higher values indicate less competition in the market.
              </p>
            </div>
          </div>

          <DialogFooter className="flex space-x-2 sm:space-x-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowWinningMetricsDialog(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSaveWinningMetrics}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Metrics"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {dashboardData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>Total products in database</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{dashboardData.productCount}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">
                {dashboardData.categoryCount}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leads</CardTitle>
              <CardDescription>Customer leads</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{dashboardData.leadCount}</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E40446]"></div>
        </div>
      )}

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="import">Import Products</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Product List</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Filter controls */}
                <div className="flex flex-col gap-4 mb-6">
                  {/* First row with category filter and search */}
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="w-full sm:w-1/3">
                      <Label
                        htmlFor="category-filter"
                        className="text-xs text-muted-foreground mb-1 block"
                      >
                        Category
                      </Label>
                      <Select
                        onValueChange={handleCategoryChange}
                        defaultValue="all"
                      >
                        <SelectTrigger id="category-filter">
                          <SelectValue placeholder="Filter by category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="all"
                            className={
                              selectedCategory === null
                                ? "bg-primary/10 font-medium"
                                : ""
                            }
                          >
                            All Categories
                          </SelectItem>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                              className={
                                selectedCategory === category.id.toString()
                                  ? "bg-primary/10 font-medium"
                                  : ""
                              }
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="w-full sm:w-2/3">
                      <Label
                        htmlFor="product-search"
                        className="text-xs text-muted-foreground mb-1 block"
                      >
                        Search
                      </Label>
                      <Input
                        id="product-search"
                        type="text"
                        placeholder="Search by title, description, tags or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setCurrentPage(1); // Reset to first page when searching
                          }
                        }}
                      />
                    </div>
                  </div>

                  {/* Second row with complementary filters and items per page */}
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    {/* Complementary filters - Featured and Winning */}
                    <div className="w-full sm:w-2/3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Label className="text-xs font-semibold block">
                          Product Filters
                        </Label>
                        <span className="text-xs text-muted-foreground">
                          (filter products by featured and winning status)
                        </span>
                      </div>

                      {/* Simple Filter Status Indicator */}
                      {(featuredFilter !== null || winningFilter !== null) && (
                        <div className="flex flex-wrap items-center gap-2 p-2">
                          <span className="text-xs text-muted-foreground">
                            Active filters:
                          </span>

                          {featuredFilter !== null && (
                            <span
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full 
                              bg-primary/10 text-primary border border-primary/20"
                            >
                              {featuredFilter ? "Featured" : "Not Featured"}
                            </span>
                          )}

                          {winningFilter !== null && (
                            <span
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full 
                              bg-primary/10 text-primary border border-primary/20"
                            >
                              {winningFilter ? "Winning" : "Not Winning"}
                            </span>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-auto h-6 text-xs"
                            onClick={() => {
                              setFeaturedFilter(null);
                              setWinningFilter(null);
                            }}
                          >
                            Clear Filters
                          </Button>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 border px-3 py-2 rounded-md border-primary/20 bg-secondary/10">
                        {/* Quick Filter Buttons - 4 combinations */}
                        <div className="w-full mb-1">
                          <Label className="text-xs font-semibold">
                            Quick Filters
                          </Label>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className={`text-xs h-7 flex-1 min-w-[120px] ${
                            featuredFilter === true
                              ? "bg-primary/10 border-primary/30"
                              : ""
                          }`}
                          onClick={() => {
                            setFeaturedFilter(true);
                            setWinningFilter(null);
                          }}
                        >
                          Featured Products
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={`text-xs h-7 flex-1 min-w-[120px] ${
                            featuredFilter === false
                              ? "bg-primary/10 border-primary/30"
                              : ""
                          }`}
                          onClick={() => {
                            setFeaturedFilter(false);
                            setWinningFilter(null);
                          }}
                        >
                          Not Featured
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={`text-xs h-7 flex-1 min-w-[120px] ${
                            winningFilter === true
                              ? "bg-primary/10 border-primary/30"
                              : ""
                          }`}
                          onClick={() => {
                            setFeaturedFilter(null);
                            setWinningFilter(true);
                          }}
                        >
                          Winning Products
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={`text-xs h-7 flex-1 min-w-[120px] ${
                            winningFilter === false
                              ? "bg-primary/10 border-primary/30"
                              : ""
                          }`}
                          onClick={() => {
                            setFeaturedFilter(null);
                            setWinningFilter(false);
                          }}
                        >
                          Not Winning
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          className={`text-xs h-7 flex-1 min-w-[120px] ${
                            featuredFilter === null && winningFilter === null
                              ? "bg-primary/10 border-primary/30"
                              : ""
                          }`}
                          onClick={() => {
                            setFeaturedFilter(null);
                            setWinningFilter(null);
                          }}
                        >
                          Show All
                        </Button>
                      </div>
                    </div>

                    <div className="w-full sm:w-1/3">
                      <Label
                        htmlFor="products-per-page"
                        className="text-xs text-muted-foreground mb-1 block"
                      >
                        Items per page
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setProductsPerPage(parseInt(value))
                        }
                        defaultValue="10"
                      >
                        <SelectTrigger id="products-per-page">
                          <SelectValue placeholder="Items per page" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 per page</SelectItem>
                          <SelectItem value="25">25 per page</SelectItem>
                          <SelectItem value="50">50 per page</SelectItem>
                          <SelectItem value="100">100 per page</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Product table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Handle
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          SKU
                        </TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Winning</TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Profit
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Sales
                        </TableHead>
                        <TableHead className="hidden lg:table-cell">
                          Competition
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {productsLoading ? (
                        <TableRow>
                          <TableCell colSpan={11} className="text-center py-10">
                            <div className="flex justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E40446]"></div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={11} className="text-center py-10">
                            No products found. Try importing some products
                            first.
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product) => (
                          <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>
                              {product.mainImageUrl ? (
                                <img
                                  src={product.mainImageUrl}
                                  alt={product.title}
                                  className="w-12 h-12 object-cover rounded-md"
                                />
                              ) : (
                                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                                  No img
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="font-medium">
                              {product.title}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {product.handle}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {product.sku || "-"}
                            </TableCell>
                            <TableCell>₹{product.basePrice}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Switch
                                  id={`featured-${product.id}`}
                                  checked={product.featured}
                                  onCheckedChange={() =>
                                    handleFeaturedToggle(
                                      product.id,
                                      product.featured
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`featured-${product.id}`}
                                  className="ml-2 text-sm font-medium cursor-pointer"
                                >
                                  {product.featured ? "Featured" : "Regular"}
                                </label>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Switch
                                  id={`winning-${product.id}`}
                                  checked={product.winning}
                                  onCheckedChange={() =>
                                    handleWinningToggle(
                                      product.id,
                                      product.winning
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`winning-${product.id}`}
                                  className="ml-2 text-sm font-medium cursor-pointer"
                                >
                                  {product.winning ? "Winning" : "Regular"}
                                </label>
                              </div>
                            </TableCell>

                            {/* Profit Margin Metric */}
                            <TableCell className="hidden lg:table-cell">
                              {product.winning ? (
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{
                                      width: `${product.profitMargin || 0}%`,
                                    }}
                                  ></div>
                                  <span className="text-xs text-gray-700 mt-1 inline-block">
                                    {product.profitMargin || 0}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </TableCell>

                            {/* Sales Potential Metric */}
                            <TableCell className="hidden lg:table-cell">
                              {product.winning ? (
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{
                                      width: `${product.salesPotential || 0}%`,
                                    }}
                                  ></div>
                                  <span className="text-xs text-gray-700 mt-1 inline-block">
                                    {product.salesPotential || 0}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </TableCell>

                            {/* Low Competition Metric */}
                            <TableCell className="hidden lg:table-cell">
                              {product.winning ? (
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-purple-600 h-2 rounded-full"
                                    style={{
                                      width: `${product.lowCompetition || 0}%`,
                                    }}
                                  ></div>
                                  <span className="text-xs text-gray-700 mt-1 inline-block">
                                    {product.lowCompetition || 0}%
                                  </span>
                                </div>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {!productsLoading && totalProducts > 0 && (
                  <div className="flex justify-center mt-4">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              handlePageChange(Math.max(1, currentPage - 1))
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          {
                            length: Math.min(
                              5,
                              Math.ceil(totalProducts / productsPerPage)
                            ),
                          },
                          (_, i) => {
                            const pageNumber = i + 1;
                            return (
                              <PaginationItem key={pageNumber}>
                                <PaginationLink
                                  onClick={() => handlePageChange(pageNumber)}
                                  isActive={pageNumber === currentPage}
                                >
                                  {pageNumber}
                                </PaginationLink>
                              </PaginationItem>
                            );
                          }
                        )}

                        {Math.ceil(totalProducts / productsPerPage) > 5 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              handlePageChange(
                                Math.min(
                                  Math.ceil(totalProducts / productsPerPage),
                                  currentPage + 1
                                )
                              )
                            }
                            className={
                              currentPage ===
                              Math.ceil(totalProducts / productsPerPage)
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="import" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Import Products from CSV</CardTitle>
              <CardDescription>
                Upload a CSV file to import products into the database.
                <a
                  href="/SF_Products_MC_300425_1.csv"
                  download
                  className="text-[#E40446] hover:underline ml-2"
                >
                  Download Sample CSV
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <Input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || isLoading}
                    className="w-full md:w-auto bg-[#E40446] hover:bg-[#c4003d]"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                        Uploading...
                      </>
                    ) : (
                      "Upload CSV"
                    )}
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => {
                      if (
                        window.confirm(
                          "WARNING: This will permanently delete ALL products, their variants, and images from the database. This action cannot be undone. Are you sure you want to proceed?"
                        )
                      ) {
                        handleDeleteAllProducts();
                      }
                    }}
                    disabled={isLoading}
                    className="w-full md:w-auto"
                  >
                    Delete All Products
                  </Button>
                </div>

                {uploadStatus && (
                  <p
                    className={
                      uploadStatus.includes("successful")
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {uploadStatus}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Settings</CardTitle>
              <CardDescription>
                Manage your admin account settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p>
                    <strong>Username:</strong> {dashboardData?.user?.username}
                  </p>
                  <p>
                    <strong>Role:</strong>{" "}
                    {dashboardData?.user?.isAdmin ? "Administrator" : "User"}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Button className="bg-[#E40446] hover:bg-[#c4003d]">
                    Change Password
                  </Button>
                  <Button
                    className="bg-gray-700 hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
