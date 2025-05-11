/**
 * SEO Utilities for BAAPSTORE
 * Contains helper functions for managing metadata across pages
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  twitterCard?: "summary" | "summary_large_image";
}

/**
 * Updates document metadata for SEO
 */
export function updateMetadata(metadata: SEOMetadata): void {
  // Update document title
  document.title = metadata.title;

  // Find or create description meta tag
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement("meta");
    metaDescription.setAttribute("name", "description");
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute("content", metadata.description);

  // Handle keywords if provided
  if (metadata.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.setAttribute("name", "keywords");
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute("content", metadata.keywords);
  }

  // Handle Open Graph metadata
  updateOpenGraphMetadata({
    title: metadata.title,
    description: metadata.description,
    image: metadata.ogImage,
    type: metadata.ogType || "website",
  });

  // Handle Twitter Card metadata
  updateTwitterCardMetadata({
    title: metadata.title,
    description: metadata.description,
    image: metadata.ogImage,
    card: metadata.twitterCard || "summary_large_image",
  });

  // Handle canonical URL
  if (metadata.canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", metadata.canonical);
  }
}

interface OpenGraphMetadata {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article" | "product";
}

function updateOpenGraphMetadata(metadata: OpenGraphMetadata): void {
  const ogTags = [
    { property: "og:title", content: metadata.title },
    { property: "og:description", content: metadata.description },
    { property: "og:type", content: metadata.type || "website" },
  ];

  if (metadata.image) {
    ogTags.push({ property: "og:image", content: metadata.image });
  }

  ogTags.forEach((tag) => {
    let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("property", tag.property);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", tag.content);
  });
}

interface TwitterCardMetadata {
  title: string;
  description: string;
  image?: string;
  card?: "summary" | "summary_large_image";
}

function updateTwitterCardMetadata(metadata: TwitterCardMetadata): void {
  const twitterTags = [
    { name: "twitter:card", content: metadata.card || "summary_large_image" },
    { name: "twitter:title", content: metadata.title },
    { name: "twitter:description", content: metadata.description },
  ];

  if (metadata.image) {
    twitterTags.push({ name: "twitter:image", content: metadata.image });
  }

  twitterTags.forEach((tag) => {
    let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", tag.name);
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", tag.content);
  });
}

/**
 * Predefined SEO metadata for common pages
 */
export const predefinedSEO = {
  home: {
    title:
      "BAAPSTORE - Start Your Dropshipping Business | Zero Inventory Investment",
    description:
      "Start your own dropshipping business with 7,000+ products, 50% profit margins, and zero inventory investment. Sell products worth ₹100 crores with automatic stock synchronization.",
    keywords:
      "dropshipping business, zero investment business, online business, dropshipping india, ecommerce dropshipping, wholesale pricing, baapstore",
    canonical: "https://www.baapstore.com/",
    ogType: "website" as const,
    twitterCard: "summary_large_image" as const,
  },
  products: {
    title: "Browse 7,000+ Products - BAAPSTORE Dropshipping Catalog",
    description:
      "Explore our extensive catalog of 7,000+ products across 15+ categories with 50% profit margins. No inventory required and Pan-India shipping to 27,000+ pincodes.",
    keywords:
      "dropshipping products, wholesale products, reseller products, product catalog, online business products, baapstore products",
    canonical: "https://www.baapstore.com/products",
    ogType: "website" as const,
    twitterCard: "summary_large_image" as const,
  },
  pricing: {
    title: "Pricing Plans - BAAPSTORE Dropshipping Business Platform",
    description:
      "Affordable subscription plans for starting your dropshipping business. Choose from Bronze, Gold, and Diamond plans with no hidden charges.",
    keywords:
      "dropshipping pricing, business subscription, ecommerce plans, baapstore pricing, reseller subscription plans",
    canonical: "https://www.baapstore.com/pricing",
    ogType: "website" as const,
    twitterCard: "summary" as const,
  },
};
