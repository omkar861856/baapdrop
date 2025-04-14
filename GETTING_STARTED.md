# Getting Started with BaapDrop

This document provides detailed instructions for setting up the BaapDrop project for local development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.x or higher
- **npm**: Version 8.x or higher
- **PostgreSQL**: Version 13.x or higher
- **Git**: Latest version recommended

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/baapdrop.git
cd baapdrop
```

## Step 2: Environment Configuration

1. Create a `.env` file by copying the example:

```bash
cp .env.example .env
```

2. Update the environment variables in the `.env` file with your local PostgreSQL credentials:

```
# Database Connection Settings
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/dropshipping
PGUSER=<username>
PGPASSWORD=<password>
PGDATABASE=dropshipping
PGHOST=localhost
PGPORT=5432

# Server Settings
PORT=5000
NODE_ENV=development

# Session Secret
SESSION_SECRET=your-session-secret-change-this-in-production
```

## Step 3: Database Setup

1. Create a PostgreSQL database for the project:

```bash
# Connect to PostgreSQL
psql -U postgres

# Create the database
CREATE DATABASE dropshipping;

# Exit PostgreSQL
\q
```

2. Apply the database schema:

```bash
npm run db:push
```

This will create all necessary tables in your database based on the schema defined in `shared/schema.ts`.

## Step 4: Install Dependencies

Install all required npm packages:

```bash
npm install
```

## Step 5: Start the Development Server

```bash
npm run dev
```

This will start both the backend Express server and the Vite development server for the frontend.

The application will be available at: http://localhost:5000

## Project Structure Overview

- `client/`: Contains all frontend React code
  - `src/components/`: Reusable UI components
  - `src/pages/`: Page components
  - `src/lib/`: Utilities and helpers
  - `src/hooks/`: Custom React hooks
- `server/`: Contains all backend Express code
  - `routes.ts`: API route definitions
  - `storage.ts`: Database operations
  - `index.ts`: Server entry point
- `shared/`: Shared code between frontend and backend
  - `schema.ts`: Database schema definitions and types

## Database Management

- **Push Schema Changes**: `npm run db:push`
- **View Database**: `npm run db:studio`
- **Generate Migration**: `npm run db:generate`

## Building for Production

To create a production build:

```bash
npm run build
npm start
```

This compiles the React frontend to static files and builds the backend server, then starts the production server.

## Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running on your machine
- Check that the credentials in your `.env` file are correct
- Verify that the database exists: `psql -U postgres -l`

### Port Already in Use

If port 5000 is already in use, you can change the port in your `.env` file:

```
PORT=3000
```

### Missing Node Modules

If you encounter errors about missing modules, try:

```bash
rm -rf node_modules
npm install
```

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Express Documentation](https://expressjs.com/)