import React from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Info,
  Share2,
  Scissors,
  Copy,
} from "lucide-react";

// Demo data: Replace with your actual coupon data
const demoCoupons = [
  {
    id: 1,
    code: "FIRST10",
    discount: "10%",
    description: "10% off your first order",
    expiry: "2025-05-30",
    minOrder: 1000,
  },
  {
    id: 2,
    code: "SUMMER25",
    discount: "25%",
    description: "Summer season special discount",
    expiry: "2025-06-15",
    minOrder: 2500,
  },
  {
    id: 3,
    code: "BULK50",
    discount: "₹50",
    description: "Flat ₹50 off on bulk orders",
    expiry: "2025-05-20",
    minOrder: 5000,
  },
  {
    id: 4,
    code: "FREE100",
    discount: "100%",
    description: "Free shipping on orders above ₹10,000",
    expiry: "2025-07-01",
    minOrder: 10000,
  },
];

// Example of a reusable coupon card component
const CouponCard = ({ coupon }: { coupon: (typeof demoCoupons)[0] }) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(coupon.code);
    // You would typically show a toast notification here
    alert(`Copied coupon code: ${coupon.code}`);
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow relative overflow-hidden border-dashed border-2 border-primary/30">
      {/* Coupon edge design */}
      <div className="absolute -left-2 top-1/2 h-4 w-4 rounded-full bg-background border-l-2 border-t-2 border-b-2 border-dashed border-primary/30 -translate-y-1/2"></div>
      <div className="absolute -right-2 top-1/2 h-4 w-4 rounded-full bg-background border-r-2 border-t-2 border-b-2 border-dashed border-primary/30 -translate-y-1/2"></div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-primary">
            {coupon.code}
          </CardTitle>
          <Badge className="bg-primary text-white">{coupon.discount} Off</Badge>
        </div>
        <CardDescription>{coupon.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
          <div>
            <p className="font-medium">Min Order:</p>
            <p>₹{coupon.minOrder.toLocaleString()}</p>
          </div>
          <div>
            <p className="font-medium">Valid Until:</p>
            <p>{new Date(coupon.expiry).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="mr-2"
          onClick={handleCopyCode}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy Code
        </Button>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Use Now
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function CouponsPage() {
  const [_, setLocation] = useLocation();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Individual item animations
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
                  Special Offers
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Exclusive Coupons & Discounts
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Boost your dropshipping business with our exclusive discount
                coupons. Save on wholesale orders and maximize your profits.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white animated-btn"
                  size="lg"
                >
                  Browse All Coupons
                  <Scissors className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  size="lg"
                >
                  Join Loyalty Program
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

          {/* Page Title & Description */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Available Discount Coupons
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Use these special coupon codes to get discounts on your wholesale
              orders. Make sure to check the minimum order value and validity
              period before using them.
            </p>
          </motion.div>

          {/* Tabs Example */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="all">All Coupons</TabsTrigger>
                <TabsTrigger value="percent">Percentage Off</TabsTrigger>
                <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
                <TabsTrigger value="shipping">Free Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {demoCoupons.map((coupon) => (
                    <motion.div key={coupon.id} variants={itemVariants}>
                      <CouponCard coupon={coupon} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="percent">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {demoCoupons
                    .filter((c) => c.discount.includes("%"))
                    .map((coupon) => (
                      <motion.div key={coupon.id} variants={itemVariants}>
                        <CouponCard coupon={coupon} />
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="fixed">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {demoCoupons
                    .filter((c) => c.discount.includes("₹"))
                    .map((coupon) => (
                      <motion.div key={coupon.id} variants={itemVariants}>
                        <CouponCard coupon={coupon} />
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="shipping">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {demoCoupons
                    .filter((c) =>
                      c.description.toLowerCase().includes("shipping")
                    )
                    .map((coupon) => (
                      <motion.div key={coupon.id} variants={itemVariants}>
                        <CouponCard coupon={coupon} />
                      </motion.div>
                    ))}
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* How to Use Coupons Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How to Use Coupons</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these simple steps to apply coupon codes and save on your
                wholesale orders.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Copy the Code",
                  description:
                    "Click on the 'Copy Code' button to copy the coupon code to your clipboard.",
                },
                {
                  title: "Apply at Checkout",
                  description:
                    "Apply the copied code in the coupon field during the checkout process.",
                },
                {
                  title: "Enjoy the Discount",
                  description:
                    "See the discount applied to your order instantly. Complete the payment to confirm.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 text-primary rounded-lg mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
                    Special Offer
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Get Exclusive Discounts
                  </h3>
                  <p className="mb-6 text-white/90">
                    Join our reseller program today to receive exclusive coupon
                    codes and special promotions directly to your email.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                    size="lg"
                  >
                    Join Reseller Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <p className="text-white/70 text-sm text-center">
                    No credit card required. Get started in minutes.
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
              <h3 className="text-xl font-bold mb-2">Share these coupons</h3>
              <p className="text-gray-600">
                Found these coupons helpful? Share them with others who might
                benefit.
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
