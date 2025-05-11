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
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Share2,
  BarChart,
} from "lucide-react";

// Comparison table data
const comparisonData = {
  features: [
    { id: "products", name: "Product Selection", category: "Catalog" },
    { id: "exclusivity", name: "Exclusive Products", category: "Catalog" },
    { id: "wholesale", name: "Wholesale Pricing", category: "Pricing" },
    { id: "singleitem", name: "Single Item Orders", category: "Pricing" },
    { id: "brandable", name: "White Label/Brandable", category: "Branding" },
    { id: "quality", name: "Product Quality Guarantee", category: "Quality" },
    { id: "returns", name: "Easy Returns Process", category: "Service" },
    { id: "shipping", name: "Fast Shipping", category: "Logistics" },
    { id: "tracking", name: "Automated Order Tracking", category: "Logistics" },
    { id: "cod", name: "Cash on Delivery Option", category: "Payment" },
    { id: "prepaid", name: "Prepaid Payment Options", category: "Payment" },
    { id: "api", name: "API Integration", category: "Technology" },
    {
      id: "inventory",
      name: "Real-time Inventory Sync",
      category: "Technology",
    },
    { id: "support", name: "24/7 Supplier Support", category: "Service" },
    { id: "training", name: "Business Training", category: "Support" },
    { id: "margins", name: "High Profit Margins", category: "Pricing" },
  ],
  competitors: [
    {
      id: "baapdrop",
      name: "BAAPSTORE",
      logo: "/baapdrop-logo.png",
      description:
        "All-in-one dropshipping solution with the widest product selection and best business support.",
      features: {
        products: {
          value: "100,000+",
          hasFeature: true,
          note: "Largest selection in India",
        },
        exclusivity: {
          value: "Yes",
          hasFeature: true,
          note: "Exclusive manufacturer partnerships",
        },
        wholesale: { value: "Yes", hasFeature: true },
        singleitem: {
          value: "Yes",
          hasFeature: true,
          note: "No minimum order",
        },
        brandable: {
          value: "Yes",
          hasFeature: true,
          note: "Custom packaging & inserts",
        },
        quality: { value: "Yes", hasFeature: true, note: "ISO 9001 certified" },
        returns: {
          value: "Yes",
          hasFeature: true,
          note: "7-day hassle-free returns",
        },
        shipping: {
          value: "2-5 days",
          hasFeature: true,
          note: "Pan India coverage",
        },
        tracking: { value: "Yes", hasFeature: true, note: "Real-time updates" },
        cod: {
          value: "Yes",
          hasFeature: true,
          note: "Available for all products",
        },
        prepaid: { value: "Yes", hasFeature: true, note: "All major methods" },
        api: { value: "Yes", hasFeature: true, note: "Advanced API" },
        inventory: {
          value: "Yes",
          hasFeature: true,
          note: "Real-time updates",
        },
        support: {
          value: "Yes",
          hasFeature: true,
          note: "24/7 dedicated team",
        },
        training: {
          value: "Yes",
          hasFeature: true,
          note: "Comprehensive resources",
        },
        margins: {
          value: "30-70%",
          hasFeature: true,
          note: "Industry leading",
        },
      },
    },
    {
      id: "competitor1",
      name: "Competitor A",
      logo: "/placeholder-logo.png",
      description:
        "Basic dropshipping service with limited product selection and support options.",
      features: {
        products: { value: "25,000+", hasFeature: true },
        exclusivity: { value: "No", hasFeature: false },
        wholesale: { value: "Yes", hasFeature: true },
        singleitem: {
          value: "No",
          hasFeature: false,
          note: "Minimum order ₹5,000",
        },
        brandable: {
          value: "Limited",
          hasFeature: true,
          note: "Basic options only",
        },
        quality: { value: "No", hasFeature: false },
        returns: { value: "No", hasFeature: false, note: "Complex process" },
        shipping: { value: "7-10 days", hasFeature: true },
        tracking: { value: "Manual", hasFeature: false },
        cod: {
          value: "Limited",
          hasFeature: true,
          note: "Selected cities only",
        },
        prepaid: { value: "Yes", hasFeature: true },
        api: { value: "Basic", hasFeature: true },
        inventory: {
          value: "Manual",
          hasFeature: false,
          note: "Daily updates",
        },
        support: {
          value: "Limited",
          hasFeature: false,
          note: "Business hours only",
        },
        training: { value: "No", hasFeature: false },
        margins: { value: "15-30%", hasFeature: false },
      },
    },
    {
      id: "competitor2",
      name: "Competitor B",
      logo: "/placeholder-logo.png",
      description:
        "Mid-range dropshipping platform with moderate product selection and basic features.",
      features: {
        products: { value: "50,000+", hasFeature: true },
        exclusivity: {
          value: "Limited",
          hasFeature: true,
          note: "Few exclusive items",
        },
        wholesale: { value: "Yes", hasFeature: true },
        singleitem: {
          value: "Yes",
          hasFeature: true,
          note: "Higher rates for small orders",
        },
        brandable: { value: "No", hasFeature: false },
        quality: { value: "Limited", hasFeature: false, note: "No guarantee" },
        returns: { value: "Yes", hasFeature: true, note: "3-day window" },
        shipping: { value: "4-7 days", hasFeature: true },
        tracking: { value: "Yes", hasFeature: true, note: "Basic tracking" },
        cod: { value: "Yes", hasFeature: true, note: "Extra charges apply" },
        prepaid: { value: "Limited", hasFeature: true, note: "Few options" },
        api: { value: "No", hasFeature: false },
        inventory: { value: "No", hasFeature: false },
        support: { value: "Yes", hasFeature: true, note: "Email only" },
        training: { value: "Limited", hasFeature: true, note: "Basic guides" },
        margins: { value: "20-40%", hasFeature: true },
      },
    },
  ],
};

