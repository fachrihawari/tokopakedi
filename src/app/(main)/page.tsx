import Carousel from "@/components/Carousel";
import SectionProducts from "@/components/SectionProducts";
import { getLanding, getBestSellers } from "@/actions/products";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Carousel />
      <Suspense fallback={<SectionProductsPlaceholder />}>
        <SectionProducts label="Latest Products" backgroundColor="bg-green-100" getProducts={getLanding} />
      </Suspense>
      <Suspense fallback={<SectionProductsPlaceholder />}>
        <SectionProducts label="Best Sellers" backgroundColor="bg-purple-100" getProducts={getBestSellers} />
      </Suspense>
    </>
  );
}

function SectionProductsPlaceholder() {
  return (
    <div className="animate-pulse py-8 container mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/6 mb-4"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-200 h-64 rounded"></div>
        ))}
      </div>
    </div>
  );
}
