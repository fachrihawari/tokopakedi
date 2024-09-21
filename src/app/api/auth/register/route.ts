import { UserSchema, usersCollection } from "@/lib/db/user_collection";
import { formatErrors } from "@/lib/utils/validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { cartsCollection } from "@/lib/db/cart_collection";

const RegisterSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
}).extend({
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { success, data, error } = RegisterSchema.safeParse(body);

  if (!success) {
    return NextResponse.json({ errors: formatErrors(error) }, { status: 400 });
  }

  const user = await usersCollection.findOne({ email: data.email });
  if (user) {
    return NextResponse.json({ errors: ["User already exists"] }, { status: 400 });
  }

  const result = await usersCollection.insertOne({
    ...data,
    password: await hash(data.password, 10),
    createdAt: new Date(),
  });

  await cartsCollection.insertOne({
    userId: result.insertedId,
    items: [],
    totalAmount: 0,
  });

  return NextResponse.json({ message: "User has been registered successfully" }, { status: 201 });
}