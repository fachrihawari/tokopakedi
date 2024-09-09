import { ObjectId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const ProductSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  thumbnail: z.string(),
  price: z.number().min(1),
  discount: z.number().optional(),
  images: z.array(z.string()),
  stock: z.number().min(0),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  sales: z.number().default(0),
  rating: z.object({
    count: z.number().min(0).default(0),
    value: z.number().min(0).max(5).default(0),
  }),
  createdAt: z.date().default(new Date()),
});

export type Product = z.infer<typeof ProductSchema>;

export const productsCollection = db.collection<Product>("products");
