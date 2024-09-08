import Carousel from "@/components/Carousel";
import SectionProducts from "@/components/SectionProducts";
import { getLatest, getBestSellers } from "@/actions/products";
import { Suspense } from "react";
import SectionProductsPlaceholder from "@/components/SectionProductsPlaceholder";

export default async function HomePage() {
  return (
    <>
      <Carousel />
      <Suspense fallback={<SectionProductsPlaceholder />}>
        <SectionProducts label="Latest Products" backgroundColor="bg-green-100" getProducts={getLatest} />
      </Suspense>
      <Suspense fallback={<SectionProductsPlaceholder />}>
        <SectionProducts label="Best Sellers" backgroundColor="bg-purple-100" getProducts={getBestSellers} />
      </Suspense>
    </>
  );
}
