import { useStore } from "@/store/use-store";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Products() {
  const { t, lang } = useStore();
  const { data: products, isLoading } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products?.filter(p => {
    const name = lang === 'ar' ? p.nameAr : p.nameEn;
    return name.toLowerCase().includes(search.toLowerCase());
  }) || [];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">{t('nav.products')}</h1>
            <p className="text-muted-foreground text-lg">
              {lang === 'ar' ? 'اكتشف مجموعتنا الكاملة من الجوارب المميزة' : 'Discover our full collection of premium socks'}
            </p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-72">
              <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder={lang === 'ar' ? 'ابحث عن منتج...' : 'Search products...'}
                className="ps-11 h-12 rounded-full bg-background border-border/50 shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full shrink-0 bg-background shadow-sm">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />)}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-32 bg-background rounded-3xl border border-border/50">
            <h3 className="text-2xl font-bold text-muted-foreground mb-2">لا توجد نتائج</h3>
            <p>حاول استخدام كلمات بحث مختلفة.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
}
