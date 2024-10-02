import { NextRequest, NextResponse } from "next/server";
import { formatErrors } from "@/lib/utils/validator";
import { z } from "zod";
import { OAuth2Client } from 'google-auth-library'
import { usersCollection } from "@/lib/db/user_collection";
import { cartsCollection } from "@/lib/db/cart_collection";
import { signToken } from "@/lib/utils/jwt";

const GoogleLoginSchema = z.object({
  authCode: z.string({ message: "Google Token is required" })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { success, data, error } = GoogleLoginSchema.safeParse(body);

    if (!success) {
      return NextResponse.json({ errors: formatErrors(error) }, { status: 400 });
    }

    const client = new OAuth2Client(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage'
    );

    const { tokens } = await client.getToken(data.authCode)

    if (!tokens.id_token) {
      return NextResponse.json({ errors: "Invalid google token" }, { status: 400 });
    }

    const ticket = await client.verifyIdToken({ idToken: tokens.id_token });
    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json({ errors: "Invalid google token" }, { status: 400 });
    }

    let user = await usersCollection.findOne({ email: payload.email });
    if (!user) {
      const newUser = {
        name: payload.name as string,
        email: payload.email as string,
        password: "", // just empty password, because using google login
        googleId: payload.sub as string,
        createdAt: new Date(),
      }
      const result = await usersCollection.insertOne(newUser);

      await cartsCollection.insertOne({
        userId: result.insertedId,
        items: [],
      });

      user = {
        _id: result.insertedId,
        ...newUser
      }
    }

    // Generate JWT token
    const token = await signToken({ sub: user._id.toString() });

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
  }
}
