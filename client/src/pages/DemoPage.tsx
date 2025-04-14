import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, CheckCircle, Info, Share2 } from "lucide-react";

// Demo data: Replace with your actual data or API calls
const demoItems = [
  { id: 1, title: "Demo Item 1", description: "This is a sample item description" },
  { id: 2, title: "Demo Item 2", description: "Another example of content you might display" },
  { id: 3, title: "Demo Item 3", description: "Third item with sample description" },
  { id: 4, title: "Demo Item 4", description: "Fourth item in our demo list" },
];

// Example of a reusable component within the page
const DemoCard = ({ item }: { item: typeof demoItems[0] }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{item.title}</CardTitle>
          <Badge className="bg-primary text-white">Demo</Badge>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Info className="h-4 w-4 mr-1 text-primary" />
          <span>Sample metric: 87%</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="mr-2">
          <Info className="h-4 w-4 mr-1" />
          Details
        </Button>
        <Button size="sm" className="bg-primary text-white hover:bg-primary/90">
          Action
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function DemoPage() {
  const [_, setLocation] = useLocation();

  // Container animation for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Individual item animations
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
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
                  Demo Page Template
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Demo Page Title Here
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                This is a demo page template that you can use as a starting point for creating new pages. 
                It includes common UI patterns and components from your design system.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 text-white animated-btn" size="lg">
                  Primary Action
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10" size="lg">
                  Secondary Action
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
            <h2 className="text-3xl font-bold mb-4">Content Section Title</h2>
            <p className="text-gray-600 max-w-3xl">
              This is where you would place your main content description. Keep it concise and informative,
              explaining the purpose of this page and what users can expect to find or accomplish here.
            </p>
          </motion.div>

          {/* Tabs Example */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Tabs defaultValue="tab1" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="tab1">First Tab</TabsTrigger>
                <TabsTrigger value="tab2">Second Tab</TabsTrigger>
                <TabsTrigger value="tab3">Third Tab</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1">
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {demoItems.map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <DemoCard item={item} />
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>
              <TabsContent value="tab2">
                <Card>
                  <CardHeader>
                    <CardTitle>Second Tab Content</CardTitle>
                    <CardDescription>This is the content for the second tab.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>You can place any content here, such as tables, forms, or other components.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tab3">
                <Card>
                  <CardHeader>
                    <CardTitle>Third Tab Content</CardTitle>
                    <CardDescription>This is the content for the third tab.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>You can place any content here, such as tables, forms, or other components.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Features or Benefits Section */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Features or Benefits Section</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Highlight important features, benefits, or information that you want to emphasize on this page.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <motion.div 
                  key={item}
                  className="bg-white p-6 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: item * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center h-12 w-12 bg-primary/10 text-primary rounded-lg mb-4">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Feature {item}</h3>
                  <p className="text-gray-600">
                    This is a brief description of feature {item}. Explain the value proposition and why it matters to your users.
                  </p>
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
                    Call to Action
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="mb-6 text-white/90">
                    This section prompts the user to take the next step. Make it compelling and clear what action you want them to take.
                  </p>
                </div>
                <div className="space-y-4">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                    size="lg"
                  >
                    Primary Action
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
              <h3 className="text-xl font-bold mb-2">Share this page</h3>
              <p className="text-gray-600">Found this helpful? Share it with others who might benefit.</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share on LinkedIn</span>
              </Button>
              <Button variant="outline" size="sm" className="rounded-full w-10 h-10 p-0">
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