import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  ChevronLeft,
  Heart,
  Share,
  ShoppingCart,
  Truck,
  Shield,
  Tag,
  Star,
  Check,
  Loader2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { formatPrice } from "@/lib/utils";

// Define types
interface ProductVariant {
  id: number;
  productId: number;
  sku: string | null;
  price: string;
  compareAtPrice: string | null;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  position: number;
}

interface ProductImage {
  id: number;
  productId: number;
  url: string;
  position: number;
  alt: string | null;
}

interface Product {
  id: number;
  title: string;
  handle: string;
  description: string | null;
  productType: string | null;
  vendor: string | null;
  sku: string | null;
  basePrice: string;
  compareAtPrice: string | null;
  featured: boolean;
  winning: boolean;
  mainImageUrl: string | null;
  categoryId: number | null;
  tags: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  profitMargin?: number;
  salesPotential?: number;
  lowCompetition?: number;
  variants?: ProductVariant[];
  images?: ProductImage[];
}

export default function ProductDetail({ handle }: { handle: string }) {
  const [_, setLocation] = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${handle}`);

        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.status}`);
        }

        const data = await response.json();
        console.log("Product detail data:", data);
        setProduct(data);

        // Set the main image as the selected image initially
        if (data.mainImageUrl) {
          setSelectedImageUrl(data.mainImageUrl);
        } else if (data.images && data.images.length > 0) {
          setSelectedImageUrl(data.images[0].url);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProduct();
  }, [handle]);

  // Update shareUrl when the component mounts or when the window location changes
  useEffect(() => {
    // Get the current absolute URL including protocol, domain, and path
    const currentUrl = window.location.href;
    setShareUrl(currentUrl);
  }, []);

  // Calculate profit margin if compareAtPrice exists or use product's profit margin
  const basePrice = product ? parseFloat(product.basePrice) : 0;
  const compareAtPrice = product?.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;
  const calculatedMargin = compareAtPrice
    ? Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100)
    : 0;
  // Use product's profitMargin if available, otherwise use calculated margin
  const marginPercentage = product?.profitMargin || calculatedMargin;

  // Extract tags array from comma-separated string
  const tagsArray = product?.tags
    ? product.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
    : [];

  // Add default tags based on product properties
  const displayTags = [...tagsArray];
  if (product?.winning && !displayTags.includes("Winning Product")) {
    displayTags.unshift("Winning Product");
  }
  if (marginPercentage >= 40 && !displayTags.includes("High Margin")) {
    displayTags.push("High Margin");
  }
  if (product?.featured && !displayTags.includes("Featured")) {
    displayTags.unshift("Featured");
  }

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

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Button
            variant="outline"
            size="sm"
            className="mb-6"
            onClick={() => setLocation("/products")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          <div className="bg-gray-50 border border-gray-200 text-gray-600 p-8 rounded-lg text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="mb-6">
              {error ||
                "The product you're looking for doesn't exist or has been removed."}
            </p>
            <Button onClick={() => setLocation("/products")}>
              Browse Other Products
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
      <div className="container mx-auto px-4 py-8">
        {/* Back button & breadcrumbs */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/products")}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Button>

          <div className="text-sm text-gray-500 hidden md:block">
            Home / Products / {product.productType || "General"} /{" "}
            {product.title}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96 flex items-center justify-center">
              {selectedImageUrl ? (
                <img
                  src={selectedImageUrl}
                  alt={product.title}
                  className="object-contain max-h-full max-w-full"
                />
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <ShoppingCart className="h-16 w-16 mb-2" />
                  <span>No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 0 && (
              <div className="flex mt-4 gap-2 overflow-x-auto pb-2">
                {product.images.map((image) => (
                  <button
                    key={image.id}
                    className={`h-16 w-16 rounded border-2 overflow-hidden flex-shrink-0 ${
                      selectedImageUrl === image.url
                        ? "border-primary"
                        : "border-gray-200"
                    }`}
                    onClick={() => setSelectedImageUrl(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt || product.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div className="space-y-4">
              <div>
                {displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {displayTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant={index === 0 ? "default" : "outline"}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-3xl font-bold">{product.title}</h1>

                {product.sku && (
                  <div className="text-sm text-gray-500 mt-1">
                    SKU: {product.sku}
                  </div>
                )}

                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.basePrice)}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                  {marginPercentage > 0 && (
                    <Badge
                      variant="outline"
                      className="ml-2 text-green-600 bg-green-50"
                    >
                      {marginPercentage}% Margin
                    </Badge>
                  )}
                </div>
              </div>

              {/* Winning Product Metrics - Only show for winning products */}
              {product.winning && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">
                    Winning Product Metrics
                  </h3>
                  <div className="space-y-4">
                    {/* Profit Margin Metric */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Profit Margin</span>
                        <span className="font-medium">
                          {product.profitMargin || marginPercentage || 0}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{
                            width: `${
                              product.profitMargin || marginPercentage || 0
                            }%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Higher values indicate better profit potential
                      </p>
                    </div>

                    {/* Sales Potential Metric */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Sales Potential</span>
                        <span className="font-medium">
                          {product.salesPotential || 85}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${product.salesPotential || 85}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Higher values indicate stronger demand in the market
                      </p>
                    </div>

                    {/* Low Competition Metric */}
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Low Competition</span>
                        <span className="font-medium">
                          {product.lowCompetition || 75}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full"
                          style={{ width: `${product.lowCompetition || 75}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Higher values indicate less competition in the market
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Product Showcase Info */}
              <div className="mt-6 p-4 bg-[#E40446]/10 rounded-lg border border-[#E40446]/20">
                <div className="flex items-start">
                  <div className="bg-[#E40446]/20 p-2 rounded-full mr-3">
                    <Tag className="h-5 w-5 text-[#E40446]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-[#E40446]">
                      Dropshipping Opportunity
                    </h3>
                    <p className="text-sm text-gray-700 mt-1">
                      This product is available for reselling through our
                      dropshipping program. Join BaapStore's 5G Dropshipping
                      program to start selling this product with zero inventory.
                    </p>
                  </div>
                </div>
              </div>

              {/* Reseller CTA Button */}
              <div className="mt-6">
                <Button size="lg" className="w-full">
                  <Star className="h-5 w-5 mr-2" />
                  Become a Reseller
                </Button>
              </div>

              {/* Shipping & Returns */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-start space-x-3">
                    <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Free Shipping</h4>
                      <p className="text-sm text-gray-500">
                        On orders above ₹999
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Quality Guarantee</h4>
                      <p className="text-sm text-gray-500">
                        Genuine products, quality assured
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Share */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <Dialog
                  open={isShareDialogOpen}
                  onOpenChange={setIsShareDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4 mr-2" />
                      Share this product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share this product</DialogTitle>
                      <DialogDescription>
                        Share this product with your customers and friends
                        across various platforms.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex gap-2 py-4">
                      <Input value={shareUrl} readOnly className="flex-1" />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl);
                          toast({
                            title: "Link copied!",
                            description: "Product link copied to clipboard",
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex justify-center gap-4 py-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-[#1877F2] hover:bg-[#166FE5] text-white hover:text-white border-none"
                        onClick={() => {
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              shareUrl
                            )}`,
                            "_blank"
                          );
                        }}
                      >
                        <Facebook className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-[#1DA1F2] hover:bg-[#1a94da] text-white hover:text-white border-none"
                        onClick={() => {
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              shareUrl
                            )}&text=${encodeURIComponent(
                              product?.title || "Check out this product"
                            )}`,
                            "_blank"
                          );
                        }}
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-[#0A66C2] hover:bg-[#0958a7] text-white hover:text-white border-none"
                        onClick={() => {
                          window.open(
                            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                              shareUrl
                            )}&title=${encodeURIComponent(
                              product?.title || "Check out this product"
                            )}`,
                            "_blank"
                          );
                        }}
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-[#25D366] hover:bg-[#1fb855] text-white hover:text-white border-none"
                        onClick={() => {
                          const text = `Check out this product: ${product?.title} ${shareUrl}`;
                          window.open(
                            `https://wa.me/?text=${encodeURIComponent(text)}`,
                            "_blank"
                          );
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-5 w-5"
                        >
                          <path d="M12.043 6.925a4.985 4.985 0 0 0-4.986 4.986c-.001.94.273 1.854.79 2.638l-1.227 3.654 3.753-1.194a4.97 4.97 0 0 0 1.67.299h.002a4.986 4.986 0 0 0 4.986-4.983 4.986 4.986 0 0 0-4.988-5.4zm2.956 7.075c-.128.36-.761.688-1.045.728-.285.04-1.248.285-2.3-.482-.756-.588-1.301-1.325-1.451-1.554-.155-.228-.732-1-1.153-1.643-.171-.262.195-.372.54-.747.159-.172.297-.297.426-.48.13-.186.217-.372.238-.522.021-.148-.319-1.056-.5-1.378-.153-.274-.38-.339-.576-.339h-.762c-.27 0-.762.148-1.153.514-.392.366-.545.752-.588.881-.042.13-.505 1.174.273 2.552.335.595 1.031 1.628 2.4 2.511 1.21.779 2.333.858 2.861.879.529.024 1.619-.199 1.893-.878.275-.68.275-1.266.19-1.386-.084-.122-.318-.191-.668-.318z" />
                        </svg>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-[#EA4335] hover:bg-[#d23c2e] text-white hover:text-white border-none"
                        onClick={() => {
                          window.open(
                            `mailto:?subject=${encodeURIComponent(
                              product?.title || "Check out this product"
                            )}&body=${encodeURIComponent(
                              `I thought you might be interested in this product: ${shareUrl}`
                            )}`,
                            "_blank"
                          );
                        }}
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent
              value="description"
              className="p-6 bg-white rounded-lg mt-2 border"
            >
              {product.description ? (
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              ) : (
                <p className="text-gray-500 italic">
                  No detailed description available for this product.
                </p>
              )}
            </TabsContent>
            <TabsContent
              value="specifications"
              className="p-6 bg-white rounded-lg mt-2 border"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Product Information</h3>
                  <ul className="space-y-2">
                    {product.vendor && (
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-gray-600">Brand/Vendor</span>
                        <span className="font-medium">{product.vendor}</span>
                      </li>
                    )}
                    {product.productType && (
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">
                          {product.productType}
                        </span>
                      </li>
                    )}
                    {product.sku && (
                      <li className="flex justify-between border-b pb-1">
                        <span className="text-gray-600">SKU</span>
                        <span className="font-medium">{product.sku}</span>
                      </li>
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Features</h3>
                  <ul className="space-y-2">
                    {tagsArray.map((tag, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span>{tag}</span>
                      </li>
                    ))}
                    {tagsArray.length === 0 && (
                      <li className="text-gray-500 italic">
                        No specific features listed for this product.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent
              value="shipping"
              className="p-6 bg-white rounded-lg mt-2 border"
            >
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">Shipping Policy</h3>
                  <p>
                    We offer standard shipping across India. Orders are
                    typically processed within 1-2 business days.
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>Free shipping on orders above ₹999</li>
                    <li>Standard shipping: 5-7 business days</li>
                    <li>Express shipping available at checkout</li>
                  </ul>
                </div>

                <Separator />

                <div>
                  <h3 className="font-bold mb-2">Return Policy</h3>
                  <p>
                    We offer a 7-day return policy for most products. To be
                    eligible for a return, your item must be unused and in the
                    same condition that you received it.
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                    <li>
                      Returns must be initiated within 7 days of receiving the
                      product
                    </li>
                    <li>
                      Products must be in original packaging with all tags
                      intact
                    </li>
                    <li>
                      Refunds will be issued to the original method of payment
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
}
