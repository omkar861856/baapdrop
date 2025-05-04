import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Companies = () => {
  let [logos, setLogos] = useState([
    [
      {
        title: "amazon",
        src: "../../public/platforms/amazon-300x164.png",
      },
      {
        title: "shopify",
        src: "../../public/platforms/shopify-300x164.png",
      },
      {
        title: "woo",
        src: "../../public/platforms/woocommerce-300x164.png",
      },
      {
        title: "opencart",
        src: "../../public/platforms/opencart-300x164.png",
      },
    ],
    [
      {
        title: "amazon second",
        src: "../../public/platforms/amazon-300x164.png",
      },
      {
        title: "shopify second",
        src: "../../public/platforms/shopify-300x164.png",
      },
      {
        title: "woo second",
        src: "../../public/platforms/woocommerce-300x164.png",
      },
      {
        title: "opencart second",
        src: "../../public/platforms/opencart-300x164.png",
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
    <div className="bg-white relative z-20 py-10 md:py-40">
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-block mb-3">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium">
            Seamless Integration
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Supported Platforms
        </h2>
        <p className="text-gray-600 text-lg">
          BAAPSTORE supports all major ecommerce platforms to help you sell more
          effectively
        </p>
      </motion.div>

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

export default Companies;
