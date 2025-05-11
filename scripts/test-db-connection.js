// Simple script to test database connection
const { Pool } = require("@neondatabase/serverless");

async function testConnection() {
  console.log("🔍 Testing database connection...");

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is not set");
    console.log(
      "Please set it with: export DATABASE_URL=your_connection_string"
    );
    process.exit(1);
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    console.log("🔌 Connecting to database...");

    // Try a simple query
    const result = await pool.query("SELECT NOW() as time");
    console.log(
      `✅ Connection successful! Database time: ${result.rows[0].time}`
    );

    // Try to get the list of tables
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    if (tables.rows.length > 0) {
      console.log(`\n📋 Found ${tables.rows.length} tables in the database:`);
      tables.rows.forEach((row, i) => {
        console.log(`   ${i + 1}. ${row.table_name}`);
      });
    } else {
      console.log("⚠️ No tables found in the database.");
    }

    // Check if users table exists and if admin user exists
    if (tables.rows.some((row) => row.table_name === "users")) {
      const users = await pool.query('SELECT username, "isAdmin" FROM users');

      if (users.rows.length > 0) {
        console.log(`\n👤 Found ${users.rows.length} users in the database:`);
        users.rows.forEach((user, i) => {
          console.log(
            `   ${i + 1}. ${user.username}${user.isAdmin ? " (admin)" : ""}`
          );
        });
      } else {
        console.log("⚠️ No users found in the database.");
      }
    }
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    if (
      error.message.includes("ENOTFOUND") ||
      error.message.includes("ETIMEDOUT")
    ) {
      console.log("\n🔍 This looks like a connection issue. Check that:");
      console.log("  - Your DATABASE_URL is correct");
      console.log("  - Your database server is running");
      console.log(
        "  - Any firewalls or network policies allow this connection"
      );
    }
    if (error.message.includes("password authentication failed")) {
      console.log("\n🔍 This looks like an authentication issue. Check that:");
      console.log(
        "  - The username and password in your DATABASE_URL are correct"
      );
    }
    if (error.message.includes("no pg_hba.conf entry")) {
      console.log("\n🔍 This looks like a permissions issue. Check that:");
      console.log(
        "  - Your database is configured to accept connections from your IP address"
      );
    }
    process.exit(1);
  } finally {
    await pool.end();
  }
}

testConnection();
