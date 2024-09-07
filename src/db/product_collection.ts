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
  tags: z.array(z.string())
});

export type Product = z.infer<typeof ProductSchema>;

export const productsCollection = db.collection<Product>("products");
