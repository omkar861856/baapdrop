import { motion } from "framer-motion";

export default function MediaRecognition() {
  const imageKitUrl = "https://ik.imagekit.io/6aatygthe/Baapstore";
  const mediaFeatures = [
    {
      title: "Forbes India",
      description:
        "Featured in Forbes India Outperformers List, Page 39  - Forbes India",
      image:  `${imageKitUrl}/Forbes.png`,
      link: "https://cms-subs.forbesindia.com/media/supplement_pdf/march-april-marquee.pdf",
    },
    {
      title: "Times of India",
      description:
        "Poll merchandise turns contemporary, cellphone covers, night lamps are faves",
      image:
        `${imageKitUrl}/TOIArticle.png`,
      link: "https://timesofindia.indiatimes.com/city/chennai/poll-merchandise-turns-contemporary-cellphone-covers-night-lamps-are-faves/articleshow/81594966.cms",
    },
    {
      title: "YourStory",
      description:
        "BAAPSTORE claims its sellers make 300% profits, without inventory investment",
      image:
       `${imageKitUrl}/YourStory.jpg`,
      link: "https://yourstory.com/2023/10/baapstore-claims-sellers-make-profits-without-inventory-investment",
    },
    {
      title: "Shiprocket",
      description:
        "Featured among the best dropshipping companies in India - Shiprocket",
      image: `${imageKitUrl}/ShiprocketLogo.jpg`,
      link: "https://shiprocket.in/blog/best-dropshipping-companies/",
    },
  ];

  return (
    <section className="bg-slate-900 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="bg-yellow-500 px-4 py-1.5 rounded-full text-sm font-medium text-gray-900">
              Recognition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Featured In Leading Media
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            BAAPSTORE has been recognized by top publications for our innovation
            in the dropshipping industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <a
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-gray-800 overflow-hidden rounded-lg shadow-lg border-t-2 border-primary h-full flex flex-col hover:transform hover:scale-105 transition-all duration-300">
                  <div className="h-40 overflow-hidden bg-gray-700">
                    <div
                      className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${feature.image})` }}
                    />
                  </div>
                  <div className="p-6 flex-grow">
                    <h3 className="font-bold text-xl mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                  <div className="px-6 py-3 bg-gray-900/50">
                    <span className="inline-flex items-center text-primary group-hover:underline">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
