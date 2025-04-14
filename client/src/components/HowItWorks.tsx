import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { motion } from "framer-motion";

const steps = [
  {
    number: 1,
    title: "Sign Up",
    description: "Create your account in minutes. No complicated setup or technical knowledge required."
  },
  {
    number: 2,
    title: "Choose Products",
    description: "Select from our catalog of 10,000+ high-demand products across various categories."
  },
  {
    number: 3,
    title: "Start Selling",
    description: "Share products on your website, social media, or marketplaces like Amazon and eBay."
  },
  {
    number: 4,
    title: "Earn Profits",
    description: "We handle inventory, packaging, and delivery—you focus on growing your business."
  }
];

export default function HowItWorks() {
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
    <section id="how-it-works" className="bg-light py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to start your dropshipping business in just a few simple steps.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step) => (
            <motion.div 
              key={step.number}
              className="bg-white rounded-xl shadow-lg p-6 scale-hover"
              variants={itemVariants}
            >
              <div className="text-primary text-center mb-4">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary bg-opacity-10 text-primary text-2xl font-bold">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-bold text-center mb-3">{step.title}</h3>
              <p className="text-gray-600 text-center">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button
            size="lg"
            className="shadow-md"
            onClick={() => scrollToElement("join-now")}
          >
            Start Your Business Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
