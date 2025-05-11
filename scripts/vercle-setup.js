// This script is meant to be run as part of Vercel's build process
// It prepares the database schema and seeds the admin user

const { Pool } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-serverless");
const { migrate } = require("drizzle-orm/neon-serverless/migrator");
const { exec } = require("child_process");
const { promisify } = require("util");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
import "dotenv/config";

const execAsync = promisify(exec);
const scryptAsync = promisify(crypto.scrypt);

// Function to hash passwords (same as in auth.ts)
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

// Main function for setting up the database
async function setupDatabase() {
  console.log("🚀 Starting Vercel deployment database setup...");

  // Ensure we have a DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is not set. Database setup cannot proceed.");
    process.exit(1);
  }

  // Connect to the database
  console.log("🔌 Connecting to database...");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    // Locate the schema file
    console.log("🔍 Locating schema...");
    let schema;
    try {
      // Try to require the schema from the dist directory
      schema = require("../dist/shared/schema");
      console.log("✅ Found schema in dist/shared/schema");
    } catch (e) {
      console.error("❌ Failed to load schema:", e);
      process.exit(1);
    }

    // Initialize Drizzle with the schema
    const db = drizzle(pool, { schema });

    // Push database schema
    console.log("🔧 Pushing database schema...");
    try {
      await execAsync("npx drizzle-kit push:pg");
      console.log("✅ Schema pushed successfully");
    } catch (error) {
      console.error("❌ Failed to push schema:", error.message);
      process.exit(1);
    }

    // Check if admin user exists
    console.log("👤 Checking for admin user...");
    const [adminUser] = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, "admin"))
      .limit(1);

    // Create admin user if it doesn't exist
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

// Run the setup
setupDatabase();
