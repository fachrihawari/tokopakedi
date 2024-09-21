import { CartItemSchema, cartsCollection } from "@/lib/db/cart_collection";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { productsCollection } from "@/lib/db/product_collection";

const CartItemFormSchema = CartItemSchema.pick({
  productId: true,
  quantity: true
});
const DeleteCartItemFormSchema = CartItemFormSchema.pick({
  productId: true
});

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

export async function POST(req: NextRequest) {
  try {
    const userId = String(req.headers.get("x-user-id"))
    const rawBody = await req.json();
    const body = CartItemFormSchema.parse(rawBody)

    const product = await productsCollection.findOne({ _id: new ObjectId(body.productId) });
    if (!product) {
      return NextResponse.json({ errors: ["Product not found"] }, { status: 404 });
    }

    const cartItem = CartItemSchema.parse({
      productId: new ObjectId(product._id),
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: body.quantity,
    });

    await cartsCollection.updateOne(
      { userId: new ObjectId(userId) },
      { $push: { items: cartItem } },
      { upsert: true }
    );

    return NextResponse.json({ message: "Product added to cart successfully" });
  } catch (error) {
    return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userId = String(req.headers.get("x-user-id"));
    const rawBody = await req.json();

    const body = CartItemFormSchema.parse(rawBody)

    await cartsCollection.updateOne(
      { 
        userId: new ObjectId(userId), 
        "items.productId": new ObjectId(body.productId) 
      },
      { 
        $set: { 
          "items.$.quantity": body.quantity 
        } 
      }
    );

    return NextResponse.json({ message: "Product qty updated in cart successfully" });
  } catch (error) {
    return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = String(req.headers.get("x-user-id"));
    const rawBody = await req.json();

    const body = DeleteCartItemFormSchema.parse(rawBody)

    await cartsCollection.updateOne(
      { userId: new ObjectId(userId) },
      { $pull: { items: { productId: new ObjectId(body.productId) } } }
    );

    return NextResponse.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    return NextResponse.json({ errors: ["An unexpected error occurred"] }, { status: 500 });
  }
}