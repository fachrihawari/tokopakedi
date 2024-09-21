import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function CartEmpty() {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex flex-col items-center">
			<FiShoppingCart size={80} className="text-gray-300 mb-6" />
			<h2 className="text-xl font-semibold mb-3">Your shopping cart is empty</h2>
			<p className="text-gray-600 mb-8 text-center">
				Looks like you haven&#39;t added anything to your cart yet.
			</p>
			<Link
				href="/products"
				className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold text-sm"
			>
				Start Shopping
			</Link>
		</div>

	)
}