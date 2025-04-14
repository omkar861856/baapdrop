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
  BadgePercent
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

const platformFeatures = [
  {
    icon: <Smartphone className="h-8 w-8" />,
    title: "Mobile App Access",
    description: "Manage your store on the go with our powerful mobile app.",
    color: "bg-blue-500"
  },
  {
    icon: <ShoppingCart className="h-8 w-8" />,
    title: "One-Click Ordering",
    description: "Place orders for your customers with just a single click.",
    color: "bg-purple-500"
  },
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Fast Pan-India Delivery",
    description: "We deliver to all pin codes across India within 3-7 days.",
    color: "bg-green-500"
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Flexible Payment Options",
    description: "Offer COD, UPI, cards and more payment methods to customers.",
    color: "bg-orange-500"
  }
];

const sellerSupport = [
  {
    icon: <UserRoundIcon className="h-8 w-8" />,
    title: "Dedicated Manager",
    description: "Get personalized support from your account manager 7 days a week."
  },
  {
    icon: <Images className="h-8 w-8" />,
    title: "Marketing Materials",
    description: "Access product images, descriptions, and promotional content."
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Business Automation",
    description: "Automated order processing, fulfillment, and tracking for efficiency."
  },
  {
    icon: <Headphones className="h-8 w-8" />,
    title: "24/7 WhatsApp Support",
    description: "Immediate assistance via WhatsApp for all your queries."
  }
];

const resellBenefits = [
  {
    title: "No Inventory Investment",
    description: "Start selling without buying stock"
  },
  {
    title: "White Labeling",
    description: "Your brand on all shipments and invoices"
  },
  {
    title: "Profit Margins 30-60%",
    description: "Earn high profits on every sale"
  },
  {
    title: "No Minimum Order Value",
    description: "Place orders of any amount"
  },
  {
    title: "Quality Assured Products",
    description: "All products verified for quality"
  },
  {
    title: "Business Analytics",
    description: "Track sales and performance metrics"
  }
];

export default function Features() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-600 text-lg">
            Our comprehensive platform provides all the tools and resources to build a thriving dropshipping business.
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
                transition: { duration: 0.3 }
              }}
            >
              <div className={`${feature.color} text-white p-4 rounded-2xl inline-flex mb-5 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Featured Banner */}
        <motion.div 
          className="bg-gradient-to-r from-primary-700 to-primary rounded-xl overflow-hidden shadow-xl mb-20 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background decoration */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white opacity-10"></div>
          
          <div className="p-8 md:p-12 text-white relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Earn 30-60% Profit Margins</h3>
                <p className="mb-6 text-white/90">
                  With our platform, you can earn significant profits on every sale. Our competitive pricing allows you to set your own margins and maximize your earnings.
                </p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { value: "10,000+", label: "Products" },
                    { value: "30-60%", label: "Profit Margins" }
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-white/10 px-5 py-3 rounded-lg">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <BadgePercent className="h-10 w-10 text-yellow-300" />
                  <div>
                    <h4 className="font-semibold text-lg">Dynamic Pricing Tool</h4>
                    <p className="text-white/80 text-sm">Set your selling prices and view real-time profit calculations</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <LineChartIcon className="h-10 w-10 text-yellow-300" />
                  <div>
                    <h4 className="font-semibold text-lg">Sales Analytics</h4>
                    <p className="text-white/80 text-sm">Track your sales, profits, and best-selling products</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-white text-primary hover:bg-white/90 font-medium"
                  onClick={() => scrollToElement("join-now")}
                >
                  Start Earning Today
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Seller Support */}
        <div className="mb-20">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Comprehensive Seller Support</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide end-to-end support to ensure your dropshipping business succeeds
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {sellerSupport.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                variants={itemVariants}
              >
                <div className="inline-flex items-center justify-center h-16 w-16 bg-primary/10 text-primary rounded-full mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
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
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Why Resellers Choose BaapDrop</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who are building successful businesses with our platform
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
                    <h4 className="font-semibold text-gray-800 mb-1">{benefit.title}</h4>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
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
