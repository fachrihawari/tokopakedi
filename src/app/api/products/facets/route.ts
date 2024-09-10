import { Product, productsCollection } from "@/db/product_collection";
import { Filter } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q') || '';

  const filter: Filter<Product> = {}
  if (q) filter.name = { $regex: q, $options: 'i' }

  const facets = await productsCollection.aggregate([
    {
      $match: filter
    },
    {
      $facet: {
        priceRanges: [
          {
            $bucketAuto: {
              groupBy: "$price",
              buckets: 5
            }
          },
        ],
        categories: [
          {
            $group: {
              _id: "$category",
              count: { $sum: 1 },
            }
          },
          {
            $sort: { _id: 1 }
          }
        ]
      }
    }
  ]).toArray()

  return NextResponse.json(facets[0]);
}
