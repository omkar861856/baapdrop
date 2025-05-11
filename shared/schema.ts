import {
  pgTable,
  text,
  serial,
  integer,
  numeric,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  fullName: text("full_name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  isAdmin: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Lead schema for capturing form submissions
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  businessType: text("business_type").notNull(),
  createdAt: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  businessType: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Product Categories
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductCategorySchema = createInsertSchema(
  productCategories
).pick({
  name: true,
  slug: true,
  description: true,
  imageUrl: true,
});

export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

// Products
export const products = pgTable("products", {
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
  profitMargin: integer("profit_margin").default(0), // 0-100%
  salesPotential: integer("sales_potential").default(0), // 0-100%
  lowCompetition: integer("low_competition").default(0), // 0-100%
  categoryId: integer("category_id").references(() => productCategories.id),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  baseCost: numeric("base_cost").default("0"),
  basePrice: numeric("base_price").default("0"),
  compareAtPrice: numeric("compare_at_price"),
  mainImageUrl: text("main_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).pick({
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
  mainImageUrl: true,
});

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Product Variants
export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductVariantSchema = createInsertSchema(
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
  imageUrl: true,
});

export type InsertProductVariant = z.infer<typeof insertProductVariantSchema>;
export type ProductVariant = typeof productVariants.$inferSelect;

// Product Images
export const productImages = pgTable("product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  url: text("url").notNull(),
  position: integer("position").default(0),
  altText: text("alt_text"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProductImageSchema = createInsertSchema(productImages).pick({
  productId: true,
  url: true,
  position: true,
  altText: true,
});

export type InsertProductImage = z.infer<typeof insertProductImageSchema>;
export type ProductImage = typeof productImages.$inferSelect;
