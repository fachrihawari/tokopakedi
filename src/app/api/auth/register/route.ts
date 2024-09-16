import { usersCollection } from "@/lib/db/user_collection";
import { formatErrors } from "@/lib/utils/validator";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";

const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters long" }),
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(req: NextRequest) {
  const { email, password, confirmPassword, name } = await req.json();

  console.log(email, password, confirmPassword, name);

  const { success, data, error } = RegisterSchema.safeParse({
    email,
    password,
    confirmPassword,
    name,
  });

  if (!success) {
    return NextResponse.json({ errors: formatErrors(error) }, { status: 400 });
  }

  const user = await usersCollection.findOne({ email });
  if (user) {
    return NextResponse.json({ errors: ["User already exists"] }, { status: 400 });
  }

  await usersCollection.insertOne({
    ...data,
    password: await hash(password, 10),
    createdAt: new Date(),
  });
  
  return NextResponse.json({ message: "User has been registered successfully" }, { status: 201 });
}