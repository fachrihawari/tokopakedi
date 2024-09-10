import { getProductsFacets } from "@/actions/products";
import { formatCurrency, formatCompactNumber } from "@/utils/number";
import { headers } from "next/headers";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";

type ProductsFilterProps = {
  searchParams: {
    q: string
  }
}
export default async function ProductsFilter({ searchParams }: ProductsFilterProps) {
  const { priceRanges, categories } = await getProductsFacets(searchParams);
  return (
    <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4 sticky top-20 self-start">
      <h2 className="text-lg font-bold mb-2">Filter</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <form>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
            <div className="space-y-2">
              {
                categories.map((category) => (
                  <label key={category._id} className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2 w-4 h-4" value={category._id} />
                      <span>{category._id}</span>
                    </div>
                    <span className="bg-gray-200 text-gray-700 text-center min-w-6 px-2 py-1 rounded-full text-xs font-medium">
                      {formatCompactNumber(category.count)}
                    </span>
                  </label>
                ))
              }
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rentang Harga</label>
            <div className="flex flex-col space-y-2">
              <input type="number" placeholder="Rp Min" className="w-full p-2 border rounded text-sm" />
              <input type="number" placeholder="Rp Max" className="w-full p-2 border rounded text-sm" />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {priceRanges.map(pr => {
                return (
                  <span key={JSON.stringify(pr._id)} className="bg-white text-gray-700 text-sm font-medium px-3 py-2 rounded border border-gray-300 hover:border-green-500 cursor-pointer transition-colors duration-200">
                    {formatCurrency(pr._id.min)} - {formatCurrency(pr._id.max)}
                  </span>

                )
              })}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
            <div className="space-y-2">
              {[5, 4, 3].map((rating) => (
                <label key={rating} className="flex items-center text-sm">
                  <input type="radio" name="rating" className="mr-2 w-4 h-4" />
                  <IoMdStar size={18} className="text-yellow-500 mr-1" />
                  {rating}  {rating < 5 && 'ke atas'}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col text-center">
            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-sm font-medium">
              Terapkan Filter
            </button>
            <Link href='/products' className="w-full text-green-500 bg-white py-2 px-4 rounded border border-green-500 text-sm font-medium mt-2">
              Reset Filter
            </Link>
          </div>
        </form>
      </div>
    </div>

  );
}
