'use client'

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import type { CartItem } from "@/lib/db/cart_collection";
import { removeFromCart, updateCartItemQuantity } from "@/lib/actions/cart";
import { useState } from "react";

type CartItemActionProps = {
  item: CartItem
}

export function CartItemAction({ item }: CartItemActionProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    setIsLoading(true);
    if (newQuantity <= 0) {
      await removeFromCart(item.productId.toString());
    } else {
      await updateCartItemQuantity(item.productId.toString(), newQuantity);
    }
    setIsLoading(false);
  };

  const handleRemove = async () => {
    setIsLoading(true);
    await removeFromCart(item.productId.toString());
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden mb-2">
        <button
          type="button"
          className="p-2 text-gray-600 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={isLoading || item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          <FiMinus />
        </button>
        <span className="px-4 py-2 text-gray-800 font-medium">{item.quantity}</span>
        <button
          type="button"
          className="p-2 text-gray-600 hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={isLoading}
          aria-label="Increase quantity"
        >
          <FiPlus />
        </button>
      </div>
      <button
        type="button"
        className="flex items-center justify-center w-full px-3 py-2 text-sm text-red-600 bg-red-100 rounded-lg hover:bg-red-200 transition-colors duration-200 disabled:opacity-50"
        onClick={handleRemove}
        disabled={isLoading}
      >
        <FiTrash2 className="mr-1" />
        Remove
      </button>
    </div>
  )
}