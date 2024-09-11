import { productsCollection } from "@/db/product_collection"
import { NextResponse } from "next/server"

type ProductSlugParams = {
  params: {
    slug: string
  }
}
export async function GET(_: Request, { params }: ProductSlugParams) {
  const product = await productsCollection.findOne({ slug: params.slug })
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}
