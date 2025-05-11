import { exec } from "child_process";
import { Pool } from "@neondatabase/serverless";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import * as schema from "../shared/schema.js";
import "dotenv/config";

const scryptAsync = promisify(scrypt);

// Function to hash passwords
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

// Main function
async function setup() {
  console.log("🔧 Starting database setup...");

  // Ensure DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  try {
    // 1. Setup database connection
    console.log("📊 Connecting to database...");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool, { schema });

    // 2. Push schema changes
    console.log("🔄 Applying schema changes...");

    try {
      // Try to use migrations if they exist
      await migrate(db, { migrationsFolder: "./migrations" });
      console.log("✅ Schema migrations completed successfully");
    } catch (migrateError) {
      console.warn(
        "⚠️ Migration failed, attempting schema push instead:",
        migrateError.message
      );

      // Fall back to drizzle-kit push if migrations fail
      await new Promise((resolve, reject) => {
        exec("npx drizzle-kit push:pg", (error, stdout, stderr) => {
          if (error) {
            console.error(`❌ Error executing drizzle-kit: ${error.message}`);
            reject(error);
            return;
          }
          console.log(stdout);
          console.log("✅ Schema push completed successfully");
          resolve();
        });
      });
    }

    // 3. Check if admin user exists
    console.log("👤 Checking for admin user...");
    const adminUser = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.username, "admin"))
      .limit(1);

    // 4. Create admin user if it doesn't exist
    if (!adminUser || adminUser.length === 0) {
      console.log("➕ Creating admin user...");
      const hashedPassword = await hashPassword("admin");

      await db.insert(schema.users).values({
        username: "admin",
        password: hashedPassword,
        full_name: "Administrator",
        email: "admin@example.com",
        is_admin: true,
        created_at: new Date().toISOString(),
      });

      console.log("✅ Admin user created successfully");
    } else {
      console.log("✅ Admin user already exists");
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
