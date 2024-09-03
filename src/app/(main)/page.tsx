import Carousel from "@/components/home/Carousel";
import SectionProducts from "@/components/home/SectionProducts";

export default function Home() {
  return (
    <>
      <Carousel />
      <SectionProducts label="Latest Products" backgroundColor="bg-green-100" />
    </>
  );
}
