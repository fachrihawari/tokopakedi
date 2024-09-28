import { Product, productsCollection } from "@/lib/db/product_collection"
import { Filter, ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

type ProductSlugParams = {
  params: {
    slug: string
  }
}
export async function GET(_: Request, { params }: ProductSlugParams) {
  const filter: Filter<Product> = ObjectId.isValid(params.slug) ? { _id: new ObjectId(params.slug) } : { slug: params.slug }
  const product = await productsCollection.findOne(filter)
  if (!product) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  }
  return NextResponse.json(product)
}
