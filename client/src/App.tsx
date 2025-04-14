import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppChat from "@/components/WhatsAppChat";
import { whatsappConfig } from "@/config/whatsapp";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductsPage from "@/pages/ProductsPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={ProductsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      <WhatsAppChat
        phoneNumber={whatsappConfig.phoneNumber}
        message={whatsappConfig.defaultMessage}
        position={whatsappConfig.position}
        delay={whatsappConfig.delay}
      />
    </QueryClientProvider>
  );
}

export default App;
