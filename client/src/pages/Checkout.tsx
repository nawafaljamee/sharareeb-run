import { useStore } from "@/store/use-store";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { ShieldCheck, MessageCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Checkout() {
  const { lang, t, cartItems, getCartTotal, clearCart } = useStore();
  const [, setLocation] = useLocation();
  const createOrder = useCreateOrder();
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  // Redirect to home if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      setLocation("/");
    }
  }, [cartItems, setLocation]);

  if (cartItems.length === 0) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Prepare data for API
    const orderItems = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
      color: item.selectedColor,
      size: item.selectedSize,
      price: item.product.priceSar
    }));
    
    const totalSar = getCartTotal();

    // 2. Submit to API (mutation)
    createOrder.mutate({
      customerName: formData.name,
      customerPhone: formData.phone,
      customerCity: formData.city,
      customerAddress: formData.address,
      customerNotes: formData.notes,
      items: orderItems,
      totalSar
    }, {
      onSuccess: () => {
        // 3. Format WhatsApp Message
        const nl = '%0A';
        let msg = lang === 'ar' 
          ? `مرحباً، أود إتمام طلبي الجديد:${nl}${nl}👤 الاسم: ${formData.name}${nl}📱 الجوال: ${formData.phone}${nl}🏙️ المدينة: ${formData.city}${nl}📍 العنوان: ${formData.address}${nl}`
          : `Hello, I'd like to complete my new order:${nl}${nl}👤 Name: ${formData.name}${nl}📱 Phone: ${formData.phone}${nl}🏙️ City: ${formData.city}${nl}📍 Address: ${formData.address}${nl}`;
          
        if (formData.notes) {
          msg += lang === 'ar' ? `📝 ملاحظات: ${formData.notes}${nl}` : `📝 Notes: ${formData.notes}${nl}`;
        }
        
        msg += `${nl}🛍️ الطلبات:${nl}`;
        
        cartItems.forEach(item => {
          const pName = lang === 'ar' ? item.product.nameAr : item.product.nameEn;
          msg += `- ${item.quantity}x ${pName} (المقاس: ${item.selectedSize}) - ${item.product.priceSar * item.quantity} ر.س${nl}`;
        });
        
        msg += `${nl}💰 الإجمالي: ${totalSar} ر.س`;
        
        // 4. Open WhatsApp
        window.open(`https://wa.me/966500000000?text=${msg}`, '_blank');
        
        // 5. Clear cart and redirect
        clearCart();
        toast({
          title: lang === 'ar' ? "تم استلام الطلب" : "Order Received",
          description: lang === 'ar' ? "جاري تحويلك لواتساب لإتمام الدفع." : "Redirecting to WhatsApp to complete payment.",
        });
        setLocation("/");
      }
    });
  };

  const BackIcon = lang === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        <div className="mb-8">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium mb-6">
            <BackIcon className="w-4 h-4" />
            {t('cart.continueShopping')}
          </button>
          <h1 className="text-3xl md:text-5xl font-black">{t('checkout.title')}</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Form */}
          <div className="flex-1 order-2 lg:order-1">
            <div className="bg-background rounded-3xl p-6 md:p-10 shadow-sm border border-border/50">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" />
                {t('checkout.details')}
              </h2>
              
              <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-bold">{t('checkout.name')} *</Label>
                    <Input 
                      id="name" 
                      required 
                      className="h-12 bg-muted/50 rounded-xl"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-bold">{t('checkout.phone')} *</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      required 
                      dir="ltr"
                      className="h-12 bg-muted/50 rounded-xl text-start"
                      placeholder="05XXXXXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm font-bold">{t('checkout.city')} *</Label>
                    <Input 
                      id="city" 
                      required 
                      className="h-12 bg-muted/50 rounded-xl"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-sm font-bold">{t('checkout.address')} *</Label>
                    <Input 
                      id="address" 
                      required 
                      className="h-12 bg-muted/50 rounded-xl"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-bold">{t('checkout.notes')}</Label>
                  <Textarea 
                    id="notes" 
                    className="min-h-[100px] bg-muted/50 rounded-xl resize-none"
                    value={formData.notes}
                    onChange={e => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-[400px] shrink-0 order-1 lg:order-2">
            <div className="bg-background rounded-3xl p-6 md:p-8 shadow-xl shadow-black/5 border border-border/50 sticky top-32">
              <h2 className="text-xl font-bold mb-6">{t('checkout.summary')}</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cartItems.map(item => (
                  <div key={item.cartItemId} className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-muted overflow-hidden shrink-0">
                      <img src={item.product.images[0]} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{lang === 'ar' ? item.product.nameAr : item.product.nameEn}</h4>
                      <p className="text-xs text-muted-foreground mt-1">الكمية: {item.quantity} | مقاس: {item.selectedSize}</p>
                    </div>
                    <div className="font-bold text-sm shrink-0 whitespace-nowrap">
                      {item.product.priceSar * item.quantity} {t('product.sar')}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border/50 pt-6 space-y-4">
                <div className="flex justify-between text-lg font-black">
                  <span>{t('cart.total')}</span>
                  <span className="text-primary">{getCartTotal()} {t('product.sar')}</span>
                </div>
                
                <p className="text-xs text-muted-foreground flex items-start gap-2 bg-muted/50 p-3 rounded-xl">
                  <MessageCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  {lang === 'ar' 
                    ? 'سيتم تحويلك إلى واتساب لإرسال تفاصيل الطلب وتأكيد عملية الدفع وطريقة التوصيل مباشرة مع فريقنا.' 
                    : 'You will be redirected to WhatsApp to send order details and confirm payment and delivery directly with our team.'}
                </p>

                <Button 
                  type="submit" 
                  form="checkout-form"
                  className="w-full h-14 rounded-xl text-lg font-bold shadow-lg bg-[#25D366] hover:bg-[#128C7E] text-white transition-all hover:-translate-y-1"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? t('checkout.processing') : t('checkout.submit')}
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
