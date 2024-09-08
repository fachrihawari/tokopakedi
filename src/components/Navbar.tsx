'use client'

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';

function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '')
  }, [searchParams])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('q', search)
    router.push(`/products?${newSearchParams.toString()}`)
  }

  const handleClearSearch = () => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.delete('q')
    router.push(`/products?${newSearchParams.toString()}`)
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
            <form onSubmit={handleSearch} className="relative w-full">
              <FiSearch size={20} className='absolute left-3 top-2.5 text-gray-400' />
              <input
                type="text"
                name='q'
                placeholder="Cari di TokoPakEdi"
                className="w-full py-2 pl-10 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-green-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button type='button' onClick={handleClearSearch}>
                  <FiX size={20} className='absolute right-3 top-2.5 text-gray-400' />
                </button>
              )}
            </form>
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
