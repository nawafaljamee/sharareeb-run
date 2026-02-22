export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Nav
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.story': 'قصتنا',
    'nav.shipping': 'الشحن والاسترجاع',
    'nav.contact': 'تواصل معنا',
    'nav.cart': 'السلة',
    'nav.orderNow': 'اطلب الآن',
    
    // Hero
    'hero.title': 'شراريب تريحك… وتكمل ستايلك',
    'hero.subtitle': 'اكتشف مجموعتنا الجديدة من الجوارب المريحة والأنيقة المصممة خصيصاً لتناسب يومك الطويل.',
    'hero.browse': 'تصفح المنتجات',
    'hero.whatsapp': 'اطلب عبر واتساب',
    
    // Sections
    'section.featured': 'منتجات مختارة',
    'section.whyUs': 'ليش تختار شراريب ران؟',
    'section.bestSellers': 'الأكثر مبيعاً',
    'section.reviews': 'آراء عملائنا',
    'section.faq': 'الأسئلة الشائعة',
    
    // Product
    'product.addToCart': 'أضف للسلة',
    'product.sar': 'ر.س',
    'product.size': 'المقاس',
    'product.color': 'اللون',
    'product.outOfStock': 'نفذت الكمية',
    
    // Cart
    'cart.title': 'سلة المشتريات',
    'cart.empty': 'سلتك فارغة حالياً',
    'cart.checkout': 'إتمام الطلب',
    'cart.total': 'المجموع:',
    'cart.continueShopping': 'متابعة التسوق',
    
    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.summary': 'ملخص الطلب',
    'checkout.details': 'تفاصيل التوصيل',
    'checkout.name': 'الاسم الكامل',
    'checkout.phone': 'رقم الجوال',
    'checkout.city': 'المدينة',
    'checkout.address': 'العنوان بالتفصيل',
    'checkout.notes': 'ملاحظات إضافية (اختياري)',
    'checkout.submit': 'تأكيد الطلب عبر واتساب',
    'checkout.processing': 'جاري المعالجة...',
    
    // Misc
    'misc.allProducts': 'عرض كل المنتجات',
    'misc.viewDetails': 'عرض التفاصيل',
    'footer.rights': 'جميع الحقوق محفوظة',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.story': 'Our Story',
    'nav.shipping': 'Shipping & Returns',
    'nav.contact': 'Contact Us',
    'nav.cart': 'Cart',
    'nav.orderNow': 'Order Now',
    
    // Hero
    'hero.title': 'Socks that feel good and look better',
    'hero.subtitle': 'Discover our new collection of comfortable and stylish socks designed specifically for your long days.',
    'hero.browse': 'Browse Products',
    'hero.whatsapp': 'Order via WhatsApp',
    
    // Sections
    'section.featured': 'Featured Products',
    'section.whyUs': 'Why choose Sharareeb Run?',
    'section.bestSellers': 'Best Sellers',
    'section.reviews': 'Customer Reviews',
    'section.faq': 'Frequently Asked Questions',
    
    // Product
    'product.addToCart': 'Add to Cart',
    'product.sar': 'SAR',
    'product.size': 'Size',
    'product.color': 'Color',
    'product.outOfStock': 'Out of Stock',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is currently empty',
    'cart.checkout': 'Checkout',
    'cart.total': 'Total:',
    'cart.continueShopping': 'Continue Shopping',
    
    // Checkout
    'checkout.title': 'Complete Your Order',
    'checkout.summary': 'Order Summary',
    'checkout.details': 'Delivery Details',
    'checkout.name': 'Full Name',
    'checkout.phone': 'Phone Number',
    'checkout.city': 'City',
    'checkout.address': 'Detailed Address',
    'checkout.notes': 'Additional Notes (Optional)',
    'checkout.submit': 'Confirm via WhatsApp',
    'checkout.processing': 'Processing...',
    
    // Misc
    'misc.allProducts': 'View All Products',
    'misc.viewDetails': 'View Details',
    'footer.rights': 'All rights reserved',
  }
};

export type TranslationKey = keyof typeof translations.en;
