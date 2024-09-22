import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';
import SearchInput from './SearchInput';
import { buildSearchParams, setQueryParams } from '@/lib/utils/url';
import TokoPakEdiLogo from './TokoPakEdiLogo';
import { logout } from '@/lib/actions/users';
import { getCart } from '@/lib/actions/cart';
import { isLoggedIn } from '@/lib/utils/auth';

async function Navbar() {
  const searchParams = buildSearchParams(headers().get('x-current-url')) // HACK: get current url from headers
  const search = searchParams.get('q') ?? ''
  const cart = await getCart();
  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = async (formData: FormData) => {
    'use server'
    const newSearchParams = setQueryParams({ q: formData.get('q') as string, page: 1 }, searchParams)
    redirect(`/products?${newSearchParams.toString()}`)
  }

  const handleClearSearch = async () => {
    'use server'
    const newSearchParams = setQueryParams({ q: '', page: 1 }, searchParams)
    redirect(`/products?${newSearchParams.toString()}`)
  }

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 shadow-md backdrop-filter backdrop-blur-3xl">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <TokoPakEdiLogo />
          </Link>

          {/* Search Bar */}
          <div className="hidden sm:flex sm:flex-1 mx-4 sm:mx-8 md:mx-16">
            <div className='relative w-full'>
              <form action={handleSearch}>
                <FiSearch size={20} className='absolute left-3 top-2.5 text-gray-400' />
                <SearchInput defaultValue={search} />
              </form>
              {search && (
                <form action={handleClearSearch}>
                  <button type='submit' className='absolute right-3 top-2.5 text-gray-400'>
                    <FiX size={20} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-6">
            <Link href="/products" className="sm:hidden text-gray-600 hover:text-green-500">
              <FiSearch size={24} />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-green-500 relative">
              <FiShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <div className="flex items-center space-x-2">
              {
                isLoggedIn() ? (
                  <form action={logout}>
                    <button type='submit' className="bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-md">
                      Logout
                    </button>
                  </form>
                ) : (
                  <>
                    <Link href="/login" className="bg-white text-green-500 px-3 py-1 border border-green-500 rounded-md">
                      Login
                    </Link>
                    <Link href="/register" className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">
                      Register
                    </Link>
                  </>
                )
              }

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
