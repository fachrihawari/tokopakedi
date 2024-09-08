

function SectionProductsPlaceholder() {
  return (
    <div className="animate-pulse py-8 container mx-auto px-4">
      <div className="h-8 bg-gray-200 rounded w-1/6 mb-4"></div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 h-64 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export default SectionProductsPlaceholder;
