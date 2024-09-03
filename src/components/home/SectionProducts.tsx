import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard, { FlashSaleProduct } from './ProductCard';

const flashSaleProducts: FlashSaleProduct[] = [
  { id: 1, name: "Smartphone X", imageUrl: "/img/products/smartphone.webp", price: 1999000, discountPercentage: 20 },
  { id: 2, name: "Wireless Earbuds", imageUrl: "/img/products/earbuds.webp", price: 599000, discountPercentage: 30 },
  { id: 3, name: "Smart Watch", imageUrl: "/img/products/smartwatch.webp", price: 1499000, discountPercentage: 15 },
  { id: 4, name: "Laptop Pro", imageUrl: "/img/products/laptop.webp", price: 12999000, discountPercentage: 10 },
  { id: 5, name: "4K TV", imageUrl: "/img/products/tv.webp", price: 8999000, discountPercentage: 25 },
];

interface SectionProductsProps {
  label: string;
  backgroundColor?: string;
}

const SectionProducts: React.FC<SectionProductsProps> = ({ label, backgroundColor = 'bg-white' }) => {
  return (
    <section className={`${backgroundColor} py-8`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{label}</h2>
          <div className="flex items-center text-green-500">
            <span>See All</span>
            <FiArrowRight className="ml-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {flashSaleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionProducts;
