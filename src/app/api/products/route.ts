import { Product, productsCollection } from "@/db/product_collection";
import { Filter } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  const filter: Filter<Product> = {}
  if (q) filter.name = { $regex: q, $options: 'i' }

  const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
  const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50');
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
