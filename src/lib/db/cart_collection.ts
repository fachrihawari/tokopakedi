import { ObjectId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const CartItemSchema = z.object({
  productId: z.instanceof(ObjectId),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
  thumbnail: z.string().url().optional(),
});

export const CartSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  userId: z.instanceof(ObjectId),
  items: z.array(CartItemSchema),
  totalAmount: z.number().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;

export const cartsCollection = db.collection<Cart>("carts");
