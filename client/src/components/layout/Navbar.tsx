import { Link } from "wouter";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/store/use-store";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { lang, setLang, t, cartItems, setCartOpen } = useStore();
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = () => setLang(lang === 'ar' ? 'en' : 'ar');
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { href: "/products", label: t('nav.products') },
    { href: "/about", label: t('nav.story') },
    { href: "/shipping", label: t('nav.shipping') },
    { href: "/contact", label: t('nav.contact') },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter shrink-0 hover:opacity-80 transition-opacity">
          شراريب ران<span className="text-primary/60">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleLang}
            className="rounded-full"
            aria-label="Toggle Language"
          >
            <Globe className="h-5 w-5" />
            <span className="sr-only">Toggle Language</span>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCartOpen(true)}
            className="relative rounded-full"
            aria-label="Open Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartItemsCount}
              </span>
            )}
          </Button>

          <Button className="hidden sm:inline-flex rounded-full px-6 font-semibold" asChild>
            <Link href="/products">{t('nav.orderNow')}</Link>
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden rounded-full"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full glass-card border-x-0 border-t-0 p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className="block px-4 py-3 text-lg font-medium hover:bg-muted rounded-xl transition-colors"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Button className="w-full rounded-xl py-6 text-lg mt-2" asChild onClick={closeMenu}>
            <Link href="/products">{t('nav.orderNow')}</Link>
          </Button>
        </div>
      )}
    </header>
  );
}
