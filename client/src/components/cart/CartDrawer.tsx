import { useStore } from "@/store/use-store";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";

export function CartDrawer() {
  const { isCartOpen, setCartOpen, cartItems, updateQuantity, removeFromCart, getCartTotal, lang, t } = useStore();
  const [, setLocation] = useLocation();

  const handleCheckout = () => {
    setCartOpen(false);
    setLocation("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setCartOpen}>
      <SheetContent 
        side={lang === 'ar' ? 'left' : 'right'} 
        className="w-full sm:max-w-md flex flex-col p-0 border-0 shadow-2xl"
      >
        <SheetHeader className="p-6 border-b text-start">
          <SheetTitle className="text-2xl font-bold flex items-center gap-3">
            <ShoppingBag className="w-6 h-6" />
            {t('cart.title')}
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
              <ShoppingBag className="w-20 h-20 mb-4 stroke-[1]" />
              <p className="text-xl font-medium">{t('cart.empty')}</p>
              <Button variant="outline" onClick={() => setCartOpen(false)} className="mt-4 rounded-full px-8">
                {t('cart.continueShopping')}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="flex gap-4 bg-muted/30 p-3 rounded-2xl border border-border/50">
                  <div className="h-24 w-24 rounded-xl overflow-hidden bg-muted shrink-0">
                    <img 
                      src={item.product.images[0]} 
                      alt={lang === 'ar' ? item.product.nameAr : item.product.nameEn} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm line-clamp-2">
                        {lang === 'ar' ? item.product.nameAr : item.product.nameEn}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full border border-border inline-block" style={{ backgroundColor: item.selectedColor }} />
                      </span>
                      <span>•</span>
                      <span className="font-medium px-1.5 bg-background rounded-md">{item.selectedSize}</span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center gap-3 bg-background rounded-full border border-border px-2 py-1">
                        <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-1 hover:text-primary transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-1 hover:text-primary transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-bold">
                        {item.product.priceSar * item.quantity} {t('product.sar')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t bg-card/50 backdrop-blur-md">
            <div className="flex items-center justify-between mb-6">
              <span className="text-lg font-medium text-muted-foreground">{t('cart.total')}</span>
              <span className="text-2xl font-black">{getCartTotal()} {t('product.sar')}</span>
            </div>
            <Button 
              className="w-full rounded-xl h-14 text-lg font-bold shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all"
              onClick={handleCheckout}
            >
              {t('cart.checkout')}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
