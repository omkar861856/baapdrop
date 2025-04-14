import React, { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-primary text-white py-2 relative"
        >
          <div className="container mx-auto px-4 flex items-center justify-center text-center">
            <div className="flex items-center justify-center space-x-4 text-sm font-medium">
              <span className="flex items-center">
                <span className="mr-2">🚚</span>
                <span>Flat ₹39 shipping all over India</span>
              </span>
              <span className="hidden md:inline-block">|</span>
              <span className="hidden md:flex items-center">
                <span className="mr-2">🛍️</span>
                <span>Over 1.5 lakh+ products available</span>
              </span>
            </div>
            <button
              onClick={handleClose}
              className="absolute right-4 text-white hover:text-gray-200"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}