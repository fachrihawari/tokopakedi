function ProductsListPlaceholder() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="bg-gray-200 h-64 rounded"></div>
      ))}
    </div>
  );
}

export default ProductsListPlaceholder;
