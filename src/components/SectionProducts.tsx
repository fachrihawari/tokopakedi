import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard, { Product } from './ProductCard';

interface SectionProductsProps {
  label: string;
  backgroundColor?: string;
  getProducts: () => Promise<Product[]>;
}

async function SectionProducts({ label, backgroundColor = 'bg-white', getProducts }: SectionProductsProps) {
  const products = await getProducts();

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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionProducts;
