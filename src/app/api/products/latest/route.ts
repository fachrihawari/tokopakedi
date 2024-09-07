import { productsCollection } from "@/db/product_collection";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET() {
  const products = await productsCollection.find().sort({ _id: -1 }).limit(5).toArray();
  return NextResponse.json(products);
}
