import { Product, productsCollection } from "@/db/product_collection";
import { Filter } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';
  const categories = request.nextUrl.searchParams.getAll('categories') || [];
  const priceRange = request.nextUrl.searchParams.get('priceRange') || '';
  const rating = request.nextUrl.searchParams.get('rating') || '';
  const filter: Filter<Product> = {}

  if (q) filter.name = { $regex: q, $options: 'i' }
  if (categories.length > 0) filter.category = { $in: categories }
  if (priceRange) {
    const [min, max] = priceRange.split('-');
    filter.price = { $gte: parseInt(min), $lte: parseInt(max) }
  }
  if (rating) filter["rating.value"] = { $gte: parseInt(rating) }

  console.log(filter, "> filter")

  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '25');
  const skip = (page - 1) * limit;

  const products = await productsCollection.find(filter)
    .skip(skip)
    .limit(limit)
    .toArray();

  const totalProducts = await productsCollection.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limit);

  const response = {
    products,
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts,
      limit
    }
  };

  return NextResponse.json(response);
}
