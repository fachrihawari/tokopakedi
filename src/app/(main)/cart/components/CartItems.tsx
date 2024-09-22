import { formatCurrency } from "@/lib/utils/number";
import type { CartItem as CartItemType } from "@/lib/db/cart_collection";
import { CartItem } from "./CartItem";

type CartItemsProps = {
  cartItems: CartItemType[]
}

export default function CartItems({ cartItems }: CartItemsProps) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Products</h2>
        {cartItems.map((item) => (
          <CartItem
            key={item.productId.toString()}
            item={item}
          />
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