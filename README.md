# BaapDrop - Dropshipping Business Platform

A professional dropshipping business landing page that empowers potential resellers with interactive tools and comprehensive business insights.

![BaapDrop Platform](https://i.imgur.com/wZVznvE.png)

## 🚀 Features

- **Interactive Product Catalog**: Browse through thousands of high-quality, high-margin products.
- **Business Potential Calculator**: Visualize earnings with customizable parameters.
- **Success Metrics Dashboard**: Real-time statistics on product performance and profit margins.
- **Winning Products Section**: Data-driven product recommendations based on market trends.
- **Detailed Product Pages**: In-depth information with profit calculators for each product.
- **Advanced Filtering**: Find perfect products by category, margin, price, and more.
- **Responsive Design**: Optimized for all devices from mobile to desktop.

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **UI Components**: ShadCN UI with Tailwind CSS
- **State Management**: React Query + Context
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based auth
- **API**: RESTful API design with proper error handling

## 🔧 Installation

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL 13.x or higher
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/baapdrop.git
   cd baapdrop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your database credentials and other configuration

4. **Create database**
   ```bash
   # Using psql
   psql -U postgres
   CREATE DATABASE dropshipping;
   \q
   ```

5. **Run database migrations**
   ```bash
   npm run db:push
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## 📦 Project Structure

```
baapdrop/
├── client/               # Frontend React code
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utilities and helpers
│   │   ├── pages/        # Page components
│   │   └── ...
├── server/               # Backend Express.js code
│   ├── routes.ts         # API routes
│   ├── storage.ts        # Database access layer
│   ├── index.ts          # Server entry point
│   └── ...
├── shared/               # Shared code between frontend and backend
│   └── schema.ts         # Database schema and types
└── ...
```

## 🧪 Database Schema

The application uses a PostgreSQL database with the following core tables:

- **users**: Store user information for authentication
- **leads**: Capture potential reseller information
- **products**: (Coming soon) Product catalog information
- **categories**: (Coming soon) Product categorization

## 🚢 Deployment

### Production Build

```bash
# Build the frontend
npm run build

# Start the production server
npm start
```

### Deployment Platforms

This application can be easily deployed to:
- Heroku
- Vercel
- Netlify (Frontend) + Render (Backend)
- AWS, GCP, or Azure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For questions or support, please contact:
- Email: support@baapdrop.com
- Website: https://baapdrop.com