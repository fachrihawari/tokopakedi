import { NextResponse } from "next/server";
import { productsCollection } from "@/db/product_collection";

export async function GET() {
  const products = await productsCollection.find().sort({ sales: -1 }).limit(6).toArray();
  return NextResponse.json(products);
}
