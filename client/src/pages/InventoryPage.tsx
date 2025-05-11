import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Package,
  AlertCircle,
  ArrowUpDown,
  Search,
  Filter,
  Share2,
} from "lucide-react";

// Demo inventory data
const inventoryItems = [
  {
    id: 1,
    sku: "EL-MBL-001",
    name: "Premium Smartphone - 128GB",
    category: "Electronics",
    stockLevel: 327,
    wholesale: 12999,
    retail: 18499,
    status: "In Stock",
    trending: true,
  },
  {
    id: 2,
    sku: "FA-MNW-005",
    name: "Designer Men's Watch - Black",
    category: "Fashion",
    stockLevel: 42,
    wholesale: 1499,
    retail: 2999,
    status: "Low Stock",
    trending: true,
  },
  {
    id: 3,
    sku: "HM-DCR-018",
    name: "Decorative Wall Clock - Modern",
    category: "Home Decor",
    stockLevel: 156,
    wholesale: 899,
    retail: 1599,
    status: "In Stock",
    trending: false,
  },
  {
    id: 4,
    sku: "BT-SKN-034",
    name: "Organic Face Serum - 30ml",
    category: "Beauty",
    stockLevel: 78,
    wholesale: 599,
    retail: 1199,
    status: "In Stock",
    trending: true,
  },
  {
    id: 5,
    sku: "FA-WMN-024",
    name: "Women's Fashion Handbag",
    category: "Fashion",
    stockLevel: 12,
    wholesale: 1299,
    retail: 2499,
    status: "Low Stock",
    trending: false,
  },
  {
    id: 6,
    sku: "EL-AUD-089",
    name: "Wireless Noise Cancelling Earbuds",
    category: "Electronics",
    stockLevel: 0,
    wholesale: 2499,
    retail: 3999,
    status: "Out of Stock",
    trending: true,
  },
  {
    id: 7,
    sku: "HM-KTN-045",
    name: "Premium Kitchen Knife Set",
    category: "Home & Kitchen",
    stockLevel: 35,
    wholesale: 1799,
    retail: 2999,
    status: "In Stock",
    trending: false,
  },
  {
    id: 8,
    sku: "BT-HRC-028",
    name: "Hair Care Gift Set - Professional",
    category: "Beauty",
    stockLevel: 0,
    wholesale: 1299,
    retail: 2199,
    status: "Out of Stock",
    trending: false,
  },
  {
    id: 9,
    sku: "EL-SPK-056",
    name: "Portable Bluetooth Speaker - 20W",
    category: "Electronics",
    stockLevel: 89,
    wholesale: 1499,
    retail: 2499,
    status: "In Stock",
    trending: true,
  },
  {
    id: 10,
    sku: "HM-BDN-103",
    name: "Premium Cotton Bedding Set - Queen",
    category: "Home & Kitchen",
    stockLevel: 24,
    wholesale: 1999,
    retail: 3499,
    status: "Low Stock",
    trending: false,
  },
];

