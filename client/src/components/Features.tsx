import { motion } from "framer-motion";
import {
  UserRoundIcon,
  ClipboardCheckIcon,
  BoxesIcon,
  LineChartIcon,
  Smartphone,
  ShoppingCart,
  Truck,
  CreditCard,
  Settings,
  Images,
  Headphones,
  Package,
  BadgePercent,
  DollarSign,
  Zap,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const platformFeatures = [
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Wholesale Pricing",
    description:
      "Get products at 50% discount even for single items through our Baap price.",
    color: "bg-blue-500",
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "Pan-India Shipping",
    description:
      "Delivery to 27,000+ pincodes with top courier partners across India.",
    color: "bg-purple-500",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "No MOQ Required",
    description:
      "Order single products with no minimum order quantity requirements.",
    color: "bg-green-500",
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "COD & Prepaid Options",
    description:
      "Offer both Cash on Delivery and online payment methods to customers.",
    color: "bg-orange-500",
  },
];

const sellerSupport = [
  {
    icon: <UserRoundIcon className="h-8 w-8" />,
    title: "Automated System",
    description:
      "Real-time stock & order sync with your website, no manual intervention needed.",
  },
  {
    icon: <Images className="h-8 w-8" />,
    title: "Website Support",
    description:
      "Complete website with hosting, domain & technical support included.",
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Quality Assurance",
    description:
      "ISO 9001-certified quality standards with stringent QC process.",
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "24/7 WhatsApp Support",
    description: "Immediate assistance via WhatsApp for all your queries.",
  },
];

const resellBenefits = [
  {
    title: "Zero Investment Business",
    description: "Start selling without any inventory investment",
  },
  {
    title: "Custom Branding",
    description: "Your own brand name on packaging and invoices",
  },
  {
    title: "50% Profit Margins",
    description: "High margins with Baap Price - 50% below wholesale",
  },
  {
    title: "No Minimum Order Quantity",
    description: "Order even single products without MOQ restrictions",
  },
  {
    title: "ISO Certified Quality",
    description: "All products pass strict quality control processes",
  },
  {
    title: "Fast Pan-India Shipping",
    description: "Coverage to 27,000+ pincodes across India",
  },
];

