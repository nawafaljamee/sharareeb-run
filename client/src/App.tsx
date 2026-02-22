import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { useStore } from "@/store/use-store";

// Components
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Checkout from "@/pages/Checkout";
import { About, Shipping, Contact } from "@/pages/StaticPages";

function Router() {
  return (
    <main className="flex-1">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/about" component={About} />
        <Route path="/shipping" component={Shipping} />
        <Route path="/contact" component={Contact} />
        
        {/* Simple placeholders for policy links */}
        <Route path="/privacy">
          <div className="container py-32 text-center text-muted-foreground">Privacy Policy Content</div>
        </Route>
        <Route path="/terms">
          <div className="container py-32 text-center text-muted-foreground">Terms of Service Content</div>
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

function App() {
  const { lang } = useStore();

  // Enforce document direction for Tailwind logical properties
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col font-sans">
          <Navbar />
          <Router />
          <Footer />
          <CartDrawer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
