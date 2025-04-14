# BaapDrop - Dropshipping Business Platform

A professional dropshipping business platform designed to empower entrepreneurs with comprehensive business tools, interactive insights, and strategic resources for building successful online businesses.

![BaapDrop Platform](https://i.imgur.com/wZVznvE.png)

## 🚀 Features

- **Interactive Product Catalog**: Browse through 10,000+ high-quality, high-margin products.
- **Business Potential Calculator**: Visualize earnings with customizable parameters and different growth scenarios.
- **Success Metrics Dashboard**: Real-time statistics on product performance and profit margins with visual charts.
- **Winning Products Section**: Data-driven product recommendations based on market trends and profitability.
- **Detailed Product Pages**: In-depth information with profit calculators for each product.
- **Advanced Filtering**: Find perfect products by category, margin, price, and sales velocity.
- **WhatsApp Integration**: Real-time chat support for instant assistance to potential resellers.
- **Tiered Pricing Plans**: Bronze, Gold, and Diamond membership options with annual/monthly pricing.
- **Responsive Design**: Optimized for all devices from mobile to desktop.
- **Zero Investment Model**: Complete dropshipping solution with no inventory requirements.

## 🛠️ Technology Stack

- **Frontend**: React.js with TypeScript
- **UI Framework**: ShadCN UI with Tailwind CSS
- **Animations**: Framer Motion for smooth transitions and effects
- **State Management**: React Query + Context API
- **Charts & Visualization**: Recharts for dynamic data visualization
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based authentication
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation
- **API**: RESTful API design with proper error handling
- **Theme**: Custom-branded theme with consistent color variables (#E40145)

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
├── client/                         # Frontend React code
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── ui/                 # ShadCN UI components
│   │   │   ├── AnnouncementBar.tsx # Site-wide announcement banner
│   │   │   ├── Header.tsx          # Navigation header
│   │   │   ├── Hero.tsx            # Landing page hero section
│   │   │   ├── WinningProducts.tsx # Featured product carousel
│   │   │   ├── ProductCategories.tsx # Product categories showcase
│   │   │   ├── PotentialCalculator.tsx # Business calculator
│   │   │   ├── SuccessMetrics.tsx  # Performance metrics dashboard
│   │   │   ├── WhatsAppChat.tsx    # WhatsApp integration widget
│   │   │   ├── PricingPlans.tsx    # Tiered membership options
│   │   │   └── ...
│   │   ├── config/                 # Configuration files
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── lib/                    # Utilities and helpers
│   │   ├── pages/                  # Page components
│   │   │   ├── Home.tsx            # Landing page
│   │   │   ├── ProductsPage.tsx    # Product catalog page
│   │   │   └── not-found.tsx       # 404 page
│   │   ├── App.tsx                 # Main application component
│   │   └── main.tsx                # Application entry point
├── server/                         # Backend Express.js code
│   ├── db.ts                       # Database connection setup
│   ├── routes.ts                   # API routes
│   ├── storage.ts                  # Database access layer
│   ├── index.ts                    # Server entry point
│   └── vite.ts                     # Vite integration
├── shared/                         # Shared code between frontend and backend
│   └── schema.ts                   # Database schema and types
├── theme.json                      # Theme configuration (primary color: #E40145)
└── ...
```

## 🧪 Database Schema

The application uses a PostgreSQL database with Drizzle ORM with the following tables:

- **users**: Store user information for authentication
  - id: Primary key
  - username: Username for login
  - password: Hashed password
  - email: User's email address
  - createdAt: Account creation timestamp

- **leads**: Capture potential reseller information
  - id: Primary key
  - name: Full name
  - email: Contact email
  - phone: Phone number
  - message: Optional message/query
  - source: Where they found out about BaapDrop
  - createdAt: Lead capture timestamp

- **products**: (Coming soon) Complete product catalog
- **categories**: (Coming soon) Product categorization
- **orders**: (Coming soon) Reseller order management
- **stats**: (Coming soon) Performance metrics

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