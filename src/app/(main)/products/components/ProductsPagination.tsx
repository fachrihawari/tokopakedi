"use client"

import { setQueryParams } from "@/lib/utils/url";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductsPagination({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  const searchParams = useSearchParams() || new URLSearchParams();

  const pages = [...new Array(totalPages > 10 ? 10 : totalPages)].map((_, index) => {
    const start = currentPage > 5 ? currentPage - 5 : 1;
    const page = index + start;
    const isActive = page === currentPage;
    return {
      page,
      isActive
    }
  }).filter(({ page }) => page <= totalPages)

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-end">
      <nav className="inline-flex">
        <Link href={`/products?${setQueryParams({ page: currentPage - 1 }, searchParams)}`} className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 flex items-center justify-center">
          <FiChevronLeft />
        </Link>
        {pages.map(({ isActive, page }) => {
          return (
            <Link
              key={page}
              href={`/products?${setQueryParams({ page }, searchParams)}`}
              className={`px-3 py-2 text-sm font-medium ${isActive
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
            >
              {page}
            </Link>
          )
        })}
        {totalPages > 10 && (
          <>
            <button
              className={`px-3 py-2 text-sm font-medium bg-white text-gray-500 hover:bg-gray-50`}
            >
              ...
            </button>
            <Link
              href={`/products?${setQueryParams({ page: totalPages }, searchParams)}`}
              className={`px-3 py-2 text-sm font-medium ${totalPages === currentPage
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
            >
              {totalPages}
            </Link>
          </>
        )}
        <Link href={`/products?${setQueryParams({ page: currentPage + 1 }, searchParams)}`} className="px-3 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 flex items-center justify-center">
          <FiChevronRight />
        </Link>
      </nav>
    </div>
  );
}
