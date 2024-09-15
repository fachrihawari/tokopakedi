import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from 'next';
import ProductsFilter from "./components/ProductsFilter";
import ProductsList, { ProductsListProps } from "./components/ProductsList";
import ProductsListPlaceholder from "./components/ProductsListPlaceholder";

export async function generateMetadata(_: ProductsPageProps, parentPromise: ResolvingMetadata): Promise<Metadata> {
  const parent = await parentPromise
  return {
    title: `Products | ${parent.title?.absolute}`,
    description: 'Products page'
  }
}

type ProductsPageProps = {
  searchParams: ProductsListProps['searchParams']
}
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <ProductsFilter />
        <div className="w-full md:w-3/4">
          <Suspense key={JSON.stringify(searchParams)} fallback={<ProductsListPlaceholder />}>
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
