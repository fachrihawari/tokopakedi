import { Product } from "@/db/product_collection";

export async function getLatest(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products/latest', {
    cache: 'no-store',
  });
  return res.json();
}

export async function getBestSellers(): Promise<Product[]> {
  const res = await fetch('http://localhost:3000/api/products/best-sellers', {
    cache: 'no-store',
  });
  return res.json();
}

type GetProductsParam = {
  q?: string;
  page?: number;
}
type GetProductsResponse = {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    limit: number;
  }
}
export async function getProducts({ q, page }: GetProductsParam): Promise<GetProductsResponse> {
  const url = new URL('http://localhost:3000/api/products');
  if (q) url.searchParams.set('q', q);
  if (page) url.searchParams.set('page', page.toString());

  const res = await fetch(url, {
    cache: 'no-store',
  });
  return res.json();
}

export type GetProductsFacetsResponse = {
  priceRanges: {
    _id: {
      min: number,
      max: number
    },
    count: number
  }[],
  categories: {
    _id: string,
    count: number
  }[]
}
export async function getProductsFacets({ q }: GetProductsParam): Promise<GetProductsFacetsResponse> {
  const url = new URL('http://localhost:3000/api/products/facets');
  if (q) url.searchParams.set('q', q);

  const res = await fetch(url, {
    cache: 'no-store',
  });
  return res.json();
}
