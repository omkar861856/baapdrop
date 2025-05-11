import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { lazy, Suspense } from "react";
import { whatsappConfig } from "@/config/whatsapp";
import { createAsyncComponent, preloadComponent } from "@/lib/asyncComponent";
import { deferExecution, prefetchPages } from "@/lib/resourceLoader";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { Spinner } from "@/components/ui/spinner";

// Minimal loading spinner for route transitions
const PageLoadingSpinner = () => (
  <div className="fixed bottom-4 right-4 bg-white/75 shadow-md rounded-full p-2 z-50">
    <Spinner size="md" className="text-primary" />
  </div>
);

// Lazy load components for better initial loading performance
const Home = createAsyncComponent(() => import("@/pages/Home"));
const ProductsPage = createAsyncComponent(() => import("@/pages/ProductsPage"));
const AllProductsPage = createAsyncComponent(
  () => import("./pages/AllProductsPage")
);
const WinningProductsPage = createAsyncComponent(
  () => import("./pages/WinningProductsPage")
);
const DemoPage = createAsyncComponent(() => import("@/pages/DemoPage"));
const CouponsPage = createAsyncComponent(() => import("./pages/CouponsPage"));
const InventoryPage = createAsyncComponent(
  () => import("./pages/InventoryPage")
);
const FAQPage = createAsyncComponent(() => import("./pages/FAQPage"));
const HandbookPage = createAsyncComponent(() => import("./pages/HandbookPage"));
const ComparisonPage = createAsyncComponent(
  () => import("./pages/ComparisonPage")
);
const AdminPage = createAsyncComponent(() => import("@/pages/AdminPage"));
const LoginPage = createAsyncComponent(() => import("@/pages/LoginPage"));
const NotFound = createAsyncComponent(() => import("@/pages/not-found"));
const WhatsAppChat = lazy(() => import("@/components/WhatsAppChat"));

// Preload important pages for faster navigation
deferExecution(() => {
  // Prefetch product page when users are likely to navigate there
  preloadComponent(() => import("@/pages/ProductsPage"));
  preloadComponent(() => import("./pages/WinningProductsPage"));
  preloadComponent(() => import("./pages/CouponsPage"));
  preloadComponent(() => import("./pages/FAQPage"));

  // Prefetch pages for faster navigation
  prefetchPages([
    "/products",
    "/winning-products",
    "/demo",
    "/coupons",
    "/inventory",
    "/faq",
    "/handbook",
    "/comparison",
  ]);
}, 2000);

// Lazy load components for better performance
const ProductDetail = createAsyncComponent(
  () => import("@/pages/ProductDetail")
);
const CategoryProducts = createAsyncComponent(
  () => import("@/pages/CategoryProducts")
);
const AllFeaturedProducts = createAsyncComponent(
  () => import("@/pages/AllFeaturedProducts")
);
const AllWinningProducts = createAsyncComponent(
  () => import("@/pages/AllWinningProducts")
);

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/all-products" component={AllProductsPage} />
      <Route path="/featured-products" component={AllFeaturedProducts} />
      <Route path="/winning-products" component={AllWinningProducts} />
      <Route
        path="/products/:handle"
        component={({ params }) => <ProductDetail handle={params.handle} />}
      />
      <Route
        path="/category/:categoryId"
        component={({ params }) => (
          <CategoryProducts categoryId={parseInt(params.categoryId, 10)} />
        )}
      />
      <Route path="/demo" component={DemoPage} />
      <Route path="/coupons" component={CouponsPage} />
      <Route path="/inventory" component={InventoryPage} />
      <Route path="/faq" component={FAQPage} />
      <Route path="/handbook" component={HandbookPage} />
      <Route path="/comparison" component={ComparisonPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/login" component={LoginPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Check if we're in development mode for conditional features
  const isDev = import.meta.env.DEV;

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      {/* <Suspense fallback={<PageLoadingSpinner />}>
        <WhatsAppChat
          phoneNumber={whatsappConfig.phoneNumber}
          message={whatsappConfig.defaultMessage}
          position={whatsappConfig.position}
          delay={whatsappConfig.delay}
        />
      </Suspense> */}

      {/* Performance Monitor - only in development mode */}
      {isDev && <PerformanceMonitor />}
    </QueryClientProvider>
  );
}

export default App;
