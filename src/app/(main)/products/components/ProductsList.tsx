import ProductCard from "@/components/ProductCard";
import ProductsPagination from "./ProductsPagination";
import { getProducts } from "@/actions/products";

type ListProps = {
  searchParams: {
    q: string,
    page: number
  }
}
async function ProductsList({ searchParams }: ListProps) {
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
