import Link from "next/link";
import { FiLogIn } from "react-icons/fi";


export default function CartNotLoggedIn() {
    return (
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
}