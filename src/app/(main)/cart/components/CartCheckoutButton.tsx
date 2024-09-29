'use client'
import { useFormStatus } from "react-dom"

export default function CheckoutButton() {
  const { pending } = useFormStatus()
  const className = pending ? "bg-gray-500" : "bg-green-500 hover:bg-green-600 "
  return (
    <button disabled={pending} className={`mt-6 w-full text-white py-3 rounded-lg transition-colors duration-300 font-semibold ${className}`}>
      {pending ? 'Loading...' : 'Proceed to Checkout'}
    </button>
  )
}
