import { ObjectId, WithId } from "mongodb";
import { z } from "zod";
import { db } from "./client";
import { CartItemSchema } from "./cart_collection";

export const MidtransNotificationSchema = z.object({
  transaction_time: z.string(),
  transaction_status: z.string(),
  transaction_id: z.string(),
  status_message: z.string(),
  status_code: z.string(),
  signature_key: z.string(),
  payment_type: z.string(),
  order_id: z.string(),
  merchant_id: z.string(),
  masked_card: z.string(),
  gross_amount: z.string(),
  fraud_status: z.string(),
  eci: z.string(),
  currency: z.string(),
  channel_response_message: z.string(),
  channel_response_code: z.string(),
  card_type: z.string(),
  bank: z.string(),
  approval_code: z.string()
})

export const PaymentSchema = z.object({
  token: z.string().optional(),
  notification: MidtransNotificationSchema.optional()
})

export const OrderSchema = z.object({
  userId: z.instanceof(ObjectId),
  products: z.array(CartItemSchema),
  payment: PaymentSchema.optional(),
  total: z.number().positive(),
  status: z.enum(["pending", "paid", "cancelled"]).default("pending"),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export type MidtransNotification = z.infer<typeof MidtransNotificationSchema>
export type OrderForm = z.infer<typeof OrderSchema>
export type Order = WithId<OrderForm>

export const ordersCollection = db.collection<OrderForm>("orders");
