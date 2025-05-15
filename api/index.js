var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertLeadSchema: () => insertLeadSchema,
  insertProductCategorySchema: () => insertProductCategorySchema,
  insertProductImageSchema: () => insertProductImageSchema,
  insertProductSchema: () => insertProductSchema,
  insertProductVariantSchema: () => insertProductVariantSchema,
  insertUserSchema: () => insertUserSchema,
  leads: () => leads,
  productCategories: () => productCategories,
  productImages: () => productImages,
  productVariants: () => productVariants,
  products: () => products,
  users: () => users
});
import {
  pgTable,
  text,
  serial,
  integer,
  numeric,
  boolean,
  timestamp
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  isAdmin: true
});
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  createdAt: text("created_at").notNull().default((/* @__PURE__ */ new Date()).toISOString())
});
var insertLeadSchema = createInsertSchema(leads).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  businessType: true
});
var productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertProductCategorySchema = createInsertSchema(
  productCategories
).pick({
  name: true,
  slug: true,
  description: true,
  imageUrl: true
});
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  handle: text("handle").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  vendor: text("vendor"),
  productType: text("product_type"),
  tags: text("tags"),
  sku: text("sku"),
  published: boolean("published").default(true),
  featured: boolean("featured").default(false),
  winning: boolean("winning").default(false),
  profitMargin: integer("profit_margin").default(0),
  // 0-100%
  salesPotential: integer("sales_potential").default(0),
  // 0-100%
  lowCompetition: integer("low_competition").default(0),
  // 0-100%
  categoryId: integer("category_id").references(() => productCategories.id),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  baseCost: numeric("base_cost").default("0"),
  basePrice: numeric("base_price").default("0"),
  compareAtPrice: numeric("compare_at_price"),
  mainImageUrl: text("main_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertProductSchema = createInsertSchema(products).pick({
  handle: true,
  title: true,
  description: true,
  vendor: true,
  productType: true,
  tags: true,
  sku: true,
  published: true,
  featured: true,
  winning: true,
  profitMargin: true,
  salesPotential: true,
  lowCompetition: true,
  categoryId: true,
  seoTitle: true,
  seoDescription: true,
  baseCost: true,
  basePrice: true,
  compareAtPrice: true,
  mainImageUrl: true
});
var productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  sku: text("sku").notNull().unique(),
  option1Name: text("option1_name"),
  option1Value: text("option1_value"),
  option2Name: text("option2_name"),
  option2Value: text("option2_value"),
  option3Name: text("option3_name"),
  option3Value: text("option3_value"),
  weight: numeric("weight").default("0"),
  inventoryQty: integer("inventory_qty").default(100),
  price: numeric("price").default("0"),
  compareAtPrice: numeric("compare_at_price"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertProductVariantSchema = createInsertSchema(
  productVariants
).pick({
  productId: true,
  sku: true,
  option1Name: true,
  option1Value: true,
  option2Name: true,
  option2Value: true,
  option3Name: true,
  option3Value: true,
  weight: true,
  inventoryQty: true,
  price: true,
  compareAtPrice: true,
  imageUrl: true
});
var productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.id),
  url: text("url").notNull(),
  position: integer("position").default(0),
  altText: text("alt_text"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var insertProductImageSchema = createInsertSchema(productImages).pick({
  productId: true,
  url: true,
  position: true,
  altText: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import "dotenv/config";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import {
  eq,
  sql,
  desc,
  asc,
  or,
  like
} from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
var DatabaseStorage = class {
  // Session store for authentication
  sessionStore;
  constructor() {
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({
      pool,
      createTableIfMissing: true
    });
  }
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Lead management methods
  async createLead(insertLead) {
    const [lead] = await db.insert(leads).values({
      ...insertLead,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    }).returning();
    return lead;
  }
  async getAllLeads() {
    return await db.select().from(leads);
  }
  // Product Category methods
  async getProductCategories() {
    return await db.select().from(productCategories);
  }
  // Get only categories that have products and include the first product image for each
  async getDynamicProductCategories() {
    try {
      console.log("Starting getDynamicProductCategories method");
      const allCategories = await this.getProductCategories();
      console.log("All categories:", JSON.stringify(allCategories));
      console.log("Fetching products for category analysis");
      const productsResult = await this.getProducts();
      console.log(`Found ${productsResult.products.length} products`);
      const usedCategoryIds = /* @__PURE__ */ new Set();
      const categoryFirstProductImage = {};
      for (const product of productsResult.products) {
        const categoryId = product.categoryId;
        console.log(
          `Product ${product.id}: categoryId = ${categoryId}, image = ${product.mainImageUrl}`
        );
        if (categoryId !== null) {
          usedCategoryIds.add(categoryId);
          if (!categoryFirstProductImage[categoryId] && product.mainImageUrl) {
            categoryFirstProductImage[categoryId] = product.mainImageUrl;
            console.log(
              `Setting first image for category ${categoryId}: ${product.mainImageUrl}`
            );
          }
        }
      }
      console.log("Used category IDs:", Array.from(usedCategoryIds));
      console.log("Category first product images:", categoryFirstProductImage);
      const dynamicCategories = allCategories.filter((category) => {
        const hasProducts = usedCategoryIds.has(category.id);
        console.log(
          `Category ${category.id} (${category.name}): has products = ${hasProducts}`
        );
        return hasProducts;
      }).map((category) => {
        if (categoryFirstProductImage[category.id]) {
          return {
            ...category,
            imageUrl: categoryFirstProductImage[category.id]
          };
        }
        return category;
      });
      console.log(
        "Dynamic categories before sorting:",
        JSON.stringify(dynamicCategories)
      );
      const sortedCategories = dynamicCategories.sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      console.log(
        "Final sorted dynamic categories with images:",
        JSON.stringify(sortedCategories)
      );
      return sortedCategories;
    } catch (error) {
      console.error("Error getting dynamic categories:", error);
      console.error(error instanceof Error ? error.stack : "Unknown error");
      return [];
    }
  }
  async getProductCategoryBySlug(slug) {
    const [category] = await db.select().from(productCategories).where(eq(productCategories.slug, slug));
    return category || void 0;
  }
  async createProductCategory(category) {
    const [newCategory] = await db.insert(productCategories).values(category).returning();
    return newCategory;
  }
  // Product methods
  async getProducts(options) {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;
    let query = db.select().from(products);
    let countQuery = db.select({ count: sql`count(*)` }).from(products);
    if (options?.categoryId) {
      query = query.where(eq(products.categoryId, options.categoryId));
      countQuery = countQuery.where(
        eq(products.categoryId, options.categoryId)
      );
    }
    if (options?.featured !== void 0) {
      query = query.where(eq(products.featured, options.featured));
      countQuery = countQuery.where(eq(products.featured, options.featured));
    }
    if (options?.winning !== void 0) {
      query = query.where(eq(products.winning, options.winning));
      countQuery = countQuery.where(eq(products.winning, options.winning));
    }
    if (options?.search) {
      const searchTerm = `%${options.search}%`;
      const searchCondition = or(
        like(products.title, searchTerm),
        like(products.description || "", searchTerm),
        like(products.tags || "", searchTerm),
        like(products.sku || "", searchTerm)
      );
      query = query.where(searchCondition);
      countQuery = countQuery.where(searchCondition);
    }
    if (options?.sortBy) {
      const sortColumn = options.sortBy;
      if (sortColumn in products) {
        query = query.orderBy(
          options.sortOrder === "desc" ? desc(products[sortColumn]) : asc(products[sortColumn])
        );
      }
    } else {
      query = query.orderBy(desc(products.id));
    }
    query = query.limit(limit).offset(offset);
    const productsList = await query;
    const [{ count }] = await countQuery;
    return {
      products: productsList,
      total: Number(count)
    };
  }
  async getProductByHandle(handle) {
    const [product] = await db.select().from(products).where(eq(products.handle, handle));
    return product || void 0;
  }
  async createProduct(product) {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
  async updateProduct(id, product) {
    const [updatedProduct] = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return updatedProduct;
  }
  async toggleProductFeatured(id, featured) {
    const [updatedProduct] = await db.update(products).set({ featured }).where(eq(products.id, id)).returning();
    return updatedProduct;
  }
  async toggleProductWinning(id, winning) {
    const [updatedProduct] = await db.update(products).set({ winning }).where(eq(products.id, id)).returning();
    return updatedProduct;
  }
  async getFeaturedProducts(limit) {
    let query = db.select().from(products).where(eq(products.featured, true)).orderBy(desc(products.id));
    if (limit) {
      query = query.limit(limit);
    }
    return await query;
  }
  async getWinningProducts(limit) {
    let query = db.select().from(products).where(eq(products.winning, true)).orderBy(desc(products.id));
    if (limit) {
      query = query.limit(limit);
    }
    return await query;
  }
  // Product Variant methods
  async getProductVariantsByProductId(productId) {
    return await db.select().from(productVariants).where(eq(productVariants.productId, productId));
  }
  async createProductVariant(variant) {
    const [newVariant] = await db.insert(productVariants).values(variant).returning();
    return newVariant;
  }
  // Product Image methods
  async getProductImagesByProductId(productId) {
    return await db.select().from(productImages).where(eq(productImages.productId, productId)).orderBy(asc(productImages.position));
  }
  async createProductImage(image) {
    const [newImage] = await db.insert(productImages).values(image).returning();
    return newImage;
  }
  // Admin check
  async hasAdminUser() {
    const adminUser = await this.getUserByUsername("admin");
    return !!adminUser;
  }
  // Delete all products (dangerous operation)
  async deleteAllProducts() {
    await db.delete(productVariants);
    await db.delete(productImages);
    await db.delete(products);
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// server/auth.ts
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session2 from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  envDir: path.resolve(import.meta.dirname)
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/auth.ts
import "dotenv/config";
var scryptAsync = promisify(scrypt);
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
async function seedAdminUser() {
  const hasAdmin = await storage.hasAdminUser();
  if (!hasAdmin) {
    const hashedPassword = await hashPassword("admin");
    try {
      await storage.createUser({
        username: "admin",
        password: hashedPassword,
        email: "admin@example.com",
        fullName: "Admin User",
        isAdmin: true
      });
      log("Admin user created successfully", "auth");
    } catch (error) {
      log(`Error creating admin user: ${error}`, "auth");
    }
  }
}
function setupAuth(app2) {
  seedAdminUser().catch(
    (err) => log(`Error seeding admin user: ${err}`, "auth")
  );
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "baapstore-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  };
  app2.use(session2(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await comparePasswords(password, user.password)) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || void 0);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (req.isAuthenticated()) {
      res.json(req.user);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });
}

// server/routes/products.ts
import multer from "multer";
import fs3 from "fs";
import path3 from "path";

// server/utils/csvImporter.ts
import fs2 from "fs";
import { parse } from "csv-parse";
function slugify(text2) {
  return text2.toString().toLowerCase().trim().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/--+/g, "-");
}
async function importProductsFromCsv(filePath) {
  try {
    const fileContent = fs2.readFileSync(filePath, { encoding: "utf-8" });
    const records = await new Promise((resolve, reject) => {
      parse(
        fileContent,
        {
          columns: true,
          skip_empty_lines: true,
          trim: true,
          // Set relax_column_count to true to handle varying numbers of columns
          relax_column_count: true
        },
        (err, records2) => {
          if (err) return reject(err);
          resolve(records2);
        }
      );
    });
    if (records.length === 0) {
      return {
        success: false,
        message: "CSV file contains no valid product records"
      };
    }
    log(`Parsed ${records.length} records from CSV`, "csv-import");
    const productGroups = /* @__PURE__ */ new Map();
    records.forEach((record) => {
      if (!record.Handle) return;
      if (!productGroups.has(record.Handle)) {
        productGroups.set(record.Handle, {
          product: record,
          variants: [],
          images: []
        });
      }
      const group = productGroups.get(record.Handle);
      if (record !== group.product) {
        group.variants.push(record);
      }
      if (record["Image Src"]) {
        group.images.push(record);
      }
    });
    let productsImported = 0;
    let productsUpdated = 0;
    let variantsImported = 0;
    let imagesImported = 0;
    const categoryMap = /* @__PURE__ */ new Map();
    const categories = await storage.getProductCategories();
    categories.forEach((category) => {
      categoryMap.set(category.name, category.id);
    });
    for (const [handle, { product, variants, images }] of Array.from(
      productGroups.entries()
    )) {
      try {
        let categoryId = null;
        const categoryName = product["Product Category"] || product.Type || "General";
        if (categoryName) {
          if (categoryMap.has(categoryName)) {
            categoryId = categoryMap.get(categoryName);
          } else {
            const newCategory = await storage.createProductCategory({
              name: categoryName,
              slug: slugify(categoryName),
              description: `Products in the ${categoryName} category`,
              imageUrl: null
            });
            categoryId = newCategory.id;
            categoryMap.set(categoryName, categoryId);
          }
        }
        const productHandle = product.Handle || slugify(product.Title);
        const existingProduct = await storage.getProductByHandle(productHandle);
        let newProduct;
        newProduct = await storage.createProduct({
          handle: productHandle,
          title: product.Title,
          description: product["Body (HTML)"] || null,
          vendor: product.Vendor || null,
          productType: product.Type || null,
          tags: product.Tags || null,
          published: product.Published === "TRUE" || product.Published === "true",
          baseCost: product["Variant Price"] ? product["Variant Price"] : "0",
          basePrice: product["Variant Price"] ? product["Variant Price"] : "0",
          compareAtPrice: product["Variant Compare At Price"] || null,
          seoTitle: product["SEO Title"] || null,
          seoDescription: product["SEO Description"] || null,
          mainImageUrl: product["Image Src"] || null,
          sku: product["Variant SKU"] || null,
          categoryId
        });
        if (existingProduct) {
          productsUpdated++;
          log(`Replaced product: ${productHandle}`, "csv-import");
        } else {
          productsImported++;
          log(`Created new product: ${productHandle}`, "csv-import");
        }
        for (const variant of variants) {
          if (variant["Option1 Name"] && variant["Option1 Value"]) {
            const variantTitle = `${variant["Option1 Value"]}${variant["Option2 Value"] ? " / " + variant["Option2 Value"] : ""}${variant["Option3 Value"] ? " / " + variant["Option3 Value"] : ""}`;
            const newVariant = await storage.createProductVariant({
              productId: newProduct.id,
              sku: variant["Variant SKU"] || variantTitle,
              price: variant["Variant Price"] || "0",
              compareAtPrice: variant["Variant Compare At Price"] || null,
              option1Name: variant["Option1 Name"] || null,
              option1Value: variant["Option1 Value"] || null,
              option2Name: variant["Option2 Name"] || null,
              option2Value: variant["Option2 Value"] || null,
              option3Name: variant["Option3 Name"] || null,
              option3Value: variant["Option3 Value"] || null,
              inventoryQty: parseInt(variant["Variant Inventory Qty"]) || 0,
              imageUrl: variant["Image Src"] || null
            });
            variantsImported++;
          }
        }
        for (const image of images) {
          if (image["Image Src"]) {
            const newImage = await storage.createProductImage({
              productId: newProduct.id,
              url: image["Image Src"],
              position: parseInt(image["Image Position"]) || 1,
              altText: image["Image Alt Text"] || ""
            });
            imagesImported++;
          }
        }
      } catch (error) {
        log(`Error importing product ${handle}: ${error}`, "csv-import");
      }
    }
    return {
      success: true,
      message: `Successfully processed CSV: ${productsImported} new products, ${productsUpdated} updated products, ${variantsImported} variants, and ${imagesImported} images.`
    };
  } catch (error) {
    let errorMessage = "Unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
      log(`Error during CSV import: ${errorMessage}`, "csv-import");
      if (errorMessage.includes("Invalid Record Length")) {
        return {
          success: false,
          message: "CSV format error: The number of columns varies between rows. This has been fixed, please try again."
        };
      }
    } else {
      log(`Error during CSV import: ${error}`, "csv-import");
    }
    return { success: false, message: `Import failed: ${errorMessage}` };
  }
}

// server/routes/products.ts
import "dotenv/config";
var uploadsDir = path3.join(process.cwd(), "uploads");
if (!fs3.existsSync(uploadsDir)) {
  fs3.mkdirSync(uploadsDir, { recursive: true });
}
var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
function registerProductRoutes(app2) {
  app2.get("/api/product-categories", async (req, res) => {
    try {
      const categories = await storage.getProductCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: `Error fetching categories: ${error}` });
    }
  });
  app2.get("/api/dynamic-categories", async (req, res) => {
    try {
      console.log("Fetching dynamic categories...");
      const allCategories = await storage.getProductCategories();
      console.log("All categories:", allCategories);
      try {
        const dynamicCategories = await storage.getDynamicProductCategories();
        console.log("Dynamic categories:", dynamicCategories);
        if (dynamicCategories && dynamicCategories.length > 0) {
          return res.json(dynamicCategories);
        }
        console.log(
          "No dynamic categories found, falling back to all categories"
        );
        return res.json(allCategories);
      } catch (dynamicError) {
        console.error("Error getting dynamic categories:", dynamicError);
        return res.json(allCategories);
      }
    } catch (error) {
      console.error("Top-level error in dynamic categories endpoint:", error);
      res.status(500).json({ message: `Error fetching dynamic categories: ${error}` });
    }
  });
  app2.get(
    "/api/product-categories/:id",
    async (req, res) => {
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
  app2.get("/api/featured-products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 8;
      const featuredProducts = await storage.getFeaturedProducts(limit);
      res.json(featuredProducts);
    } catch (error) {
      res.status(500).json({ message: `Error fetching featured products: ${error}` });
    }
  });
  app2.get("/api/winning-products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 8;
      const winningProducts = await storage.getWinningProducts(limit);
      res.json(winningProducts);
    } catch (error) {
      res.status(500).json({ message: `Error fetching winning products: ${error}` });
    }
  });
  app2.get("/api/products", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const offset = parseInt(req.query.offset) || 0;
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : void 0;
      const search = req.query.search;
      const sortBy = req.query.sortBy;
      const sortOrder = req.query.sortOrder;
      const result = await storage.getProducts({
        limit,
        offset,
        categoryId,
        search,
        sortBy,
        sortOrder
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: `Error fetching products: ${error}` });
    }
  });
  app2.get("/api/products/:handle", async (req, res) => {
    try {
      const product = await storage.getProductByHandle(req.params.handle);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const variants = await storage.getProductVariantsByProductId(product.id);
      const images = await storage.getProductImagesByProductId(product.id);
      res.json({
        ...product,
        variants,
        images
      });
    } catch (error) {
      res.status(500).json({ message: `Error fetching product: ${error}` });
    }
  });
  app2.post(
    "/api/products/import",
    upload.single("csvFile"),
    async (req, res) => {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      try {
        const result = await importProductsFromCsv(req.file.path);
        fs3.unlink(req.file.path, (err) => {
          if (err) console.error(`Error deleting file: ${err}`);
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Error processing CSV: ${error}`
        });
      }
    }
  );
  app2.get(
    "/api/products/stats/summary",
    async (req, res) => {
      try {
        const products2 = await storage.getProducts();
        const categories = await storage.getProductCategories();
        const totalProducts = products2.total;
        const totalCategories = categories.length;
        res.json({
          totalProducts,
          totalCategories,
          recentlyAdded: products2.products.slice(0, 5)
          // Get 5 most recent products
        });
      } catch (error) {
        res.status(500).json({ message: `Error fetching product stats: ${error}` });
      }
    }
  );
}

// server/routes/admin.ts
import fs4 from "fs";
import path4 from "path";
import multer2 from "multer";
import "dotenv/config";
var uploadsDir2 = path4.join(process.cwd(), "uploads");
if (!fs4.existsSync(uploadsDir2)) {
  fs4.mkdirSync(uploadsDir2, { recursive: true });
}
var upload2 = multer2({
  storage: multer2.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir2);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 10 * 1024 * 1024
    // 10MB limit
  }
});
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Unauthorized, admin access required" });
}
function registerAdminRoutes(app2) {
  app2.get(
    "/api/admin/dashboard",
    isAdmin,
    async (req, res) => {
      try {
        const products2 = await storage.getProducts();
        const productCount = products2.total;
        const categories = await storage.getProductCategories();
        const categoryCount = categories.length;
        const leads2 = await storage.getAllLeads();
        const leadCount = leads2.length;
        res.json({
          productCount,
          categoryCount,
          leadCount,
          user: req.user
        });
      } catch (error) {
        res.status(500).json({ message: `Error fetching dashboard data: ${error}` });
      }
    }
  );
  app2.post(
    "/api/admin/products/import",
    isAdmin,
    upload2.single("csvFile"),
    async (req, res) => {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }
      try {
        const result = await importProductsFromCsv(req.file.path);
        fs4.unlink(req.file.path, (err) => {
          if (err) console.error(`Error deleting file: ${err}`);
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({
          success: false,
          message: `Error processing CSV: ${error}`
        });
      }
    }
  );
  app2.get(
    "/api/admin/products",
    isAdmin,
    async (req, res) => {
      try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : void 0;
        const search = req.query.search || void 0;
        const sortBy = req.query.sortBy || void 0;
        const sortOrder = req.query.sortOrder;
        let featured = void 0;
        if (req.query.featured === "true") featured = true;
        else if (req.query.featured === "false") featured = false;
        let winning = void 0;
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
          winning
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: `Error fetching products: ${error}` });
      }
    }
  );
  app2.get(
    "/api/admin/categories",
    isAdmin,
    async (req, res) => {
      try {
        const categories = await storage.getProductCategories();
        res.json(categories);
      } catch (error) {
        res.status(500).json({ message: `Error fetching categories: ${error}` });
      }
    }
  );
  app2.get(
    "/api/admin/products/:productId/variants",
    isAdmin,
    async (req, res) => {
      try {
        const productId = parseInt(req.params.productId);
        const variants = await storage.getProductVariantsByProductId(productId);
        res.json(variants);
      } catch (error) {
        res.status(500).json({ message: `Error fetching variants: ${error}` });
      }
    }
  );
  app2.get(
    "/api/admin/products/:productId/images",
    isAdmin,
    async (req, res) => {
      try {
        const productId = parseInt(req.params.productId);
        const images = await storage.getProductImagesByProductId(productId);
        res.json(images);
      } catch (error) {
        res.status(500).json({ message: `Error fetching images: ${error}` });
      }
    }
  );
  app2.post(
    "/api/admin/products/:productId/toggle-featured",
    isAdmin,
    async (req, res) => {
      try {
        const productId = parseInt(req.params.productId);
        const { featured } = req.body;
        if (typeof featured !== "boolean") {
          return res.status(400).json({ message: "Featured status must be a boolean value" });
        }
        const product = await storage.toggleProductFeatured(
          productId,
          featured
        );
        res.json(product);
      } catch (error) {
        res.status(500).json({
          message: `Error updating product featured status: ${error}`
        });
      }
    }
  );
  app2.post(
    "/api/admin/products/:productId/toggle-winning",
    isAdmin,
    async (req, res) => {
      try {
        const productId = parseInt(req.params.productId);
        const { winning } = req.body;
        if (typeof winning !== "boolean") {
          return res.status(400).json({ message: "Winning status must be a boolean value" });
        }
        const product = await storage.toggleProductWinning(productId, winning);
        res.json(product);
      } catch (error) {
        res.status(500).json({ message: `Error updating product winning status: ${error}` });
      }
    }
  );
  app2.post(
    "/api/admin/products/:productId/update-winning-metrics",
    isAdmin,
    async (req, res) => {
      try {
        const productId = parseInt(req.params.productId);
        const { profitMargin, salesPotential, lowCompetition } = req.body;
        if (profitMargin < 0 || profitMargin > 100 || salesPotential < 0 || salesPotential > 100 || lowCompetition < 0 || lowCompetition > 100) {
          return res.status(400).json({ message: "Metrics must be within 0-100 range" });
        }
        const product = await storage.updateProduct(productId, {
          profitMargin,
          salesPotential,
          lowCompetition
        });
        res.json(product);
      } catch (error) {
        res.status(500).json({
          message: `Error updating winning product metrics: ${error}`
        });
      }
    }
  );
  app2.delete(
    "/api/admin/products/delete-all",
    isAdmin,
    async (req, res) => {
      try {
        await storage.deleteAllProducts();
        res.json({ message: "All products deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: `Error deleting all products: ${error}` });
      }
    }
  );
}

// server/routes.ts
async function registerRoutes(app2) {
  setupAuth(app2);
  registerProductRoutes(app2);
  registerAdminRoutes(app2);
  app2.post("/api/leads", async (req, res) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      return res.status(201).json({
        message: "Lead created successfully",
        data: lead
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details
        });
      }
      return res.status(500).json({
        message: "Something went wrong"
      });
    }
  });
  app2.get("/api/leads", async (_req, res) => {
    try {
      const leads2 = await storage.getAllLeads();
      return res.json({
        data: leads2
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/index.ts
import cors from "cors";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(cors());
app.use((req, res, next) => {
  const start = Date.now();
  const path5 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path5.startsWith("/api")) {
      let logLine = `${req.method} ${path5} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5001 | parseInt(process.env.PORT);
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
