import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "I started my dropshipping business as a side hustle, and within 3 months I was making more than my full-time job. The platform makes it so easy to manage everything.",
    name: "Sarah J.",
    title: "Fashion Reseller",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "The white-label invoicing and packaging is a game-changer. My customers think I have a warehouse full of products, but I'm running this from my apartment!",
    name: "Michael T.",
    title: "Home Goods Seller",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "I was skeptical at first, but after my first month I was sold. The profit margins are fantastic, and I love that I don't have to worry about shipping or returns.",
    name: "Priya K.",
    title: "Electronics Reseller",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how entrepreneurs like you are building profitable businesses with our platform.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card bg-white rounded-xl shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="text-primary">
                  <Quote className="h-8 w-8" />
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={`Profile picture of ${testimonial.name}`}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                  width="48"
                  height="48"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
