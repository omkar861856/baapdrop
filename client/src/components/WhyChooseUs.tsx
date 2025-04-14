import { motion } from "framer-motion";
import { BanknoteIcon, BarChart3Icon, GlobeIcon, FileTextIcon, SmartphoneIcon, ZapIcon } from "lucide-react";

const benefits = [
  {
    icon: <BanknoteIcon className="h-10 w-10" />,
    title: "Zero Investment",
    description: "No inventory costs or upfront investment required. Start your business with minimal risk."
  },
  {
    icon: <BarChart3Icon className="h-10 w-10" />,
    title: "High Profit Margins",
    description: "Set your own prices and enjoy margins of 20-40% or more on thousands of products."
  },
  {
    icon: <GlobeIcon className="h-10 w-10" />,
    title: "Global Delivery",
    description: "We ship to customers worldwide. Expand your business across borders with ease."
  },
  {
    icon: <FileTextIcon className="h-10 w-10" />,
    title: "White-Label Invoices",
    description: "All shipments include your branding and logo, creating a seamless customer experience."
  },
  {
    icon: <SmartphoneIcon className="h-10 w-10" />,
    title: "Mobile-Friendly",
    description: "Manage your business from anywhere using our intuitive mobile app or responsive website."
  },
  {
    icon: <ZapIcon className="h-10 w-10" />,
    title: "Quick Setup",
    description: "Start selling in minutes with our easy-to-use platform and comprehensive support."
  }
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform offers everything you need to build a successful dropshipping business.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden scale-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="text-secondary mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
