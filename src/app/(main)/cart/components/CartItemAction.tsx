'use client'

import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import type { CartItem } from "@/lib/db/cart_collection";
import { removeFromCart, updateCartItemQuantity } from "@/lib/actions/cart";

type CartItemActionProps = {
  item: CartItem
}

export function CartItemAction({ item }: CartItemActionProps) {
  return (
    <div className="flex items-center">
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-600"
        onClick={() => {
          if (item.quantity <= 1) {
            removeFromCart(item.productId.toString())
          } else {
            updateCartItemQuantity(item.productId.toString(), item.quantity - 1)
          }
        }}
      >
        <FiMinus />
      </button>
      <span className="mx-2 text-gray-700">{item.quantity}</span>
      <button
        type="submit"
        className="text-gray-500 hover:text-gray-600"
        onClick={() => updateCartItemQuantity(item.productId.toString(), item.quantity + 1)}
      >
        <FiPlus />
      </button>
      <button
        type="submit"
        className="ml-4 text-red-500 hover:text-red-600"
        onClick={() => removeFromCart(item.productId.toString())}
      >
        <FiTrash2 />
      </button>
    </div>
  )
}