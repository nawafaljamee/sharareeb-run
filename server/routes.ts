import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { db } from "./db";
import { products } from "@shared/schema";

async function seedDatabase() {
  const existing = await storage.getProducts();
  if (existing.length === 0) {
    const sampleProducts = [
      {
        nameAr: "جوارب الجري الأساسية",
        nameEn: "Essential Running Socks",
        priceSar: 45,
        colors: ["#000000", "#FFFFFF", "#808080"],
        sizes: ["S", "M", "L"],
        images: ["https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=600&auto=format&fit=crop"],
        descriptionAr: "جوارب مصممة خصيصاً لتوفير أقصى درجات الراحة والدعم أثناء الجري.",
        descriptionEn: "Socks designed specifically to provide maximum comfort and support during running.",
        stock: 100,
        isFeatured: true,
        isBestSeller: true
      },
      {
        nameAr: "جوارب رياضية ملونة",
        nameEn: "Colorful Sports Socks",
        priceSar: 55,
        colors: ["#FF0000", "#00FF00", "#0000FF"],
        sizes: ["M", "L"],
        images: ["https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=600&auto=format&fit=crop"],
        descriptionAr: "أضف لمسة من الحيوية إلى تمرينك مع هذه الجوارب الملونة.",
        descriptionEn: "Add a touch of vibrancy to your workout with these colorful socks.",
        stock: 50,
        isFeatured: true,
        isBestSeller: false
      },
      {
        nameAr: "جوارب مريحة يومية",
        nameEn: "Everyday Comfort Socks",
        priceSar: 35,
        colors: ["#FFFFFF", "#F5F5DC"],
        sizes: ["S", "M", "L", "XL"],
        images: ["https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600&auto=format&fit=crop"],
        descriptionAr: "مثالية للاستخدام اليومي بفضل خاماتها القطنية الناعمة.",
        descriptionEn: "Perfect for everyday use thanks to its soft cotton materials.",
        stock: 200,
        isFeatured: false,
        isBestSeller: true
      },
      {
        nameAr: "جوارب شتوية دافئة",
        nameEn: "Warm Winter Socks",
        priceSar: 65,
        colors: ["#8B4513", "#A52A2A", "#000000"],
        sizes: ["M", "L", "XL"],
        images: ["https://images.unsplash.com/photo-1549889709-6bc8abcfbd20?q=80&w=600&auto=format&fit=crop"],
        descriptionAr: "حافظ على دفء قدميك في الأيام الباردة.",
        descriptionEn: "Keep your feet warm on cold days.",
        stock: 30,
        isFeatured: false,
        isBestSeller: false
      },
      {
        nameAr: "جوارب خفية (غير مرئية)",
        nameEn: "Invisible Liner Socks",
        priceSar: 40,
        colors: ["#FFFFFF", "#000000", "#FFE4C4"],
        sizes: ["S", "M", "L"],
        images: ["https://images.unsplash.com/photo-1596760634626-d6eb4d79124a?q=80&w=600&auto=format&fit=crop"],
        descriptionAr: "تصميم خفي تماماً يناسب جميع الأحذية الصيفية والرياضية.",
        descriptionEn: "Completely invisible design suitable for all summer and sports shoes.",
        stock: 120,
        isFeatured: true,
        isBestSeller: true
      },
      {
        nameAr: "جوارب ضغط احترافية",
        nameEn: "Pro Compression Socks",
        priceSar: 85,
        colors: ["#000080", "#000000"],
        sizes: ["M", "L"],
        images: ["https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=600&auto=format&fit=crop"], // re-using image
        descriptionAr: "توفر ضغطاً متدرجاً لتحسين الدورة الدموية أثناء التمارين الشاقة.",
        descriptionEn: "Provides graduated compression to improve blood circulation during strenuous exercises.",
        stock: 45,
        isFeatured: true,
        isBestSeller: false
      }
    ];
    await db.insert(products).values(sampleProducts);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the database
  await seedDatabase();

  app.get(api.products.list.path, async (req, res) => {
    const allProducts = await storage.getProducts();
    res.json(allProducts);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const newOrder = await storage.createOrder(input);
      res.status(201).json(newOrder);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
