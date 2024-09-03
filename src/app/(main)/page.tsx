import Carousel from "@/components/Carousel";
import SectionProducts from "@/components/SectionProducts";

async function fetchProducts() {
  const res = await fetch('http://localhost:3000/api/landing');
  return res.json();
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <Carousel />
      <SectionProducts label="Latest Products" backgroundColor="bg-green-100" products={products} />
      <SectionProducts label="Best Sellers" backgroundColor="bg-purple-100" products={products} />
    </>
  );
}
