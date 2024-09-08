import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductsPagination({ currentPage, totalPages }: { currentPage: number, totalPages: number }) {
  return (

    <div className="mt-8 flex justify-end">
      <nav className="inline-flex">
        <Link href={`/products?page=${currentPage - 1}`} className="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">
          <FiChevronLeft />
        </Link>
        {[...new Array(totalPages > 10 ? 10 : totalPages)].map((_, index) => {
          const newPage = index + 1;
          const isActive = newPage === currentPage;
          return (
            <Link
              key={newPage}
              href={`/products?page=${newPage}`}
              className={`px-3 py-2 text-sm font-medium ${isActive
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
            >
              {newPage}
            </Link>
          )
        })}
        <button
          className={`px-3 py-2 text-sm font-medium bg-white text-gray-500 hover:bg-gray-50`}
        >
          ...
        </button>
        <Link
          href={`/products?page=${totalPages}`}
          className={`px-3 py-2 text-sm font-medium ${totalPages === currentPage
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
        >
          {totalPages}
        </Link>
        <Link href={`/products?page=${currentPage + 1}`} className="px-3 py-2 rounded-r-md bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <FiChevronRight />
        </Link>
      </nav>
    </div>
  );
}
