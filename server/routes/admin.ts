import { Express, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { storage } from "../storage";
import { importProductsFromCsv } from "server/utils/csvImporter";
import multer from "multer";

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

// Admin routes
function isAdmin(req: Request, res: Response, next: any) {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }
  return res
    .status(403)
    .json({ message: "Unauthorized, admin access required" });
}

export function registerAdminRoutes(app: Express): void {
  // Admin dashboard
  app.get(
    "/api/admin/dashboard",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        // Get some basic stats
        const products = await storage.getProducts();
        const productCount = products.total;
        const categories = await storage.getProductCategories();
        const categoryCount = categories.length;
        const leads = await storage.getAllLeads();
        const leadCount = leads.length;

        res.json({
          productCount,
          categoryCount,
          leadCount,
          user: req.user,
        });
      } catch (error) {
        res
          .status(500)
          .json({ message: `Error fetching dashboard data: ${error}` });
      }
    }
  );

  // Product import route
  app.post(
    "/api/admin/products/import",
    isAdmin,
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

  // Product and category listing routes
  app.get(
    "/api/admin/products",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;
        const categoryId = req.query.categoryId
          ? parseInt(req.query.categoryId as string)
          : undefined;
        const search = (req.query.search as string) || undefined;
        const sortBy = (req.query.sortBy as string) || undefined;
        const sortOrder = req.query.sortOrder as "asc" | "desc" | undefined;

        // Handle the featured filter
        let featured = undefined;
        if (req.query.featured === "true") featured = true;
        else if (req.query.featured === "false") featured = false;

        // Handle the winning filter
        let winning = undefined;
        if (req.query.winning === "true") winning = true;
        else if (req.query.winning === "false") winning = false;

        const result = await storage.getProducts({
          limit,
          offset,
          categoryId,
          search,
          sortBy,
          sortOrder,
          featured,
          winning,
        });

        res.json(result);
      } catch (error) {
        res.status(500).json({ message: `Error fetching products: ${error}` });
      }
    }
  );

  app.get(
    "/api/admin/categories",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const categories = await storage.getProductCategories();
        res.json(categories);
      } catch (error) {
        res
          .status(500)
          .json({ message: `Error fetching categories: ${error}` });
      }
    }
  );

  // Variant and image listing routes for a specific product
  app.get(
    "/api/admin/products/:productId/variants",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const productId = parseInt(req.params.productId);
        const variants = await storage.getProductVariantsByProductId(productId);
        res.json(variants);
      } catch (error) {
        res.status(500).json({ message: `Error fetching variants: ${error}` });
      }
    }
  );

  app.get(
    "/api/admin/products/:productId/images",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const productId = parseInt(req.params.productId);
        const images = await storage.getProductImagesByProductId(productId);
        res.json(images);
      } catch (error) {
        res.status(500).json({ message: `Error fetching images: ${error}` });
      }
    }
  );

  // Toggle product featured status
  app.post(
    "/api/admin/products/:productId/toggle-featured",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const productId = parseInt(req.params.productId);
        const { featured } = req.body;

        if (typeof featured !== "boolean") {
          return res
            .status(400)
            .json({ message: "Featured status must be a boolean value" });
        }

        const product = await storage.toggleProductFeatured(
          productId,
          featured
        );
        res.json(product);
      } catch (error) {
        res.status(500).json({
          message: `Error updating product featured status: ${error}`,
        });
      }
    }
  );

  // Toggle product winning status
  app.post(
    "/api/admin/products/:productId/toggle-winning",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const productId = parseInt(req.params.productId);
        const { winning } = req.body;

        if (typeof winning !== "boolean") {
          return res
            .status(400)
            .json({ message: "Winning status must be a boolean value" });
        }

        const product = await storage.toggleProductWinning(productId, winning);
        res.json(product);
      } catch (error) {
        res
          .status(500)
          .json({ message: `Error updating product winning status: ${error}` });
      }
    }
  );

  // Update winning product metrics
  app.post(
    "/api/admin/products/:productId/update-winning-metrics",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        const productId = parseInt(req.params.productId);
        const { profitMargin, salesPotential, lowCompetition } = req.body;

        // Validate the metrics are within 0-100 range
        if (
          profitMargin < 0 ||
          profitMargin > 100 ||
          salesPotential < 0 ||
          salesPotential > 100 ||
          lowCompetition < 0 ||
          lowCompetition > 100
        ) {
          return res
            .status(400)
            .json({ message: "Metrics must be within 0-100 range" });
        }

        // Update product with metrics
        const product = await storage.updateProduct(productId, {
          profitMargin,
          salesPotential,
          lowCompetition,
        });

        res.json(product);
      } catch (error) {
        res.status(500).json({
          message: `Error updating winning product metrics: ${error}`,
        });
      }
    }
  );

  // Delete all products (dangerous - admin only)
  app.delete(
    "/api/admin/products/delete-all",
    isAdmin,
    async (req: Request, res: Response) => {
      try {
        await storage.deleteAllProducts();
        res.json({ message: "All products deleted successfully" });
      } catch (error) {
        res
          .status(500)
          .json({ message: `Error deleting all products: ${error}` });
      }
    }
  );
}
