import { Pool } from "@neondatabase/serverless";
import { drizzle, eq } from "drizzle-orm/neon-serverless";
import { exec } from "child_process";
import { promisify } from "util";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import "dotenv/config";

const execAsync = promisify(exec);
const scryptAsync = promisify(crypto.scrypt);

// Function to hash passwords
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function setup() {
  console.log("🚀 Starting Vercel database setup...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    console.log("🔄 Pushing schema to database...");
    try {
      const result = await execAsync("npx drizzle-kit push:pg");
      console.log("✅ Schema push output:", result.stdout);
    } catch (error) {
      console.error("❌ Schema push failed:", error.message);
      if (error.stdout) console.log(error.stdout);
      if (error.stderr) console.log(error.stderr);
    }

    console.log("🔧 Creating tables if they don't exist...");

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

    console.log("👤 Checking for admin user...");
    const { rows: adminUsers } = await pool.query(
      "SELECT * FROM users WHERE username = $1 LIMIT 1",
      ["admin"]
    );

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

setup();
