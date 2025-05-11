
#!/bin/bash

# Set environment variables if they're not already set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set. Please set it before running this script."
    echo "Example: export DATABASE_URL=postgres://username:password@hostname:port/database"
    exit 1
fi

echo "🔍 Testing database connection..."
if npx drizzle-kit check:pg; then
    echo "✅ Database connection successful!"
else
    echo "❌ Database connection failed! Please check your DATABASE_URL."
    exit 1
fi

echo "🚀 Running database setup script..."
node scripts/db-setup.mjs

echo "🎉 All done! Your database should now be set up with the admin user (username: admin, password: admin)."
echo "⚠️ For production environments, please change the admin password immediately after deployment."