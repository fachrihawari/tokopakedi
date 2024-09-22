import { cartsCollection } from "@/lib/db/cart_collection";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    const userId = String(req.headers.get("x-user-id"))
    const cart = await cartsCollection.findOne({ userId: new ObjectId(userId) });
    if (!cart) {
      return NextResponse.json({ errors: ["Cart not found"] }, { status: 404 });
    }
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
  }
}
