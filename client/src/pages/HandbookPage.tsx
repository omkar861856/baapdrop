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
  ChevronRight,
  Download,
  FileText,
  BookOpen,
  Share2,
} from "lucide-react";

// Demo handbook chapters data
const handbookChapters = [
  {
    id: "intro",
    title: "Introduction to Dropshipping",
    sections: [
      {
        id: "what-is",
        title: "What is Dropshipping?",
        content:
          "Dropshipping is a retail fulfillment method where a store doesn't keep the products it sells in stock. Instead, when a store sells a product, it purchases the item from a third party and has it shipped directly to the customer. This means the merchant never sees or handles the product.",
      },
      {
        id: "benefits",
        title: "Benefits of Dropshipping",
        content:
          "Dropshipping offers several advantages: low startup costs, no inventory management, location independence, wide product selection, easy to scale, and flexible business management.",
      },
      {
        id: "challenges",
        title: "Common Challenges",
        content:
          "While dropshipping has many benefits, it also comes with challenges such as lower profit margins, highly competitive markets, less control over order fulfillment, and potential supplier issues. Understanding these challenges is crucial for success.",
      },
    ],
  },
  {
    id: "getting-started",
    title: "Getting Started with BAAPSTORE",
    sections: [
      {
        id: "registration",
        title: "Registration Process",
        content:
          "Creating a BAAPSTORE reseller account is simple. Visit our website, click on 'Register,' fill out the application form with your business details, and submit. Our team will review your application and activate your account within 24-48 hours.",
      },
      {
        id: "account-setup",
        title: "Setting Up Your Account",
        content:
          "Once your account is activated, log in to your dashboard and complete your profile. Add your business details, payment methods, and shipping preferences. You'll also need to provide your GST information for proper invoice generation.",
      },
      {
        id: "finding-products",
        title: "Finding Products to Sell",
        content:
          "Use our extensive catalog to find products that match your business niche. You can filter by category, price range, profit margins, and trending status. We recommend starting with 5-10 products to test the market before expanding.",
      },
    ],
  },
  {
    id: "operations",
    title: "Running Your Dropshipping Business",
    sections: [
      {
        id: "order-processing",
        title: "Order Processing Workflow",
        content:
          "When you receive an order on your store, log in to your BAAPSTORE dashboard and place the same order with us. Enter your customer's shipping details, select the products they ordered, and submit. We'll handle packaging and shipping directly to your customer.",
      },
      {
        id: "pricing-strategy",
        title: "Developing a Pricing Strategy",
        content:
          "Your pricing strategy is crucial for profitability. Consider factors like competition, perceived value, and market positioning. Most successful resellers apply a markup of 30-50% on our wholesale prices, but premium niches can support higher margins.",
      },
      {
        id: "customer-service",
        title: "Managing Customer Service",
        content:
          "As the store owner, you're responsible for customer service. Set clear expectations about shipping times, return policies, and product details. Use our shipment tracking tools to keep customers informed about their orders.",
      },
    ],
  },
  {
    id: "scaling",
    title: "Scaling Your Business",
    sections: [
      {
        id: "marketing",
        title: "Marketing Strategies",
        content:
          "Effective marketing is essential for growth. Focus on social media marketing, content creation, SEO, and targeted ads. Our partner program offers co-marketing opportunities and promotional materials you can use for your campaigns.",
      },
      {
        id: "automation",
        title: "Automation Tools",
        content:
          "As your business grows, automation becomes important. Our API integration allows you to connect your store directly to our platform, automating order processing and inventory updates. This saves time and reduces errors.",
      },
      {
        id: "expansion",
        title: "Expanding Your Product Range",
        content:
          "Once you've established a customer base, consider expanding your product range. Cross-selling and upselling complementary products can increase your average order value and boost overall profitability.",
      },
    ],
  },
  {
    id: "success",
    title: "Success Stories and Case Studies",
    sections: [
      {
        id: "case-study-1",
        title: "Fashion Boutique Case Study",
        content:
          "An online fashion boutique started with just 8 products from our catalog and grew to ₹15 lakhs monthly revenue in just 6 months. Their strategy focused on Instagram marketing and influencer partnerships targeting urban millennials.",
      },
      {
        id: "case-study-2",
        title: "Home Decor Success Story",
        content:
          "A home decor brand used our platform to scale from a small Facebook page to a full-fledged e-commerce store. By focusing on product curation and quality content, they built a loyal customer base and now process over 500 orders monthly.",
      },
      {
        id: "testimonials",
        title: "Reseller Testimonials",
        content:
          "Our community of over 5,000 resellers includes business owners who have transformed their side hustles into full-time businesses. Their experiences and insights can help you navigate common challenges and find your own path to success.",
      },
    ],
  },
];

