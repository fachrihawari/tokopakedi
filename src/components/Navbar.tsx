import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import SearchInput from './SearchInput';
import { setQueryParams } from '@/utils/url';

function Navbar() {
  const currentUrl = headers().get('x-current-url') // HACK: get current url from headers
  const searchParams = currentUrl ? new URL(currentUrl).searchParams : new URLSearchParams();
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
          <Link href="/" className="flex text-green-500 tracking-widest items-center text-2xl font-bold">
            TokoPakEdi
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
