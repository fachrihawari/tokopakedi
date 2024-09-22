import { ObjectId, WithId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const CartItemSchema = z.object({
  productId: z.instanceof(ObjectId),
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().min(1),
  thumbnail: z.string().url(),
});

export const CartSchema = z.object({
  userId: z.instanceof(ObjectId),
  items: z.array(CartItemSchema),
  totalAmount: z.number().positive(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type CartForm = z.infer<typeof CartSchema>
export type Cart = WithId<CartForm>

export const cartsCollection = db.collection<CartForm>("carts");
