import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowRight,
  UserPlus,
  PackageSearch,
  Share2,
  DollarSign,
  PlusCircle,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Customer Orders",
    description:
      "Customers place orders on your e-commerce portal with your own branding.",
    icon: <UserPlus className="h-7 w-7" />,
    color: "bg-blue-500",
  },
  {
    number: 2,
    title: "Order Forwarding",
    description:
      "Your store automatically passes the order info to our dropshipping system.",
    icon: <PackageSearch className="h-7 w-7" />,
    color: "bg-purple-500",
  },
  {
    number: 3,
    title: "We Ship Products",
    description:
      "We package and ship products directly to your customers under your brand name.",
    icon: <Share2 className="h-7 w-7" />,
    color: "bg-pink-500",
  },
  {
    number: 4,
    title: "You Earn Profits",
    description:
      "You keep the margin between wholesale and retail price - with zero inventory investment.",
    icon: <DollarSign className="h-7 w-7" />,
    color: "bg-green-500",
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, type: "spring", stiffness: 100 },
    },
  };

  return (
    <section
      id="how-it-works"
      className="bg-gradient-to-b from-gray-50 to-white py-20"
    >
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
              Simple 4-Step Process
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How BaapDrop Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our platform makes it incredibly easy to start your own dropshipping
            business without any hassle.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 transform -translate-y-1/2 z-0" />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="bg-white rounded-xl shadow-lg p-6 scale-hover border border-gray-100 relative"
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                  transition: { duration: 0.3 },
                }}
              >
                {/* Number badge - Mobile only */}
                <div className="lg:hidden absolute -top-4 -right-2 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`${step.color} text-white rounded-2xl p-4 inline-flex mb-6 shadow-lg`}
                >
                  {step.icon}
                </div>

                {/* Step number in a circle - Desktop */}
                <div className="hidden lg:flex absolute -top-6 left-1/2 transform -translate-x-1/2 items-center justify-center bg-white w-12 h-12 rounded-full shadow-md border border-gray-200">
                  <span className="text-primary font-bold text-xl">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>

                {/* Arrow connecting cards - mobile only */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4">
                    <ArrowRight className="text-gray-400 h-5 w-5" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center mt-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button
            size="lg"
            className="primary-gradient animated-btn shadow-lg font-medium px-8 text-lg"
            onClick={() => scrollToElement("join-now")}
          >
            Become a Reseller
            <PlusCircle className="ml-2 h-5 w-5" />
          </Button>

          <div className="flex items-center gap-2 text-gray-600 bg-gray-100 px-5 py-2 rounded-lg">
            <span className="text-4xl font-bold text-primary">7000+</span>
            <span className="text-sm font-medium">
              Products
              <br />
              Available
            </span>
          </div>
        </motion.div>

        {/* Extra features */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {[
            {
              title: "Wholesale Pricing",
              description:
                "Get products at Baap Price - 50% discount from wholesale prices even for single items",
              bgColor: "bg-blue-50",
            },
            {
              title: "Website & Automation",
              description:
                "Automated stock & order synchronization with cloud hosting and technical support",
              bgColor: "bg-purple-50",
            },
            {
              title: "Logistics Support",
              description:
                "Shipping to 27,000+ pincodes with top courier partners like Delhivery and Xpress Bees",
              bgColor: "bg-pink-50",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className={`${feature.bgColor} rounded-lg p-6 border border-t-4 border-primary`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
