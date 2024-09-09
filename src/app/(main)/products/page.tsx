import { Suspense } from "react";
import ProductsFilter from "./components/ProductsFilter";
import ProductsList from "./components/ProductsList";
import ProductsListPlaceholder from "./components/ProductsListPlaceholder";
import ProductsFilterPlaceholder from "./components/ProductsFilterPlaceholder";

type ProductsPageProps = {
  searchParams: {
    q: string,
    page: number
  }
}
export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <Suspense key={JSON.stringify(searchParams)} fallback={<ProductsFilterPlaceholder />}>
          <ProductsFilter searchParams={searchParams} />
        </Suspense>
        <div className="w-full md:w-3/4">
          <Suspense key={JSON.stringify(searchParams)} fallback={<ProductsListPlaceholder />}>
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
