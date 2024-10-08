import { formatCurrency } from "@/lib/utils/number";
import type { CartItem as CartItemType } from "@/lib/db/cart_collection";
import { createOrder } from "@/lib/actions/orders";
import CartCheckoutButton from "./CartCheckoutButton";

type CartSummaryProps = {
  cartItems: CartItemType[]
}

export default function CartSummary({ cartItems }: CartSummaryProps) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24 self-start">
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
      <form action={createOrder}>
        <CartCheckoutButton />
      </form>
    </div>
  );
}