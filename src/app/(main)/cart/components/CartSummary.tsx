'use client'

import { formatCurrency } from "@/lib/utils/number";
import type { CartItem as CartItemType } from "@/lib/db/cart_collection";
import { checkout } from "@/lib/actions/orders";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useMidtrans } from "@/lib/hooks/useMidtrans";

type CartSummaryProps = {
  cartItems: CartItemType[]
}

function CheckoutButton() {
  const { pending } = useFormStatus()
  const className = pending ? "bg-gray-500" : "bg-green-500 hover:bg-green-600 "
  return (
    <button disabled={pending} className={`mt-6 w-full text-white py-3 rounded-lg transition-colors duration-300 font-semibold ${className}`}>
      {pending ? 'Loading...' : 'Proceed to Checkout'}
    </button>
  )
}

type CheckoutState = {
  paymentToken: string
}

export default function CartSummary({ cartItems }: CartSummaryProps) {
  const { isReady, pay } = useMidtrans({
    onClose: () => {
      console.log("close")
    }
  })
  const [checkoutState, handleCheckout] = useFormState<CheckoutState>(checkout, {
    paymentToken: ""
  })
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (checkoutState.paymentToken && isReady) {
      pay(checkoutState.paymentToken)
    }
  }, [checkoutState.paymentToken, isReady, pay])

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
      <form action={handleCheckout}>
        <CheckoutButton />
      </form>
    </div>
  );
}