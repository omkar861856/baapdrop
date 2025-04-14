import { motion } from "framer-motion";
import { UserRoundIcon, ClipboardCheckIcon, BoxesIcon, LineChartIcon } from "lucide-react";

const features = [
  {
    icon: <UserRoundIcon className="h-8 w-8" />,
    title: "Dedicated Support",
    description: "Our expert team is available 7 days a week to help you grow your business."
  },
  {
    icon: <ClipboardCheckIcon className="h-8 w-8" />,
    title: "Marketing Resources",
    description: "Access product descriptions, images, and promotional materials to boost sales."
  },
  {
    icon: <BoxesIcon className="h-8 w-8" />,
    title: "Automated Orders",
    description: "Orders are automatically processed, fulfilled, and tracked for seamless operations."
  },
  {
    icon: <LineChartIcon className="h-8 w-8" />,
    title: "Analytics Dashboard",
    description: "Track your sales, profits, and best-selling products with real-time analytics."
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
    <section className="bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-gray-600">
            Our platform provides all the tools and resources to build a thriving dropshipping business.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-md p-6 text-center"
              variants={itemVariants}
            >
              <div className="inline-flex items-center justify-center h-16 w-16 bg-primary bg-opacity-10 text-primary rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
