import { pgTable, text, serial, integer, jsonb, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  priceSar: integer("price_sar").notNull(),
  colors: text("colors").array().notNull(), // e.g., ["#000000", "#FFFFFF"]
  sizes: text("sizes").array().notNull(),   // e.g., ["S", "M", "L"]
  images: text("images").array().notNull(), // placeholder URLs
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en").notNull(),
  stock: integer("stock").notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isBestSeller: boolean("is_best_seller").default(false).notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerCity: text("customer_city").notNull(),
  customerAddress: text("customer_address").notNull(),
  customerNotes: text("customer_notes"),
  items: jsonb("items").$type<{productId: number, quantity: number, color: string, size: string, price: number}[]>().notNull(),
  totalSar: integer("total_sar").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true, status: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
