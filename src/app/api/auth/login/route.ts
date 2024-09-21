import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { UserSchema, usersCollection } from "@/lib/db/user_collection";
import { signToken } from "@/lib/utils/jwt";
import { formatErrors } from "@/lib/utils/validator";

const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { success, data, error } = LoginSchema.safeParse(body);

    if (!success) {
      return NextResponse.json({ errors: formatErrors(error) }, { status: 400 });
    }

    const user = await usersCollection.findOne({ email: data.email });

    if (!user) {
      return NextResponse.json({ errors: ["Invalid email or password"] }, { status: 401 });
    }

    const isPasswordValid = await compare(data.password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ errors: ["Invalid email or password"] }, { status: 401 });
    }

    // Generate JWT token
    const token = await signToken({ sub: user._id.toString() });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
  }
}
