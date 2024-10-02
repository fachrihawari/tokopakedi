import { WithId } from "mongodb";
import { z } from "zod";
import { db } from "./client";

export const UserSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  googleId: z.string().optional(),
  createdAt: z.date().default(new Date()).optional(),
});

export type UserForm = z.infer<typeof UserSchema>
export type User = WithId<UserForm>

export const usersCollection = db.collection<UserForm>("users");
