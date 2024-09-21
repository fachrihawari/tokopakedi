'use client';

import { useState } from 'react';
import { formatCurrency } from "@/lib/utils/number";
import Image from "next/image";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { updateCartItemQuantity, removeFromCart } from '@/lib/actions/cart';
import { Product } from '@/lib/db/product_collection';

type CartItem = {
  product: Product;
  quantity: number;
}

export default function CartItems({ initialCart }: { initialCart: CartItem[] }) {
  const [cart, setCart] = useState(initialCart);

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      await removeFromCart(productId);
      setCart(cart.filter(item => item.product._id?.toString() !== productId));
    } else {
      await updateCartItemQuantity(productId, newQuantity);
      setCart(cart.map(item => 
        item.product._id?.toString() === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
    setCart(cart.filter(item => item.product._id?.toString() !== productId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {cart.map((item) => (
          <div key={item.product._id?.toString()} className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
            <Image src={item.product.thumbnail} alt={item.product.name} width={80} height={80} className="rounded-md" />
            <div className="ml-4 flex-grow">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">{formatCurrency(item.product.price)}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleUpdateQuantity(item.product._id?.toString()!, item.quantity - 1)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FiMinus />
              </button>
              <span className="mx-2 w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleUpdateQuantity(item.product._id?.toString()!, item.quantity + 1)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FiPlus />
              </button>
            </div>
            <button
              onClick={() => handleRemoveItem(item.product._id?.toString()!)}
              className="ml-4 text-red-500 hover:text-red-700 p-1"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formatCurrency(totalPrice)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold text-green-600">{formatCurrency(totalPrice)}</span>
            </div>
          </div>
        </div>
        <button className="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}