const dropshippingGuarantees = [
  {
    icon: <Package className="h-8 w-8" />,
    title: "Guarantee 1",
    description:
      "Our 150,000+ Products with 7000+ SKUs, and 15+ Categories are the highest number of dropshipping products.",
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Guarantee 2",
    description:
      "Our products' costs are up to 80% cheaper than market price even when you order a single quantity. Compare easily with B2B portals to know it yourself.",
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Guarantee 3",
    description:
      "Our Flat Shipping cost of 39rs irrespective of weight, value, or distance is the cheapest one. You may even compare it with top courier companies like Delhivery, Speed Post or local ones like DTDC.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Guarantee 4",
    description:
      "Website we build for you with Automatic Stocks & Order Updates are more advanced and cheaper than any website development company can provide you.",
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Guarantee 5",
    description:
      "Our exhaustive marketing tools, along with resources and data we provide are something not even a marketing company can provide you. Check with our sales team to know the surprise here.",
  },
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-3">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
              Powerful Platform
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive platform provides all the tools and resources to
            build a thriving dropshipping business.
          </p>
        </motion.div>

        {/* Main Platform Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={itemVariants}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 30px -15px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 },
              }}
            >
              <div
                className={`${feature.color} text-white p-4 rounded-2xl inline-flex mb-5 shadow-lg`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-xl mb-20 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
          <div className="absolute left-0 top-0 w-full h-2 bg-primary"></div>

          <div className="p-8 md:p-12 text-white relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-3">
                  High Earnings Potential
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Earn 30-60% Profit Margins
                </h3>
                <p className="mb-6 text-white/90">
                  With our platform, you can earn significant profits on every
                  sale. Our competitive pricing allows you to set your own
                  margins and maximize your earnings.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "10,000+", label: "Products" },
                    { value: "30-60%", label: "Profit Margins" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/10 px-5 py-3 rounded-lg">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-primary/20 p-4 rounded-lg backdrop-blur-sm">
                  <BadgePercent className="h-10 w-10 text-primary" />
                  <div>
                    <h4 className="font-semibold text-lg">
                      Dynamic Pricing Tool
                    </h4>
                    <p className="text-white/90 text-sm">
                      Set your selling prices and view real-time profit
                      calculations
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-primary/20 p-4 rounded-lg backdrop-blur-sm">
                  <LineChartIcon className="h-10 w-10 text-primary" />
                  <div>
                    <h4 className="font-semibold text-lg">Sales Analytics</h4>
                    <p className="text-white/90 text-sm">
                      Track your sales, profits, and best-selling products
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg"
                  onClick={() => scrollToElement("join-now")}
                >
                  Start Earning Today
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5G Dropshipping Guarantees */}
        <div className="mb-20">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center gap-6 mb-6">
              <div className="bg-white overflow-hidden w-full max-w-xl shadow-xl rounded-lg">
                <div className="bg-yellow-400/10 py-4 px-6 text-center">
                  <h3 className="text-xl font-bold text-yellow-600">
                    5G DROPSHIPPING GUARANTEES
                  </h3>
                  <p className="text-gray-700 mt-2">
                    The fastest and most profitable way to start your online
                    business
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {dropshippingGuarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-yellow-400 hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-400 text-black font-bold rounded-full h-9 w-9 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-gray-800">
                      Guarantee {index + 1}
                    </h3>
                    <p className="text-gray-700">{guarantee.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-yellow-100 rounded-xl border border-yellow-200 p-6 inline-block shadow-md max-w-3xl">
              <p className="text-gray-800 font-medium">
                We challenge publicly. Go around the planet, check everywhere
                and find if there is any dropshipping platform that can provide
                vast and better services than us. Let's make it easier for you,
                the answer is{" "}
                <span className="font-bold text-yellow-600">'No'</span> 😊
              </p>
            </div>
          </motion.div>
        </div>

        {/* India Trusts Baapstore */}
        <motion.div
          className="py-12 mt-20 bg-slate-900 text-white rounded-xl overflow-hidden relative shadow-xl border-t-2 border-[#E40446]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decorations */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-5"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-5"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-8">
              <div className="inline-block mb-3">
                <span className="bg-[#E40446]/20 text-[#E40446] px-4 py-1.5 rounded-full text-sm font-medium">
                  Media Recognition
                </span>
              </div>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                India Trusts BAAPSTORE
              </motion.h2>
              <p className="text-gray-400 text-center max-w-2xl mx-auto">
                Featured in leading business publications and recognized for
                excellence in dropshipping services
              </p>
            </div>

            {/* Infinite Logo Scroll Animation */}
            <div className="relative flex overflow-hidden py-4">
              <div className="flex whitespace-nowrap animate-marquee">
                {/* First row of logos */}
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupTN.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupIndia.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/ISO.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/GOICertificate.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/Forbes.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/BusinessStandard.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/News18.png')",
                    }}
                  ></div>
                </div>

                {/* Duplicate logos for seamless scrolling */}

                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupTN.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupIndia.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/ISO.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/GOICertificate.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/Forbes.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/BusinessStandard.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/News18.png')",
                    }}
                  ></div>
                </div>

                
              </div>
            </div>

            {/* Second Row - Reverse Direction */}
            <div className="relative flex overflow-hidden py-4">
              <div className="flex whitespace-nowrap animate-marquee-reverse">
                {/* First row of logos */}
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupTN.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupIndia.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/ISO.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/GOICertificate.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/Forbes.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/BusinessStandard.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/News18.png')",
                    }}
                  ></div>
                </div>

                {/* Duplicate logos for seamless scrolling */}

                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupTN.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/StartupIndia.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/ISO.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/GOICertificate.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/Forbes.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/BusinessStandard.png')",
                    }}
                  ></div>
                </div>
                <div className="mx-3 bg-white p-3 rounded-md flex items-center justify-center h-20 w-32 shadow-md">
                  <div
                    className="w-full h-full bg-white bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage:
                        "url('https://ik.imagekit.io/6aatygthe/Baapstore/News18.png')",
                    }}
                  ></div>
                </div>

                
              </div>
            </div>

            <motion.div
              className="mt-10 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <button
                className="bg-[#E40446] hover:bg-[#E40446]/90 text-white font-medium shadow-lg px-8 py-3 rounded-md transition duration-300"
                onClick={() =>
                  document
                    .getElementById("join-now")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join India's Most Trusted Dropshipping Platform
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Reseller Benefits */}
        <motion.div
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-8 md:p-10">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                Why Resellers Choose BaapDrop
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who are building successful
                businesses with our platform
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {resellBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="bg-primary-50 text-primary-700 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xl font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="primary-gradient animated-btn shadow-lg px-8 py-6 text-lg font-medium"
                onClick={() => scrollToElement("join-now")}
              >
                Become a Reseller Today
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export const Companies = () => {
  let [logos, setLogos] = useState([
    [
      {
        title: "amazon",
        src: "/logos/amazon-300x164.png",
      },
      {
        title: "shopify",
        src: "/logos/shopify-300x164.png",
      },
      {
        title: "woo",
        src: "/logos/woocommerce-300x164.png",
      },
      {
        title: "opencart",
        src: "/logos/opencart-300x164.png",
      },
    ],
    [
      {
        title: "amazon second",
        src: "/logos/amazon-300x164.png",
      },
      {
        title: "shopify second",
        src: "/logos/shopify-300x164.png",
      },
      {
        title: "woo second",
        src: "/logos/woocommerce-300x164.png",
      },
      {
        title: "opencart second",
        src: "/logos/opencart-300x164.png",
      },
    ],
  ]);
  const [activeLogoSet, setActiveLogoSet] = useState(logos[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const flipLogos = () => {
    setLogos((currentLogos) => {
      const newLogos = [...currentLogos.slice(1), currentLogos[0]];
      setActiveLogoSet(newLogos[0]);
      setIsAnimating(true);
      return newLogos;
    });
  };

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        flipLogos();
      }, 3000);
      return () => clearTimeout(timer); // Clear timeout if component unmounts or isAnimating changes
    }
  }, [isAnimating]);

  return (
    <div className="relative z-20 py-10 md:py-40">
      <div className="flex gap-10 flex-wrap justify-center md:gap-40 relative h-full w-full mt-20">
        <AnimatePresence
          mode="popLayout"
          onExitComplete={() => {
            setIsAnimating(false);
          }}
        >
          {activeLogoSet.map((logo, idx) => (
            <motion.div
              initial={{
                y: 40,
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
              }}
              exit={{
                y: -40,
                opacity: 0,
                filter: "blur(10px)",
              }}
              transition={{
                duration: 0.8,
                delay: 0.1 * idx,
                ease: [0.4, 0, 0.2, 1],
              }}
              key={logo.title}
              className="relative"
            >
              <img
                src={logo.src}
                alt={logo.title}
                width="100"
                height="100"
                className="md:h-20 md:w-40 h-10 w-20 object-contain filter"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
