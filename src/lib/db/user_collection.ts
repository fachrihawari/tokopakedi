import { ObjectId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z.date().default(new Date()),
});

export type User = z.infer<typeof UserSchema>;

export const usersCollection = db.collection<User>("users");
