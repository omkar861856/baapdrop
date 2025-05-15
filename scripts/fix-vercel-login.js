// Script to fix login issues in Vercel deployment
const { Pool } = require("@neondatabase/serverless");
const crypto = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(crypto.scrypt);

// Function to hash passwords (same as in auth.ts)
async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function fixAdminCredentials() {
  console.log("🔧 Starting login fix for Vercel deployment...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    console.log("🔍 Checking database connection...");
    const result = await pool.query("SELECT NOW() as time");
    console.log(
      `✅ Connected to database. Server time: ${result.rows[0].time}`
    );

    // 1. Verify the users table exists
    console.log("🔍 Checking users table...");
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'users'
      ) as exists
    `);

    if (!tableExists.rows[0].exists) {
      console.log("⚠️ Users table does not exist, creating it...");
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
      console.log("✅ Users table created");
    } else {
      console.log("✅ Users table exists");
    }

    // 2. Check for admin user
    console.log("🔍 Checking for admin user...");
    const { rows: adminUsers } = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      ["admin"]
    );

    if (adminUsers.length === 0) {
      console.log("⚠️ Admin user does not exist, creating it...");
      const hashedPassword = await hashPassword("admin");

      await pool.query(
        'INSERT INTO users (username, password, "fullName", email, "isAdmin") VALUES ($1, $2, $3, $4, $5)',
        ["admin", hashedPassword, "Administrator", "admin@example.com", true]
      );

      console.log("✅ Admin user created successfully");
    } else {
      console.log("✅ Admin user exists");

      // 3. Reset admin password for testing
      console.log('🔄 Resetting admin password to "admin" for testing...');
      const hashedPassword = await hashPassword("admin");

      await pool.query("UPDATE users SET password = $1 WHERE username = $2", [
        hashedPassword,
        "admin",
      ]);

      console.log("✅ Admin password reset successfully");
    }

    // 4. Ensure session table exists
    console.log("🔍 Checking session table...");
    const sessionTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'session'
      ) as exists
    `);

    if (!sessionTableExists.rows[0].exists) {
      console.log("⚠️ Session table does not exist, creating it...");
      await pool.query(`
        CREATE TABLE IF NOT EXISTS "session" (
          "sid" varchar NOT NULL COLLATE "default",
          "sess" json NOT NULL,
          "expire" timestamp(6) NOT NULL,
          CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
        )
      `);

      await pool.query(`
        CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire")
      `);

      console.log("✅ Session table created successfully");
    } else {
      console.log("✅ Session table exists");

      // Clean up old sessions
      console.log("🧹 Cleaning up expired sessions...");
      await pool.query(`DELETE FROM "session" WHERE "expire" < NOW()`);
      console.log("✅ Expired sessions removed");
    }

    console.log("🎉 Login fix completed successfully!");
    console.log("");
    console.log("You should now be able to log in with:");
    console.log("  Username: admin");
    console.log("  Password: admin");
    console.log("");
    console.log(
      "⚠️ Important: For production, change this password immediately after successful login!"
    );
  } catch (error) {
    console.error("❌ Error fixing login:", error);
  } finally {
    await pool.end();
  }
}

fixAdminCredentials();
