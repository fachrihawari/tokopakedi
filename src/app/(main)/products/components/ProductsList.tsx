import { getProducts } from "@/actions/products";
import ProductCard from "@/components/ProductCard";
import ProductsPagination from "./ProductsPagination";

export type ProductsListProps = {
  searchParams: {
    q: string,
    page: number,
    rating: number,
    priceRange: string,
    categories: string[]
  }
}
async function ProductsList({ searchParams }: ProductsListProps) {
  const { products, pagination } = await getProducts(searchParams);
  const { currentPage, totalPages } = pagination;

  return (
    <>
      {products.length > 0 ?
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id?.toString()} product={product} />
          ))}
        </div>
        :
        <div className="text-center text-gray-500">No products found</div>
      }

      <ProductsPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}

export default ProductsList;
