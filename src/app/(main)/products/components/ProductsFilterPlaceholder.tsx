export default function ProductsFilterPlaceholder() {
  return (
    <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4 sticky top-20 self-start">
      <h2 className="text-lg font-bold mb-2">Filter</h2>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  )
}
