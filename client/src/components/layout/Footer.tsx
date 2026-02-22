import { Link } from "wouter";
import { useStore } from "@/store/use-store";
import { Instagram, Twitter, Facebook } from "lucide-react";

export function Footer() {
  const { t } = useStore();
  
  return (
    <footer className="bg-zinc-950 text-zinc-300 py-16 mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-black tracking-tighter text-white mb-6">
              شراريب ران.
            </h2>
            <p className="text-zinc-400 max-w-sm mb-6 leading-relaxed">
              {useStore.getState().lang === 'ar' 
                ? 'نقدم لك أفضل الجوارب المريحة والأنيقة التي تناسب أسلوب حياتك النشط اليومي.'
                : 'Providing you with the best comfortable and stylish socks that fit your active daily lifestyle.'}
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6">{t('nav.story')}</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-white transition-colors">{t('nav.story')}</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">{t('nav.products')}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold text-white mb-6">{t('nav.shipping')}</h3>
            <ul className="space-y-4">
              <li><Link href="/shipping" className="hover:text-white transition-colors">{t('nav.shipping')}</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Sharareeb Run. {t('footer.rights')}.</p>
          <div className="flex gap-6">
            <span>Riyadh, KSA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
