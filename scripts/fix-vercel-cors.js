// Script to update index.ts with improved CORS configuration for Vercel
const fs = require("fs");
const path = require("path");

const serverIndexPath = path.join(__dirname, "..", "server", "index.ts");

// Check if server/index.ts file exists
if (!fs.existsSync(serverIndexPath)) {
  console.error("❌ Could not find server/index.ts at:", serverIndexPath);
  process.exit(1);
}

// Read current content
let indexContent = fs.readFileSync(serverIndexPath, "utf8");

// Check if CORS is already configured properly
if (
  indexContent.includes("app.use(cors({") &&
  indexContent.includes("credentials: true") &&
  indexContent.includes("origin:")
) {
  console.log("✅ CORS is already configured properly in server/index.ts");
} else {
  console.log("🔄 Updating CORS configuration in server/index.ts...");

  // Find the import section
  const corsImportExists =
    indexContent.includes("import cors from 'cors'") ||
    indexContent.includes('import cors from "cors"');

  if (!corsImportExists) {
    indexContent = indexContent.replace(
      /import express.*/,
      "import express, { Request, Response, NextFunction } from 'express';\nimport cors from 'cors';"
    );
  }

  // Find and replace the CORS middleware
  const corsMiddlewareRegex = /app\.use\(cors\(\)\);?/;

  if (indexContent.match(corsMiddlewareRegex)) {
    // Replace simple CORS with more detailed configuration
    indexContent = indexContent.replace(
      corsMiddlewareRegex,
      `app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://baapdrop.vercel.app',
        'https://*.vercel.app',
        process.env.VERCEL_URL ? \`https://\${process.env.VERCEL_URL}\` : undefined
      ].filter(Boolean)
    : 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`
    );

    console.log("✅ Updated CORS configuration");
  } else {
    // Add CORS middleware if it doesn't exist
    indexContent = indexContent.replace(
      /const app = express\(\);/,
      `const app = express();

// Configure CORS for Vercel deployment
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://baapdrop.vercel.app',
        'https://*.vercel.app',
        process.env.VERCEL_URL ? \`https://\${process.env.VERCEL_URL}\` : undefined
      ].filter(Boolean)
    : 'http://localhost:5000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`
    );

    console.log("✅ Added CORS configuration");
  }

  // Write the updated content back to the file
  fs.writeFileSync(serverIndexPath, indexContent);
  console.log("✅ server/index.ts updated successfully");
}

// Also add a Vercel-specific header handler
console.log("🔄 Adding proxy header handler for Vercel deployment...");

// Check if the proxy header handler already exists
if (
  indexContent.includes("x-forwarded-host") &&
  indexContent.includes("x-forwarded-proto")
) {
  console.log("✅ Proxy header handler already exists");
} else {
  // Add the proxy header handler before registering routes
  const routesRegex = /await registerRoutes\(app\)/;

  if (indexContent.match(routesRegex)) {
    indexContent = indexContent.replace(
      routesRegex,
      `// Handle Vercel proxy headers
app.use((req, res, next) => {
  // Trust the Vercel proxy
  if (req.headers['x-forwarded-host']) {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    req.headers.host = req.headers['x-forwarded-host'];
    
    // Ensure protocol is set correctly for session cookies
    if (req.headers.referer && !req.headers.referer.startsWith(protocol)) {
      req.headers.referer = \`\${protocol}://\${req.headers['x-forwarded-host']}\${req.url}\`;
    }
  }
  next();
});

await registerRoutes(app)`
    );

    // Write the updated content back to the file
    fs.writeFileSync(serverIndexPath, indexContent);
    console.log("✅ Added proxy header handler");
  } else {
    console.log("⚠️ Could not locate where to add proxy header handler");
  }
}

console.log("🎉 CORS and proxy header updates completed");
console.log("");
console.log(
  "These changes will help resolve CORS and cookie/session issues in production."
);
console.log(
  "Remember to rebuild and redeploy your application after making these changes."
);