// Product card component
const ProductCard = ({ product }: { product: (typeof inventoryItems)[0] }) => {
  const stockStatusColor = {
    "In Stock": "bg-green-100 text-green-800",
    "Low Stock": "bg-yellow-100 text-yellow-800",
    "Out of Stock": "bg-red-100 text-red-800",
  }[product.status];

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <div className="flex gap-2">
            {product.trending && (
              <Badge className="bg-primary text-white">Trending</Badge>
            )}
            <Badge className={stockStatusColor}>{product.status}</Badge>
          </div>
        </div>
        <CardDescription>
          SKU: {product.sku} • {product.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div>
            <p className="font-medium">Wholesale:</p>
            <p className="text-lg font-bold text-primary">
              ₹{product.wholesale.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium">Retail:</p>
            <p className="text-lg font-bold">
              ₹{product.retail.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm font-medium mb-1">Stock Level:</p>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                product.stockLevel === 0
                  ? "bg-red-500"
                  : product.stockLevel < 20
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
              style={{
                width: `${Math.min(100, (product.stockLevel / 100) * 100)}%`,
              }}
            ></div>
          </div>
          <p className="text-xs text-right mt-1">{product.stockLevel} units</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="mr-2">
          View Details
        </Button>
        <Button
          size="sm"
          className={`${
            product.stockLevel === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
          disabled={product.stockLevel === 0}
        >
          Add to Store
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function InventoryPage() {
  const [_, setLocation] = useLocation();
  const [view, setView] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending" | null;
  }>({
    key: "id",
    direction: null,
  });
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get unique categories for filter
  const categories = [
    "all",
    ...Array.from(new Set(inventoryItems.map((item) => item.category))),
  ];
  const statuses = ["all", "In Stock", "Low Stock", "Out of Stock"];

  // Sorting function
  const sortedItems = React.useMemo(() => {
    let sortableItems = [...inventoryItems];

    // Apply filters
    if (categoryFilter !== "all") {
      sortableItems = sortableItems.filter(
        (item) => item.category === categoryFilter
      );
    }

    if (statusFilter !== "all") {
      sortableItems = sortableItems.filter(
        (item) => item.status === statusFilter
      );
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      sortableItems = sortableItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.sku.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      sortableItems.sort((a, b) => {
        if (
          a[sortConfig.key as keyof typeof a] <
          b[sortConfig.key as keyof typeof b]
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof typeof a] >
          b[sortConfig.key as keyof typeof b]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableItems;
  }, [inventoryItems, sortConfig, searchQuery, categoryFilter, statusFilter]);

  // Request sort function
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" | null = "ascending";
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        direction = "descending";
      } else if (sortConfig.direction === "descending") {
        direction = null;
      }
    }
    setSortConfig({ key, direction });
  };

  // Get sort direction icon
  const getSortDirectionIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    if (sortConfig.direction === "ascending") {
      return <ChevronUp className="h-4 w-4 ml-1" />;
    }
    if (sortConfig.direction === "descending") {
      return <ChevronDown className="h-4 w-4 ml-1" />;
    }
    return <ArrowUpDown className="h-4 w-4 ml-1 opacity-50" />;
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#ffebf1] via-white to-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block mb-3">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
                  Product Catalog
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Browse Our Inventory
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Explore our extensive catalog of over 100,000 products available
                for dropshipping. Find trending items with high profit margins
                across multiple categories.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white animated-btn"
                  size="lg"
                >
                  <Package className="mr-2 h-5 w-5" />
                  All Products
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  size="lg"
                >
                  Trending Items
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-primary"
              onClick={() => setLocation("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
              <div className="flex flex-1 gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search by name, SKU, or category"
                    className="pl-10 pr-4"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 md:flex">
                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>

                  <select
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-primary text-white" : ""}
                >
                  Grid View
                </Button>
                <Button
                  variant={view === "table" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setView("table")}
                  className={view === "table" ? "bg-primary text-white" : ""}
                >
                  Table View
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Showing {sortedItems.length} products
                {searchQuery && <span> for "{searchQuery}"</span>}
                {categoryFilter !== "all" && <span> in {categoryFilter}</span>}
                {statusFilter !== "all" && (
                  <span> with status "{statusFilter}"</span>
                )}
              </p>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                  setSortConfig({ key: "id", direction: null });
                }}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>

          {/* Grid View */}
          {view === "grid" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
            >
              {sortedItems.length > 0 ? (
                sortedItems.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ProductCard product={item} />
                  </motion.div>
                ))
              ) : (
                <motion.div className="col-span-full text-center py-12">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="h-12 w-12 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your criteria. Try
                    adjusting your filters or search terms.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                      setStatusFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Table View */}
          {view === "table" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <ScrollArea className="rounded-md border h-[50vh]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="w-[10%] cursor-pointer"
                        onClick={() => requestSort("sku")}
                      >
                        <div className="flex items-center">
                          SKU
                          {getSortDirectionIcon("sku")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("name")}
                      >
                        <div className="flex items-center">
                          Product Name
                          {getSortDirectionIcon("name")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => requestSort("category")}
                      >
                        <div className="flex items-center">
                          Category
                          {getSortDirectionIcon("category")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer"
                        onClick={() => requestSort("stockLevel")}
                      >
                        <div className="flex items-center justify-end">
                          Stock
                          {getSortDirectionIcon("stockLevel")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer"
                        onClick={() => requestSort("wholesale")}
                      >
                        <div className="flex items-center justify-end">
                          Wholesale
                          {getSortDirectionIcon("wholesale")}
                        </div>
                      </TableHead>
                      <TableHead
                        className="text-right cursor-pointer"
                        onClick={() => requestSort("retail")}
                      >
                        <div className="flex items-center justify-end">
                          Retail
                          {getSortDirectionIcon("retail")}
                        </div>
                      </TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedItems.length > 0 ? (
                      sortedItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.sku}
                          </TableCell>
                          <TableCell>
                            {item.name}
                            {item.trending && (
                              <Badge className="ml-2 bg-primary text-white">
                                Trending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{item.category}</TableCell>
                          <TableCell className="text-right">
                            {item.stockLevel}
                          </TableCell>
                          <TableCell className="text-right font-semibold text-primary">
                            ₹{item.wholesale.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            ₹{item.retail.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge
                              className={
                                {
                                  "In Stock": "bg-green-100 text-green-800",
                                  "Low Stock": "bg-yellow-100 text-yellow-800",
                                  "Out of Stock": "bg-red-100 text-red-800",
                                }[item.status]
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">View details</span>
                                <Search className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                className={`h-8 w-8 p-0 ${
                                  item.stockLevel === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-primary text-white"
                                }`}
                                disabled={item.stockLevel === 0}
                              >
                                <span className="sr-only">Add to store</span>
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center h-32">
                          <div className="flex flex-col items-center justify-center">
                            <AlertCircle className="h-8 w-8 text-gray-300 mb-2" />
                            <p className="text-gray-500">No products found</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </motion.div>
          )}

          {/* Call to Action */}
          <motion.div
            className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-xl relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background decorations */}
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute left-0 top-0 w-full h-2 bg-primary"></div>

            <div className="p-8 md:p-12 text-white relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-3">
                    Ready to Sell?
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Start Your Dropshipping Business
                  </h3>
                  <p className="mb-6 text-white/90">
                    Register as a reseller today to access wholesale prices,
                    automated order processing, and our extensive product
                    catalog with regular updates.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                    size="lg"
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-white/70 text-sm text-center">
                    No minimum order quantities. Start selling today!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Share product catalog</h3>
              <p className="text-gray-600">
                Found interesting products? Share them with your business
                partners.
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full w-10 h-10 p-0"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
