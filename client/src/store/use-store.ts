import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '@shared/schema';
import { type Language, translations, type TranslationKey } from '../lib/i18n';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  cartItemId: string; // Unique ID for the cart item (product.id + color + size)
}

interface AppState {
  // Language State
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  
  // Cart State
  cartItems: CartItem[];
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Language
      lang: 'ar',
      setLang: (lang) => {
        set({ lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },
      t: (key) => {
        const lang = get().lang;
        return translations[lang][key] || key;
      },

      // Cart
      cartItems: [],
      isCartOpen: false,
      setCartOpen: (isCartOpen) => set({ isCartOpen }),
      
      addToCart: (newItem) => {
        const cartItemId = `${newItem.product.id}-${newItem.selectedColor}-${newItem.selectedSize}`;
        
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(i => i.cartItemId === cartItemId);
          
          if (existingItemIndex >= 0) {
            const newItems = [...state.cartItems];
            newItems[existingItemIndex].quantity += newItem.quantity;
            return { cartItems: newItems, isCartOpen: true };
          }
          
          return { 
            cartItems: [...state.cartItems, { ...newItem, cartItemId }],
            isCartOpen: true 
          };
        });
      },
      
      removeFromCart: (cartItemId) => set((state) => ({
        cartItems: state.cartItems.filter(i => i.cartItemId !== cartItemId)
      })),
      
      updateQuantity: (cartItemId, delta) => set((state) => ({
        cartItems: state.cartItems.map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
      })),
      
      clearCart: () => set({ cartItems: [] }),
      
      getCartTotal: () => {
        return get().cartItems.reduce((total, item) => total + (item.product.priceSar * item.quantity), 0);
      }
    }),
    {
      name: 'sharareeb-store',
      partialize: (state) => ({ lang: state.lang, cartItems: state.cartItems }),
    }
  )
);
