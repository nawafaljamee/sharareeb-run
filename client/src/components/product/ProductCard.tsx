import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { useStore } from "@/store/use-store";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { lang, t, addToCart } = useStore();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'OS');
  const [isHovered, setIsHovered] = useState(false);

  const name = lang === 'ar' ? product.nameAr : product.nameEn;
  const inStock = product.stock > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      product,
      quantity: 1,
      selectedColor,
      selectedSize
    });
    
    toast({
      title: "تمت الإضافة للسلة",
      description: `${name} - ${selectedSize}`,
      duration: 3000,
    });
  };

  return (
    <div 
      className="group flex flex-col relative rounded-3xl bg-card border border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-black/5 hover:border-primary/20 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">View {name}</span>
      </Link>

      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-muted overflow-hidden">
        {product.isFeatured && (
          <span className="absolute top-4 start-4 z-20 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            Featured
          </span>
        )}
        <img 
          src={product.images[0]} 
          alt={name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        
        {/* Quick Add Overlay */}
        <div className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 z-20 flex justify-center ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'}`}>
           <Button 
             className="w-full rounded-full shadow-lg font-bold bg-white text-black hover:bg-zinc-200"
             disabled={!inStock}
             onClick={handleAddToCart}
           >
             <ShoppingBag className="w-4 h-4 me-2" />
             {inStock ? t('product.addToCart') : t('product.outOfStock')}
           </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 z-20 bg-card pointer-events-none relative">
        <div className="flex justify-between items-start gap-4 mb-2">
          <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground">
            {name}
          </h3>
          <span className="font-black text-lg text-primary whitespace-nowrap">
            {product.priceSar} {t('product.sar')}
          </span>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex gap-1.5 pointer-events-auto">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={(e) => { e.preventDefault(); setSelectedColor(color); }}
                className={`w-5 h-5 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary scale-110' : 'border-transparent shadow-sm'}`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          <div className="text-sm font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            {product.sizes.length} {t('product.size')}s
          </div>
        </div>
      </div>
    </div>
  );
}
