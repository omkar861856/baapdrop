// CommonJS version of database setup for Vercel deployment
const { Pool } = require("@neondatabase/serverless");
const { drizzle } = require("drizzle-orm/neon-serverless");
const { eq } = require("drizzle-orm");
const { exec } = require("child_process");
const { promisify } = require("util");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const execAsync = promisify(exec);
const scryptAsync = promisify(crypto.scrypt);

// Function to hash passwords (same as in auth.ts)
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

// Main function for database setup
async function setup() {
  console.log("🚀 Starting Vercel database setup...");

  // Ensure DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  try {
    // Setup database connection
    console.log("📊 Connecting to database...");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    // Run schema push with drizzle-kit
    console.log("🔄 Pushing schema to database...");
    try {
      const result = await execAsync("npx drizzle-kit push:pg");
      console.log("✅ Schema push output:", result.stdout);
    } catch (error) {
      console.error("❌ Schema push failed:", error.message);
      if (error.stdout) console.log(error.stdout);
      if (error.stderr) console.log(error.stderr);
    }

    // For Vercel, we need to manually create tables since we can't rely on the schema
    console.log("🔧 Creating tables if they don't exist...");

    // Create users table
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          email TEXT,
          "fullName" TEXT,
          "isAdmin" BOOLEAN DEFAULT false,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ Users table created or already exists");
    } catch (error) {
      console.error("❌ Failed to create users table:", error.message);
    }

    // Check if admin user exists
    console.log("👤 Checking for admin user...");
    const { rows: adminUsers } = await pool.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1",
      ["admin"]
    );

    // Create admin user if it doesn't exist
    if (!adminUsers || adminUsers.length === 0) {
      console.log("➕ Creating admin user...");
      const hashedPassword = await hashPassword("admin");

      await pool.query(
        'INSERT INTO users (username, password, "fullName", email, "isAdmin") VALUES ($1, $2, $3, $4, $5)',
        ["admin", hashedPassword, "Administrator", "admin@example.com", true]
      );

      console.log("✅ Admin user created successfully");
    } else {
      console.log("✅ Admin user already exists");
    }

    // Create basic product_categories table if it doesn't exist
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS product_categories (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT NOT NULL UNIQUE,
          description TEXT,
          "imageUrl" TEXT,
          "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log("✅ Product categories table created or already exists");
    } catch (error) {
      console.error(
        "❌ Failed to create product_categories table:",
        error.message
      );
    }

    console.log("🎉 Database setup completed successfully!");
    await pool.end();
  } catch (error) {
    console.error("❌ Error during database setup:", error);
    process.exit(1);
  }
}

// Run the setup function
setup();
