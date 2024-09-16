import { ObjectId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const UserSchema = z.object({
  _id: z.instanceof(ObjectId).optional(),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  createdAt: z.date().default(new Date()),
});

export type User = z.infer<typeof UserSchema>;

export const usersCollection = db.collection<User>("users");
