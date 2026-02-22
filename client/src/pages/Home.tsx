import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/use-store";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowLeft, ArrowRight, ShieldCheck, Zap, Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Home() {
  const { t, lang } = useStore();
  const { data: products, isLoading } = useProducts();

  const featuredProducts = products?.filter(p => p.isFeatured).slice(0, 4) || [];
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background z-10" />
          {/* landing page hero fashion aesthetic minimal */}
          <img 
            src="https://pixabay.com/get/g46eb5b5db5e0d62090e1d5bf4413c6ff37c91949adc22b2390b7d1319948c6c55e79da1213aa49e532122ff2c3603627cbfe24088b787de4068cbd6562a3de6e_1280.jpg" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-foreground mb-6 uppercase">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-2xl text-muted-foreground mb-10 max-w-xl leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-xl shadow-primary/20 hover:-translate-y-1 transition-transform" asChild>
                <Link href="/products">{t('hero.browse')}</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg font-bold border-2 hover:bg-muted transition-colors" asChild>
                <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer">
                  {t('hero.whatsapp')}
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-3">{t('section.featured')}</h2>
              <div className="h-1.5 w-20 bg-primary rounded-full" />
            </div>
            <Link href="/products" className="hidden sm:flex items-center gap-2 font-bold text-muted-foreground hover:text-primary transition-colors">
              {t('misc.allProducts')} <ArrowIcon className="w-5 h-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map(i => <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-10 sm:hidden flex justify-center">
            <Button variant="outline" className="rounded-full w-full max-w-sm" asChild>
              <Link href="/products">{t('misc.allProducts')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase">{t('section.whyUs')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('content.why1.title')}</h3>
              <p className="text-muted-foreground">{t('content.why1.desc')}</p>
            </div>
            <div className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('content.why2.title')}</h3>
              <p className="text-muted-foreground">{t('content.why2.desc')}</p>
            </div>
            <div className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('content.why3.title')}</h3>
              <p className="text-muted-foreground">{t('content.why3.desc')}</p>
            </div>
            <div className="bg-background p-8 rounded-3xl shadow-sm border border-border/50 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{t('content.why4.title')}</h3>
              <p className="text-muted-foreground">{t('content.why4.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <MessageCircle className="w-12 h-12 mx-auto text-primary/40 mb-4" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">{t('section.faq')}</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-2xl px-6 data-[state=open]:bg-muted/50 data-[state=open]:border-primary/20 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                {lang === 'ar' ? 'كم يستغرق التوصيل؟' : 'How long does delivery take?'}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                {lang === 'ar' 
                  ? 'يستغرق التوصيل داخل الرياض 24 ساعة، ولباقي مدن المملكة 2-3 أيام عمل.' 
                  : 'Delivery takes 24 hours within Riyadh, and 2-3 working days for other cities.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-2xl px-6 data-[state=open]:bg-muted/50 data-[state=open]:border-primary/20 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                {lang === 'ar' ? 'هل يمكنني استرجاع المنتجات؟' : 'Can I return products?'}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                {lang === 'ar' 
                  ? 'نعم، لأسباب صحية نقبل الاسترجاع فقط إذا كان المنتج في تغليفه الأصلي ولم يتم فتحه، وذلك خلال 7 أيام من الاستلام.' 
                  : 'Yes, for hygiene reasons we accept returns only if the product is in its original packaging and unopened, within 7 days of receipt.'}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-2xl px-6 data-[state=open]:bg-muted/50 data-[state=open]:border-primary/20 transition-colors">
              <AccordionTrigger className="text-lg font-bold hover:no-underline py-6">
                {lang === 'ar' ? 'كيف أختار المقاس المناسب؟' : 'How do I choose the right size?'}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base pb-6">
                {lang === 'ar' 
                  ? 'جواربنا تمتاز بمرونة عالية. المقاس S يناسب (35-38)، M يناسب (39-42)، و L يناسب (43-46).' 
                  : 'Our socks have high elasticity. Size S fits (35-38), M fits (39-42), and L fits (43-46).'}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </div>
  );
}
