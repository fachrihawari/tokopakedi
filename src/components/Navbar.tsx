import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiLogIn, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import SearchInput from './SearchInput';
import { buildSearchParams, setQueryParams } from '@/lib/utils/url';
import TokoPakEdiLogo from './TokoPakEdiLogo';

function Navbar() {
  const searchParams = buildSearchParams(headers().get('x-current-url')) // HACK: get current url from headers
  const search = searchParams.get('q') ?? ''

  const handleSearch = async (formData: FormData) => {
    'use server'
    const newSearchParams = setQueryParams(searchParams, { q: formData.get('q') as string, page: 1 })
    redirect(`/products?${newSearchParams.toString()}`)
  }

  const handleClearSearch = async () => {
    'use server'
    const newSearchParams = setQueryParams(searchParams, { q: '', page: 1 })
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
            <Link href="/cart" className="text-gray-600 hover:text-green-500">
              <FiShoppingCart size={24} />
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/login" className="bg-white text-green-500 px-3 py-1 border border-green-500 rounded-md">
                Login
              </Link>
              <Link href="/register" className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
