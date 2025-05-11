import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";
import { registerProductRoutes } from "./routes/products";
import { registerAdminRoutes } from "./routes/admin";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Register product routes
  registerProductRoutes(app);

  // Register admin routes
  registerAdminRoutes(app);
  // Lead capture endpoint
  app.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      return res.status(201).json({
        message: "Lead created successfully",
        data: lead,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }

      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  });

  // Get all leads endpoint (could be used for an admin dashboard)
  app.get("/api/leads", async (_req, res) => {
    try {
      const leads = await storage.getAllLeads();
      return res.json({
        data: leads,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