// Sidebar navigation item component
const SidebarNavItem = ({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div
    className={`flex items-center px-4 py-2 rounded-md cursor-pointer transition-colors ${
      isActive ? "bg-primary text-white" : "hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    <span className="flex-1">{title}</span>
    {isActive && <ChevronRight className="h-4 w-4" />}
  </div>
);

export default function HandbookPage() {
  const [_, setLocation] = useLocation();
  const [activeChapter, setActiveChapter] = React.useState("intro");
  const [activeSection, setActiveSection] = React.useState("what-is");

  // Find the current chapter and section
  const currentChapter = handbookChapters.find(
    (chapter) => chapter.id === activeChapter
  );
  const currentSection = currentChapter?.sections.find(
    (section) => section.id === activeSection
  );

  // Handle chapter selection
  const handleChapterSelect = (chapterId: string) => {
    setActiveChapter(chapterId);
    // Set first section of the chapter as active
    const chapter = handbookChapters.find((ch) => ch.id === chapterId);
    if (chapter && chapter.sections.length > 0) {
      setActiveSection(chapter.sections[0].id);
    }
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
                  Complete Guide
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Dropshipping Handbook
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Your comprehensive guide to building a successful dropshipping
                business with BAAPSTORE. Learn everything from getting started
                to scaling your operations.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white animated-btn"
                  size="lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF Version
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                  size="lg"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Reading
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

          {/* Handbook Content with Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-16">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-50 rounded-lg p-4 sticky top-20"
              >
                <h3 className="text-lg font-bold mb-4 px-4">
                  Handbook Contents
                </h3>
                <div className="space-y-1">
                  {handbookChapters.map((chapter) => (
                    <SidebarNavItem
                      key={chapter.id}
                      title={chapter.title}
                      isActive={activeChapter === chapter.id}
                      onClick={() => handleChapterSelect(chapter.id)}
                    />
                  ))}
                </div>

                <div className="mt-6 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary text-primary hover:bg-primary/10"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Chapter
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={`${activeChapter}-${activeSection}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg"
              >
                {/* Chapter Title */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-4">
                    {currentChapter?.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentChapter?.sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={
                          activeSection === section.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setActiveSection(section.id)}
                        className={
                          activeSection === section.id
                            ? "bg-primary text-white"
                            : "border-gray-200"
                        }
                      >
                        {section.title}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Section Content */}
                <div className="prose prose-lg max-w-none">
                  <h3 className="text-2xl font-bold mb-4">
                    {currentSection?.title}
                  </h3>
                  <p className="text-gray-700 mb-6">
                    {currentSection?.content}
                  </p>

                  {/* Example content - replace with actual content for each section */}
                  <p className="text-gray-700 mb-4">
                    This handbook is designed to provide you with a
                    comprehensive understanding of dropshipping and how to
                    succeed with BAAPSTORE's platform. Each chapter covers
                    essential aspects of running your dropshipping business.
                  </p>

                  <div className="bg-gray-50 border-l-4 border-primary p-4 my-6">
                    <p className="font-medium">Pro Tip:</p>
                    <p className="text-gray-600">
                      Start small with a focused product selection to test the
                      market before expanding. This minimizes risk and allows
                      you to refine your marketing strategy based on real
                      customer feedback.
                    </p>
                  </div>

                  <div className="my-8">
                    <h4 className="text-xl font-bold mb-3">Key Takeaways:</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Understand your target audience and their specific needs
                      </li>
                      <li>
                        Focus on product quality over quantity when starting out
                      </li>
                      <li>
                        Create detailed product descriptions that highlight
                        benefits, not just features
                      </li>
                      <li>
                        Implement a clear return policy to build customer trust
                      </li>
                      <li>
                        Monitor your competition but develop your unique value
                        proposition
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200"
                    onClick={() => {
                      // Logic to navigate to previous section
                      // This is simplified - you'd need more complex logic for actual implementation
                      const allSections = handbookChapters.flatMap(
                        (ch) => ch.sections
                      );
                      const currentIndex = allSections.findIndex(
                        (s) => s.id === activeSection
                      );
                      if (currentIndex > 0) {
                        const prevSection = allSections[currentIndex - 1];
                        // Find which chapter this section belongs to
                        const prevChapter = handbookChapters.find((ch) =>
                          ch.sections.some((s) => s.id === prevSection.id)
                        );
                        if (prevChapter) {
                          setActiveChapter(prevChapter.id);
                          setActiveSection(prevSection.id);
                        }
                      }
                    }}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Section
                  </Button>

                  <Button
                    size="sm"
                    className="bg-primary text-white"
                    onClick={() => {
                      // Logic to navigate to next section
                      // This is simplified - you'd need more complex logic for actual implementation
                      const allSections = handbookChapters.flatMap(
                        (ch) => ch.sections
                      );
                      const currentIndex = allSections.findIndex(
                        (s) => s.id === activeSection
                      );
                      if (currentIndex < allSections.length - 1) {
                        const nextSection = allSections[currentIndex + 1];
                        // Find which chapter this section belongs to
                        const nextChapter = handbookChapters.find((ch) =>
                          ch.sections.some((s) => s.id === nextSection.id)
                        );
                        if (nextChapter) {
                          setActiveChapter(nextChapter.id);
                          setActiveSection(nextSection.id);
                        }
                      }
                    }}
                  >
                    Next Section
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </div>
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
                    Ready to Start?
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    Put Your Knowledge Into Action
                  </h3>
                  <p className="mb-6 text-white/90">
                    Now that you understand how dropshipping works with
                    BAAPSTORE, it's time to start your journey. Register as a
                    reseller today and turn your knowledge into a profitable
                    business.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                    size="lg"
                  >
                    Register as a Reseller
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
              <h3 className="text-xl font-bold mb-2">Share this handbook</h3>
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
