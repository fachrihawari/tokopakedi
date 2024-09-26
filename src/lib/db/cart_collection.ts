import { ObjectId, WithId } from "mongodb";
import { z } from "zod";
import { db } from "./client";
import { ProductSchema } from "./product_collection";

export const CartItemSchema = ProductSchema.pick({
  name: true,
  price: true,
  thumbnail: true,
}).extend({
  quantity: z.number().int().min(1),
  productId: z.instanceof(ObjectId),
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
