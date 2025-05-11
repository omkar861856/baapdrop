import {
  users,
  type User,
  type InsertUser,
  leads,
  type Lead,
  type InsertLead,
  products,
  type Product,
  type InsertProduct,
  productCategories,
  type ProductCategory,
  type InsertProductCategory,
  productVariants,
  type ProductVariant,
  type InsertProductVariant,
  productImages,
  type ProductImage,
  type InsertProductImage,
} from "@shared/schema";
import { db } from "./db";
import {
  eq,
  sql,
  desc,
  asc,
  and,
  or,
  like,
  isNotNull,
  inArray,
} from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";
import createMemoryStore from "memorystore";

// Modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Lead capturing methods
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;

  // Product Category methods
  getProductCategories(): Promise<ProductCategory[]>;
  getDynamicProductCategories(): Promise<ProductCategory[]>;
  getProductCategoryBySlug(slug: string): Promise<ProductCategory | undefined>;
  createProductCategory(
    category: InsertProductCategory
  ): Promise<ProductCategory>;

  // Product methods
  getProducts(options?: {
    limit?: number;
    offset?: number;
    categoryId?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    featured?: boolean;
    winning?: boolean;
  }): Promise<{ products: Product[]; total: number }>;
  getProductByHandle(handle: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product>;
  toggleProductFeatured(id: number, featured: boolean): Promise<Product>;
  toggleProductWinning(id: number, winning: boolean): Promise<Product>;
  getFeaturedProducts(limit?: number): Promise<Product[]>;
  getWinningProducts(limit?: number): Promise<Product[]>;
  deleteAllProducts(): Promise<void>;

  // Product Variant methods
  getProductVariantsByProductId(productId: number): Promise<ProductVariant[]>;
  createProductVariant(variant: InsertProductVariant): Promise<ProductVariant>;

  // Product Image methods
  getProductImagesByProductId(productId: number): Promise<ProductImage[]>;
  createProductImage(image: InsertProductImage): Promise<ProductImage>;

  // Check if admin exists
  hasAdminUser(): Promise<boolean>;

  // Session store for authentication
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  // Session store for authentication
  sessionStore: session.Store;

  constructor() {
    // Create PostgreSQL session store
    const PostgresStore = connectPg(session);
    this.sessionStore = new PostgresStore({
      pool,
      createTableIfMissing: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Lead management methods
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values({
        ...insertLead,
        createdAt: new Date().toISOString(),
      })
      .returning();
    return lead;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  // Product Category methods
  async getProductCategories(): Promise<ProductCategory[]> {
    return await db.select().from(productCategories);
  }

  // Get only categories that have products and include the first product image for each
  async getDynamicProductCategories(): Promise<ProductCategory[]> {
    try {
      console.log("Starting getDynamicProductCategories method");

      // Get all categories first
      const allCategories = await this.getProductCategories();
      console.log("All categories:", JSON.stringify(allCategories));

      // Get products to find which categories actually have products
      console.log("Fetching products for category analysis");
      const productsResult = await this.getProducts();
      console.log(`Found ${productsResult.products.length} products`);

      // Track used category IDs and first product image per category
      const usedCategoryIds = new Set<number>();
      const categoryFirstProductImage: Record<number, string> = {};

      // First pass to collect category IDs and find first product image
      for (const product of productsResult.products) {
        const categoryId = product.categoryId;
        console.log(
          `Product ${product.id}: categoryId = ${categoryId}, image = ${product.mainImageUrl}`
        );

        if (categoryId !== null) {
          usedCategoryIds.add(categoryId);

          // Store the first product image we find for each category
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

      // Filter categories to only include those with products
      const dynamicCategories = allCategories
        .filter((category) => {
          const hasProducts = usedCategoryIds.has(category.id);
          console.log(
            `Category ${category.id} (${category.name}): has products = ${hasProducts}`
          );
          return hasProducts;
        })
        .map((category) => {
          // Add the first product image as the category image if available
          if (categoryFirstProductImage[category.id]) {
            return {
              ...category,
              imageUrl: categoryFirstProductImage[category.id],
            };
          }
          return category;
        });

      console.log(
        "Dynamic categories before sorting:",
        JSON.stringify(dynamicCategories)
      );

      // Sort alphabetically by name
      const sortedCategories = dynamicCategories.sort((a, b) =>
        a.name.localeCompare(b.name)
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

  async getProductCategoryBySlug(
    slug: string
  ): Promise<ProductCategory | undefined> {
    const [category] = await db
      .select()
      .from(productCategories)
      .where(eq(productCategories.slug, slug));
    return category || undefined;
  }

  async createProductCategory(
    category: InsertProductCategory
  ): Promise<ProductCategory> {
    const [newCategory] = await db
      .insert(productCategories)
      .values(category)
      .returning();
    return newCategory;
  }

  // Product methods
  async getProducts(options?: {
    limit?: number;
    offset?: number;
    categoryId?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    featured?: boolean;
    winning?: boolean;
  }): Promise<{ products: Product[]; total: number }> {
    const limit = options?.limit || 50;
    const offset = options?.offset || 0;

    let query = db.select().from(products);
    let countQuery = db.select({ count: sql`count(*)` }).from(products);

    // Apply filters

    // Apply category filter
    if (options?.categoryId) {
      query = query.where(eq(products.categoryId, options.categoryId));
      countQuery = countQuery.where(
        eq(products.categoryId, options.categoryId)
      );
    }

    // Apply featured filter if specified
    if (options?.featured !== undefined) {
      query = query.where(eq(products.featured, options.featured));
      countQuery = countQuery.where(eq(products.featured, options.featured));
    }

    // Apply winning filter if specified
    if (options?.winning !== undefined) {
      query = query.where(eq(products.winning, options.winning));
      countQuery = countQuery.where(eq(products.winning, options.winning));
    }

    // Apply search filter
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

    // Apply sorting
    if (options?.sortBy) {
      const sortColumn = options.sortBy as keyof typeof products;
      if (sortColumn in products) {
        query = query.orderBy(
          options.sortOrder === "desc"
            ? desc(products[sortColumn])
            : asc(products[sortColumn])
        );
      }
    } else {
      // Default sort by id desc
      query = query.orderBy(desc(products.id));
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);

    // Execute queries
    const productsList = await query;
    const [{ count }] = await countQuery;

    return {
      products: productsList,
      total: Number(count),
    };
  }

  async getProductByHandle(handle: string): Promise<Product | undefined> {
    const [product] = await db
      .select()
      .from(products)
      .where(eq(products.handle, handle));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(
    id: number,
    product: Partial<InsertProduct>
  ): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async toggleProductFeatured(id: number, featured: boolean): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({ featured })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async toggleProductWinning(id: number, winning: boolean): Promise<Product> {
    const [updatedProduct] = await db
      .update(products)
      .set({ winning })
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async getFeaturedProducts(limit?: number): Promise<Product[]> {
    let query = db
      .select()
      .from(products)
      .where(eq(products.featured, true))
      .orderBy(desc(products.id));

    if (limit) {
      query = query.limit(limit);
    }

    return await query;
  }

  async getWinningProducts(limit?: number): Promise<Product[]> {
    let query = db
      .select()
      .from(products)
      .where(eq(products.winning, true))
      .orderBy(desc(products.id));

    if (limit) {
      query = query.limit(limit);
    }

    return await query;
  }

  // Product Variant methods
  async getProductVariantsByProductId(
    productId: number
  ): Promise<ProductVariant[]> {
    return await db
      .select()
      .from(productVariants)
      .where(eq(productVariants.productId, productId));
  }

  async createProductVariant(
    variant: InsertProductVariant
  ): Promise<ProductVariant> {
    const [newVariant] = await db
      .insert(productVariants)
      .values(variant)
      .returning();
    return newVariant;
  }

  // Product Image methods
  async getProductImagesByProductId(
    productId: number
  ): Promise<ProductImage[]> {
    return await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId))
      .orderBy(asc(productImages.position));
  }

  async createProductImage(image: InsertProductImage): Promise<ProductImage> {
    const [newImage] = await db.insert(productImages).values(image).returning();
    return newImage;
  }

  // Admin check
  async hasAdminUser(): Promise<boolean> {
    const adminUser = await this.getUserByUsername("admin");
    return !!adminUser;
  }

  // Delete all products (dangerous operation)
  async deleteAllProducts(): Promise<void> {
    // First, delete all product variants and images associated with products
    await db.delete(productVariants);
    await db.delete(productImages);

    // Then delete the products themselves
    await db.delete(products);
  }
}

export const storage = new DatabaseStorage();
