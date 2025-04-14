import { motion } from "framer-motion";
import { Quote, Star, Instagram, Facebook, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";

const testimonials = [
  {
    quote: "I started my dropshipping business as a side hustle, and within 3 months I was making more than my full-time job. The platform makes it so easy to manage everything.",
    name: "Aarav Sharma",
    location: "Mumbai",
    title: "Fashion Reseller",
    income: "₹45,000/month",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    social: "@aarav_fashion"
  },
  {
    quote: "The white-label invoicing and packaging is a game-changer. My customers think I have a warehouse full of products, but I'm running this from my apartment!",
    name: "Priya Patel",
    location: "Ahmedabad",
    title: "Home Goods Seller",
    income: "₹38,000/month",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    social: "@home_decor_priya"
  },
  {
    quote: "I was skeptical at first, but after my first month I was sold. The profit margins are fantastic, and I love that I don't have to worry about shipping or returns.",
    name: "Raj Kumar",
    location: "Delhi",
    title: "Electronics Reseller",
    income: "₹52,000/month",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    social: "@tech_with_raj"
  },
  {
    quote: "As a college student, I needed flexible income. This platform gave me that and more! Now I'm earning while studying, with minimal time investment.",
    name: "Ananya Singh",
    location: "Bangalore",
    title: "Beauty Products Reseller",
    income: "₹35,000/month",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    rating: 5,
    social: "@glam_ananya"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
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
              Real Success Stories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Hear From Our Resellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join thousands of entrepreneurs who are building profitable businesses with BaapDrop.
          </p>
        </motion.div>
        
        {/* Featured Success Story */}
        <motion.div 
          className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl overflow-hidden shadow-md"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl font-medium text-gray-700 mb-6 relative">
                <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20 -z-10" />
                "I joined BaapDrop 6 months ago and it completely changed my life. I was working a 9-5 job, but now I've quit to focus on my dropshipping business full-time. The support team is amazing and I've never had issues with shipping or quality."
              </blockquote>
              
              <div className="flex items-center mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Profile picture of Vikram Mehta"
                  className="h-16 w-16 rounded-full object-cover border-4 border-white shadow-lg mr-4"
                  width="64"
                  height="64"
                />
                <div>
                  <div className="flex items-center">
                    <h4 className="font-bold text-xl">Vikram Mehta</h4>
                    <div className="ml-3 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                      Verified Seller
                    </div>
                  </div>
                  <p className="text-gray-600">Mumbai | Home Decor Reseller</p>
                  <p className="text-primary font-semibold">Earning ₹75,000/month</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-500">
                  <Instagram className="h-4 w-4 mr-1" />
                  <span className="text-sm">@vikram_homedecor</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <ShoppingBag className="h-4 w-4 mr-1" />
                  <span className="text-sm">300+ orders/month</span>
                </div>
              </div>
            </div>
            
            <div className="relative lg:h-auto overflow-hidden hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Entrepreneur working on their dropshipping business"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs text-center transform rotate-3">
                  <p className="font-bold text-gray-800 mb-1">Monthly Earning</p>
                  <p className="text-3xl font-bold text-primary">₹75,000</p>
                  <p className="text-xs text-gray-500">From home with no inventory</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="testimonial-card bg-white rounded-xl p-6 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 text-sm md:text-base italic">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar}
                  alt={`Profile picture of ${testimonial.name}`}
                  className="h-14 w-14 rounded-full object-cover border-2 border-primary/20 mr-4"
                  width="56"
                  height="56"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                  <p className="text-primary font-medium text-sm">{testimonial.income}</p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 flex items-center text-xs text-gray-500">
                <Facebook className="h-3 w-3 mr-1" />
                <span>{testimonial.social}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Stats and CTA */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-8 md:p-10 text-white shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {[
              { value: "1000+", label: "Active Resellers" },
              { value: "₹25L+", label: "Paid Monthly" },
              { value: "30,000+", label: "Orders Processed" },
              { value: "4.8/5", label: "Customer Rating" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</h3>
                <p className="text-white/80 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Success Story?</h3>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Join thousands of resellers who found success with BaapDrop's dropshipping platform.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-6 text-lg shadow-lg"
              onClick={() => scrollToElement("join-now")}
            >
              Start Your Business Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
