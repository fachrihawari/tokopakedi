import { productsCollection } from "@/db/product_collection";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await productsCollection.find().sort({ _id: -1 }).limit(6).toArray();
  return NextResponse.json(products);
}
