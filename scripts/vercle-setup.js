import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { exec } from "child_process";
import { promisify } from "util";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import "dotenv/config";
import { eq } from "drizzle-orm"; // Missing in original: required for `.where`

const execAsync = promisify(exec);
const scryptAsync = promisify(crypto.scrypt);

// Helper for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to hash passwords
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

// Main function for setting up the database
async function setupDatabase() {
  console.log("🚀 Starting Vercel deployment database setup...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Database setup cannot proceed.");
    process.exit(1);
  }

  console.log("🔌 Connecting to database...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    // Load schema
    console.log("🔍 Locating schema...");
    let schema;
    try {
      const schemaModule = await import(
        path.join(__dirname, "../dist/shared/schema.js")
      );
      schema = schemaModule;
      console.log("✅ Found schema in dist/shared/schema");
    } catch (e) {
      console.error("❌ Failed to load schema:", e);
      process.exit(1);
    }

    const db = drizzle(pool, { schema });

    // Push schema
    console.log("🔧 Pushing database schema...");
    try {
      const { stdout } = await execAsync("npx drizzle-kit push:pg");
      console.log("✅ Schema pushed successfully:", stdout);
    } catch (error) {
      console.error("❌ Failed to push schema:", error.message);
      process.exit(1);
    }

    // Check for admin user
    console.log("👤 Checking for admin user...");
    const [adminUser] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, "admin"))
      .limit(1);

    if (!adminUser) {
      console.log("➕ Creating admin user...");
      const hashedPassword = await hashPassword("admin");

      await db.insert(schema.users).values({
        username: "admin",
        password: hashedPassword,
        fullName: "Administrator",
        email: "admin@example.com",
        isAdmin: true,
        createdAt: new Date().toISOString(),
      });

      console.log("✅ Admin user created");
    } else {
      console.log("✅ Admin user already exists");
    }

    console.log("🎉 Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

setupDatabase();
