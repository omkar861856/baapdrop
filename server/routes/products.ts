import { Express, Request, Response } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { storage } from "../storage";
import { importProductsFromCsv } from "../utils/csvImporter";

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

export function registerProductRoutes(app: Express): void {
  // Get all product categories
  app.get("/api/product-categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getProductCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: `Error fetching categories: ${error}` });
    }
  });

  // Dynamic categories endpoint - only returns categories that have products
  app.get("/api/dynamic-categories", async (req: Request, res: Response) => {
    try {
      console.log("Fetching dynamic categories...");

      // Get all categories first as fallback
      const allCategories = await storage.getProductCategories();
      console.log("All categories:", allCategories);

      try {
        // Try to get dynamic categories
        const dynamicCategories = await storage.getDynamicProductCategories();
        console.log("Dynamic categories:", dynamicCategories);

        // If we have dynamic categories, return them
        if (dynamicCategories && dynamicCategories.length > 0) {
          return res.json(dynamicCategories);
        }

        // Otherwise fall back to all categories
        console.log(
          "No dynamic categories found, falling back to all categories"
        );
        return res.json(allCategories);
      } catch (dynamicError) {
        // Log the specific error with dynamic categories
        console.error("Error getting dynamic categories:", dynamicError);

        // Fall back to all categories on error
        return res.json(allCategories);
      }
    } catch (error) {
      console.error("Top-level error in dynamic categories endpoint:", error);
      res
        .status(500)
        .json({ message: `Error fetching dynamic categories: ${error}` });
    }
  });

  // Get a specific product category by ID
  app.get(
    "/api/product-categories/:id",
    async (req: Request, res: Response) => {
      try {
        const id = parseInt(req.params.id);

        if (isNaN(id)) {
          return res.status(400).json({ message: "Invalid category ID" });
        }

        const categories = await storage.getProductCategories();
        const category = categories.find((cat) => cat.id === id);

        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
      } catch (error) {
        res.status(500).json({ message: `Error fetching category: ${error}` });
      }
    }
  );

  // Get featured products
  app.get("/api/featured-products", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 8;
      const featuredProducts = await storage.getFeaturedProducts(limit);
      res.json(featuredProducts);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error fetching featured products: ${error}` });
    }
  });

  // Get winning products
  app.get("/api/winning-products", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 8;
      const winningProducts = await storage.getWinningProducts(limit);
      res.json(winningProducts);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Error fetching winning products: ${error}` });
    }
  });

  // Get products with filtering
  app.get("/api/products", async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = parseInt(req.query.offset as string) || 0;
      const categoryId = req.query.categoryId
        ? parseInt(req.query.categoryId as string)
        : undefined;
      const search = req.query.search as string;
      const sortBy = req.query.sortBy as string;
      const sortOrder = req.query.sortOrder as "asc" | "desc";

      const result = await storage.getProducts({
        limit,
        offset,
        categoryId,
        search,
        sortBy,
        sortOrder,
      });

      res.json(result);
    } catch (error) {
      res.status(500).json({ message: `Error fetching products: ${error}` });
    }
  });

  // Get a single product by handle
  app.get("/api/products/:handle", async (req: Request, res: Response) => {
    try {
      const product = await storage.getProductByHandle(req.params.handle);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Get variants and images
      const variants = await storage.getProductVariantsByProductId(product.id);
      const images = await storage.getProductImagesByProductId(product.id);

      res.json({
        ...product,
        variants,
        images,
      });
    } catch (error) {
      res.status(500).json({ message: `Error fetching product: ${error}` });
    }
  });

  // Public CSV import (could be restricted for admin only in a real app)
  app.post(
    "/api/products/import",
    upload.single("csvFile"),
    async (req: Request, res: Response) => {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      try {
        const result = await importProductsFromCsv(req.file.path);

        // Delete file after processing
        fs.unlink(req.file.path, (err) => {
          if (err) console.error(`Error deleting file: ${err}`);
        });

        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Error processing CSV: ${error}`,
        });
      }
    }
  );

  // Get product statistics
  app.get(
    "/api/products/stats/summary",
    async (req: Request, res: Response) => {
      try {
        const products = await storage.getProducts();
        const categories = await storage.getProductCategories();

        // Calculate some summary statistics
        const totalProducts = products.total;
        const totalCategories = categories.length;

        res.json({
          totalProducts,
          totalCategories,
          recentlyAdded: products.products.slice(0, 5), // Get 5 most recent products
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: `Error fetching product stats: ${error}` });
      }
    }
  );
}
