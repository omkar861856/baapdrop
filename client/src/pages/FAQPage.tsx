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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Demo FAQ data
const faqCategories = [
  {
    id: "general",
    name: "General Questions",
    faqs: [
      {
        id: 1,
        question: "What is BAAPSTORE dropshipping?",
        answer:
          "BAAPSTORE is a complete dropshipping solution that allows resellers to sell products online without holding inventory. We handle product sourcing, storage, packaging, and shipping directly to your customers.",
      },
      {
        id: 2,
        question: "How do I get started with BAAPSTORE?",
        answer:
          "Getting started is simple - just register for a reseller account, browse our product catalog, select items to list on your store, and start selling. When orders come in, you place them with us, and we ship directly to your customers.",
      },
      {
        id: 3,
        question: "Is there a membership fee to join BAAPSTORE?",
        answer:
          "Yes, we offer several membership tiers with different benefits. Our basic plan starts at ₹999 per month and includes access to our wholesale catalog, order fulfillment services, and basic support.",
      },
    ],
  },
  {
    id: "products",
    name: "Products & Pricing",
    faqs: [
      {
        id: 4,
        question: "How many products do you offer?",
        answer:
          "We offer over 100,000 products across multiple categories including electronics, fashion, home decor, beauty products, and more. Our catalog is constantly expanding with new trending products.",
      },
      {
        id: 5,
        question: "What are the profit margins on products?",
        answer:
          "Profit margins typically range from 30% to 50% depending on the product category and competition. Some premium and exclusive products can offer margins up to 70%.",
      },
      {
        id: 6,
        question: "Can I set my own selling prices?",
        answer:
          "Absolutely! You have complete freedom to set your own retail prices. We provide suggested retail prices, but you can adjust them based on your business strategy and target audience.",
      },
    ],
  },
  {
    id: "shipping",
    name: "Shipping & Delivery",
    faqs: [
      {
        id: 7,
        question: "How long does shipping take?",
        answer:
          "Shipping typically takes 2-5 business days for standard delivery across India. We also offer express shipping options that can deliver within 24-48 hours in major cities.",
      },
      {
        id: 8,
        question: "Do you ship internationally?",
        answer:
          "Currently, we only ship within India. However, we're planning to expand our services to international markets in the near future.",
      },
      {
        id: 9,
        question: "What shipping carriers do you use?",
        answer:
          "We work with top shipping carriers including Delhivery, BlueDart, DTDC, and more. We automatically select the best carrier based on the delivery location and package requirements.",
      },
    ],
  },
  {
    id: "orders",
    name: "Orders & Processing",
    faqs: [
      {
        id: 10,
        question: "How do I place an order for my customer?",
        answer:
          "You can place orders through your reseller dashboard. Simply input your customer's shipping details and select the products they've purchased. Once payment is completed, we'll process and ship the order.",
      },
      {
        id: 11,
        question: "Can I track the status of my orders?",
        answer:
          "Yes, all orders can be tracked in real-time through your reseller dashboard. You'll receive automatic updates at each stage of processing, and tracking information is provided once the order ships.",
      },
      {
        id: 12,
        question: "What if an item is out of stock after I've sold it?",
        answer:
          "Our inventory is updated in real-time, but in rare cases, items may become unavailable. If this happens, we'll notify you immediately and offer similar alternatives or a full refund.",
      },
    ],
  },
  {
    id: "returns",
    name: "Returns & Refunds",
    faqs: [
      {
        id: 13,
        question: "What is your return policy?",
        answer:
          "We offer a 7-day return policy for most products. Returns must be initiated within 7 days of delivery, and the product must be in its original condition with all packaging and tags intact.",
      },
      {
        id: 14,
        question: "How are refunds processed?",
        answer:
          "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund amount is credited back to your reseller account balance or original payment method.",
      },
      {
        id: 15,
        question: "Who pays for return shipping?",
        answer:
          "If the return is due to a defect or error on our part, we cover the return shipping costs. For customer-initiated returns (size, preference, etc.), the shipping cost is deducted from the refund amount.",
      },
    ],
  },
];

export default function FAQPage() {
  const [_, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("general");

  // Filter FAQs based on search query
  const filteredFAQs = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return faqCategories;
    }

    const query = searchQuery.toLowerCase();

    return faqCategories
      .map((category) => ({
        ...category,
        faqs: category.faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.faqs.length > 0);
  }, [searchQuery]);

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
                  Help Center
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Find answers to common questions about BAAPSTORE's dropshipping
                platform, services, and business model.
              </p>

              {/* Search Box */}
              <div className="max-w-xl mx-auto relative">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for questions..."
                    className="pl-10 pr-4 py-6 text-lg rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
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

          {/* FAQ Tabs */}
          <div className="mb-16">
            {searchQuery ? (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                <p className="text-gray-600">
                  Showing results for "{searchQuery}"
                </p>
              </div>
            ) : (
              <Tabs
                defaultValue={activeCategory}
                value={activeCategory}
                onValueChange={setActiveCategory}
                className="w-full"
              >
                <TabsList className="mb-8 flex flex-wrap justify-center">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}

            {filteredFAQs.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={
                  !searchQuery && category.id !== activeCategory
                    ? "hidden"
                    : "mb-8"
                }
              >
                {searchQuery && (
                  <h3 className="text-xl font-semibold mb-4">
                    {category.name}
                  </h3>
                )}

                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, index) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <AccordionItem
                        value={`faq-${faq.id}`}
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 pb-4">
                          <div className="pt-2 pb-4">
                            <p>{faq.answer}</p>
                          </div>
                          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                            <div className="text-sm text-gray-500">
                              Was this helpful?
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                Yes
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                No
                              </Button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </motion.div>
                  ))}
                </Accordion>
              </motion.div>
            ))}

            {filteredFAQs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="flex justify-center mb-4">
                  <Search className="h-12 w-12 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any FAQs matching your search. Try using
                  different keywords or browse by category.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </div>

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
                    Need More Help?
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Still Have Questions?
                  </h3>
                  <p className="mb-6 text-white/90">
                    If you couldn't find the answer you were looking for, our
                    support team is ready to help you with any questions about
                    our dropshipping services.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                    size="lg"
                  >
                    Contact Support
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
              <h3 className="text-xl font-bold mb-2">Share this FAQ</h3>
              <p className="text-gray-600">
                Found this helpful? Share it with others who might benefit.
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
