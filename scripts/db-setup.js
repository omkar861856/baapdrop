import { exec } from "child_process";
import { Pool } from "@neondatabase/serverless";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { drizzle, eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { users } from "../shared/schema.js";
import "dotenv/config";

const scryptAsync = promisify(scrypt);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function setup() {
  console.log("🔧 Starting database setup...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  try {
    console.log("📊 Connecting to database...");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);

    console.log("🔄 Applying schema changes...");

    try {
      await migrate(db, { migrationsFolder: "./migrations" });
      console.log("✅ Schema migrations completed successfully");
    } catch (migrateError) {
      console.warn(
        "⚠️ Migration failed, attempting schema push instead:",
        migrateError.message
      );

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

    console.log("👤 Checking for admin user...");
    const adminUser = await db
      .select()
      .from(users)
      .where(eq(users.username, "admin"))
      .limit(1);

    if (!adminUser || adminUser.length === 0) {
      console.log("➕ Creating admin user...");
      const hashedPassword = await hashPassword("admin");

      await db.insert(users).values({
        username: "admin",
        password: hashedPassword,
        fullName: "Administrator",
        email: "admin@example.com",
        isAdmin: true,
        createdAt: new Date().toISOString(),
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

setup();
