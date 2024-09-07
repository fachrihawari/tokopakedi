import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex text-green-500 tracking-widest items-center text-2xl font-bold">
            TokoPakEdi
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:flex sm:flex-1 mx-4 sm:mx-8 md:mx-16">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Cari di Tokopedia"
                className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <FiSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link  href="/products" className="sm:hidden text-gray-600 hover:text-green-500">
              <FiSearch size={24} />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-green-500">
              <FiShoppingCart size={24} />
            </Link>
            <Link href="/profile" className="text-gray-600 hover:text-green-500">
              <FiUser size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
