import { WithId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const ProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  price: z.number().min(0).positive(),
  discount: z.number().optional(),
  images: z.array(z.string()),
  stock: z.number().int().min(0),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  sales: z.number().int().default(0),
  rating: z.object({
    count: z.number().min(0).default(0),
    value: z.number().min(0).max(5).default(0),
  }),
  createdAt: z.date().default(new Date()).optional(),
});

export type ProductForm = z.infer<typeof ProductSchema>
export type Product = WithId<ProductForm>

export const productsCollection = db.collection<ProductForm>("products");
