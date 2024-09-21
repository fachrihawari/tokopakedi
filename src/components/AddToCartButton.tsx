'use client';

import { useState } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { addToCart } from "@/lib/actions/cart";
import type { Product } from "@/lib/db/product_collection";

interface AddToCartButtonProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
}

export default function AddToCartButton({ product, size = 'small' }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    await addToCart(product._id?.toString() as string, 1);
    setIsLoading(false);
  };

  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`w-full bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]}`}
    >
      <FiShoppingCart className={size === 'small' ? 'mr-1' : 'mr-2'} />
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}