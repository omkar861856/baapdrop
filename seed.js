// seed.mjs
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import WebSocket from "ws";
import "dotenv/config";

// Setup database connection
const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function seedAdmin() {
  try {
    // Configure database connection
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    // Use WebSocket constructor for Neon
    neonConfig.webSocketConstructor = WebSocket;
    const pool = new Pool({ connectionString });

    // Insert admin user
    const hashedPassword = await hashPassword("admin");
    await pool.query(
      `
      INSERT INTO users (username, password, email, is_admin, full_name) 
      VALUES ('admin', $1, 'admin@example.com', true, 'admin user')
      ON CONFLICT (username) DO NOTHING
      `,
      [hashedPassword]
    );

    console.log("Admin user created successfully");
    await pool.end();
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

seedAdmin();
