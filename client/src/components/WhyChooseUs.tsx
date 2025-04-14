import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Truck,
  FileText,
  Smartphone,
  Zap,
  Users,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

const benefits = [
  {
    icon: <Wallet className="h-8 w-8" />,
    title: "Zero Investment",
    description:
      "Start your business with no upfront costs, inventory, or risk.",
    color: "bg-blue-500",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "High Profit Margins",
    description:
      "Enjoy profits of 30-50% on thousands of high-demand products.",
    color: "bg-green-600",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Pan-India Delivery",
    description: "We handle shipping to customers across all of India.",
    color: "bg-orange-500",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Your Brand Packaging",
    description: "All shipments include your branding for a professional look.",
    color: "bg-purple-500",
  },
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile-First Platform",
    description: "Run your entire business from your smartphone with ease.",
    color: "bg-pink-500",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Quick Start",
    description:
      "Begin selling in minutes with our simple, intuitive platform.",
    color: "bg-yellow-500",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Dedicated Support",
    description:
      "Get help anytime via WhatsApp, phone, or email from our team.",
    color: "bg-indigo-500",
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Quality Assurance",
    description: "All products are verified for quality before shipping.",
    color: "bg-red-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-3">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Trusted by 1000+ Resellers
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose BaapDrop?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We provide everything you need to build a successful dropshipping
            business without the hassle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <div
                className={`${benefit.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg`}
              >
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          className="mt-24 bg-gradient-to-r from-primary/10 to-purple-100 rounded-2xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Products" },
                { value: "1,000+", label: "Active Resellers" },
                { value: "50%", label: "Average Margin" },
                { value: "24/7", label: "Customer Support" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                >
                  <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="primary-gradient animated-btn font-medium px-8 shadow-lg"
                onClick={() => scrollToElement("join-now")}
              >
                Start Your Business Today
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonial Preview */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            Join Thousands of Successful Resellers
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our platform has helped people from all walks of life build
            successful online businesses. You could be next!
          </p>

          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="outline"
              size="lg"
              className="border-primary bg-white text-primary hover:bg-primary hover:text-white font-medium"
              onClick={() => scrollToElement("testimonials")}
            >
              See Success Stories
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
