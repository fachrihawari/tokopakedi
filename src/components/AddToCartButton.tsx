'use client'

import { useEffect, useState } from 'react';
import { FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { addToCart, getCart, removeFromCart, updateCartItemQuantity } from "@/lib/actions/cart";
import type { Product } from "@/lib/db/product_collection";
import { isLoggedIn } from '@/lib/actions/users';
import { swal } from '@/lib/utils/swal';

interface AddToCartButtonProps {
  product: Product;
  size?: 'small' | 'medium' | 'large';
}

export default function AddToCartButton({ product, size = 'small' }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const checkIfInCart = async () => {
      const cart = await getCart();
      const cartItem = cart.items.find(item => item.productId.toString() === product._id.toString());
      if (cartItem) {
        setIsInCart(true);
        setQuantity(cartItem.quantity);
      } else {
        setIsInCart(false);
        setQuantity(0);
      }
    };

    checkIfInCart();
  }, [product._id]);

  const handleAddToCart = async () => {
    if (!await isLoggedIn()) {
      return swal({
        title: 'Unauthenticated',
        type: 'error',
        message: 'You must be login to add product to the cart'
      })
    }

    setIsLoading(true);
    if (isInCart) {
      await updateCartItemQuantity(product._id.toString(), quantity + 1);
      setQuantity(quantity + 1);
    } else {
      await addToCart(product._id.toString(), 1);
      setIsInCart(true);
      setQuantity(1);
    }
    setIsLoading(false);
  };

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsLoading(true);
    if (newQuantity <= 0) {
      await removeFromCart(product._id.toString());
      setIsInCart(false);
      setQuantity(0);
    } else {
      await updateCartItemQuantity(product._id.toString(), newQuantity);
      setQuantity(newQuantity);
    };
    setIsLoading(false);
  };

  const sizeClasses = {
    small: 'text-sm h-8',
    medium: 'text-base h-10',
    large: 'text-lg h-12'
  };

  const buttonClasses = `
    ${sizeClasses[size]}
    px-4
    bg-green-500
    text-white
    rounded-md
    hover:bg-green-600
    transition-all
    duration-200
    flex
    items-center
    justify-center
    disabled:opacity-50
    disabled:cursor-not-allowed
    focus:outline-none
    focus:ring-2
    focus:ring-green-500
    focus:ring-opacity-50
  `;

  if (isInCart) {
    return (
      <div className={`flex items-center justify-between rounded-md overflow-hidden ${sizeClasses[size]}`}>
        <button
          onClick={() => handleUpdateQuantity(quantity - 1)}
          disabled={isLoading}
          className={`${buttonClasses} rounded-r-none w-1/3`}
          aria-label="Decrease quantity"
        >
          <FiMinus />
        </button>
        <span className={`${sizeClasses[size]} bg-green-100 text-green-800 font-medium w-1/3 flex items-center justify-center`}>
          {quantity}
        </span>
        <button
          onClick={() => handleUpdateQuantity(quantity + 1)}
          disabled={isLoading}
          className={`${buttonClasses} rounded-l-none w-1/3`}
          aria-label="Increase quantity"
        >
          <FiPlus />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={`${buttonClasses} w-full`}
    >
      <FiShoppingCart className="mr-2" />
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}
