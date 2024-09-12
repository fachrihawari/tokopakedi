import Link from 'next/link';
import { FiShoppingCart, FiLogIn } from 'react-icons/fi';

export default function CartPage() {
  const isLoggedIn = true; // Replace this with actual authentication check

  const loggedInSection = (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center">
      <FiShoppingCart size={80} className="text-gray-300 mb-6" />
      <h2 className="text-xl font-semibold mb-3">Your shopping cart is empty</h2>
      <p className="text-gray-600 mb-8 text-center">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link
        href="/products"
        className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold text-sm"
      >
        Start Shopping
      </Link>
    </div>
  )

  const notLoggedInSection = (
    <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <FiLogIn size={24} className="text-green-500 mr-3" />
        <h3 className="text-lg font-semibold text-gray-800">Login to your account</h3>
      </div>
      <p className="text-gray-600 mb-6">
        Sign in to view your cart, save items for later, and enjoy a personalized shopping experience.
      </p>
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300 font-semibold text-sm"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="bg-white text-green-500 border border-green-500 px-6 py-2 rounded-lg hover:bg-green-50 transition duration-300 font-semibold text-sm"
        >
          Register
        </Link>
      </div>
    </div>
  )
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {isLoggedIn ? loggedInSection : notLoggedInSection}
    </div>
  );
}