// Type for feature data
interface FeatureData {
  value: string;
  hasFeature: boolean;
  note?: string;
}

// Feature comparison cell component
const FeatureCell = ({ feature }: { feature: FeatureData }) => {
  if (feature.hasFeature) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center">
          <Check className="h-6 w-6 text-green-500 mr-2" />
          <span className="font-medium">{feature.value}</span>
        </div>
        {feature.note && (
          <span className="text-xs text-gray-500 mt-1">{feature.note}</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center">
        <X className="h-6 w-6 text-red-500 mr-2" />
        <span className="font-medium">{feature.value || "No"}</span>
      </div>
      {feature.note && (
        <span className="text-xs text-gray-500 mt-1">{feature.note}</span>
      )}
    </div>
  );
};

export default function ComparisonPage() {
  const [_, setLocation] = useLocation();
  const [activeCategory, setActiveCategory] = React.useState("all");

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(comparisonData.features.map((f) => f.category))),
  ];

  // Filter features by category
  const filteredFeatures =
    activeCategory === "all"
      ? comparisonData.features
      : comparisonData.features.filter(
          (feature) => feature.category === activeCategory
        );

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
                  Competitive Analysis
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                BAAPSTORE vs. Competitors
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                See how BAAPSTORE's dropshipping solution compares to other
                platforms. We offer more products, better pricing, and superior
                service to help you succeed.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white animated-btn"
                  size="lg"
                >
                  <BarChart className="mr-2 h-5 w-5" />
                  View Full Comparison
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  size="lg"
                >
                  Register Now
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

          {/* Explanation Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose BAAPSTORE?</h2>
            <p className="text-gray-600 max-w-3xl mb-8">
              When choosing a dropshipping partner, it's important to compare
              all aspects of the service. Below is a detailed comparison between
              BAAPSTORE and other popular dropshipping platforms in India. See
              how we stack up against the competition in terms of product
              selection, pricing, services, and more.
            </p>

            {/* Feature Category Filter */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">
                Filter by Category:
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={
                      activeCategory === category
                        ? "bg-primary text-white"
                        : "border-gray-200"
                    }
                  >
                    {category === "all" ? "All Features" : category}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 overflow-hidden"
          >
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-4 text-left font-medium text-gray-600 w-1/4">
                      Features
                    </th>
                    {comparisonData.competitors.map((competitor) => (
                      <th key={competitor.id} className="p-4 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <span
                            className={`text-lg font-bold ${
                              competitor.id === "baapdrop" ? "text-primary" : ""
                            }`}
                          >
                            {competitor.name}
                          </span>
                          <span className="text-xs text-gray-500 max-w-[200px] mt-1">
                            {competitor.description}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredFeatures.map((feature, index) => (
                    <tr
                      key={feature.id}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="p-4 font-medium">
                        <div>
                          {feature.name}
                          <div className="text-xs text-gray-500">
                            {feature.category}
                          </div>
                        </div>
                      </td>
                      {comparisonData.competitors.map((competitor) => (
                        <td
                          key={`${competitor.id}-${feature.id}`}
                          className={`border-l ${
                            competitor.id === "baapdrop" ? "bg-primary/5" : ""
                          }`}
                        >
                          <FeatureCell
                            feature={
                              competitor.features[
                                feature.id as keyof typeof competitor.features
                              ]
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Testimonials/Proof */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                What Our Resellers Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what resellers who have
                switched to BAAPSTORE have to say about our platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "I switched from Competitor A to BAAPSTORE and saw my profit margins increase by 35%. The product quality and shipping times are significantly better.",
                  author: "Rahul S.",
                  business: "Fashion Accessories Store",
                },
                {
                  quote:
                    "The real-time inventory management with BAAPSTORE is a game-changer. I never have to worry about selling out-of-stock items to my customers anymore.",
                  author: "Priya M.",
                  business: "Home Decor Boutique",
                },
                {
                  quote:
                    "BAAPSTORE's customer support is exceptional. Any issues with orders are resolved quickly, which has helped me maintain a 4.9-star rating on my store.",
                  author: "Vikram J.",
                  business: "Electronics Dropshipper",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <svg
                        className="h-8 w-8 text-primary/80"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 flex-grow mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">
                        {testimonial.business}
                      </p>
                    </div>
                  </div>
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
                    Make the Switch
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready for a Better Dropshipping Solution?
                  </h3>
                  <p className="mb-6 text-white/90">
                    Join thousands of successful resellers who have switched to
                    BAAPSTORE. Experience the difference with our superior
                    product selection, competitive pricing, and exceptional
                    service.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                    size="lg"
                  >
                    Join BAAPSTORE Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    size="lg"
                  >
                    Schedule a Demo
                  </Button>
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
              <h3 className="text-xl font-bold mb-2">Share this comparison</h3>
              <p className="text-gray-600">
                Know someone who might benefit from this comparison? Share it
                with them.
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
