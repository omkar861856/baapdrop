#!/bin/bash

# Script to help fix login issues with Vercel deployments
echo "🔧 Starting Vercel deployment login fix..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "❌ Vercel CLI not found! Please install it with:"
  echo "   npm install -g vercel"
  exit 1
fi

# Check if user is logged in to Vercel
echo "🔍 Checking Vercel CLI login status..."
if ! vercel whoami &> /dev/null; then
  echo "❌ You are not logged in to Vercel CLI"
  echo "Please run 'vercel login' and try again"
  exit 1
fi

echo "✅ Vercel CLI authenticated"

# Step 1: Run the session table setup in production
echo "🔄 Running session table setup in production..."
vercel --prod run node scripts/fix-vercel-session.js

# Step 2: Run the admin user fix in production
echo "🔄 Running admin user login fix in production..."
vercel --prod run node scripts/fix-vercel-login.js

# Step 3: Clear any existing sessions
echo "🧹 Clearing existing sessions from database..."
vercel --prod run "npx node -e \"const {Pool} = require('@neondatabase/serverless'); const pool = new Pool({connectionString: process.env.DATABASE_URL}); (async () => { await pool.query('DELETE FROM session'); console.log('✅ All sessions cleared'); await pool.end(); })().catch(e => console.error(e))\""

echo "🎉 Vercel login fix completed!"
echo ""
echo "You should now be able to log in with:"
echo "  Username: admin"
echo "  Password: admin"
echo ""
echo "⚠️ Important: Change this password immediately after successful login!"