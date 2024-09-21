import type { Product } from "@/lib/db/product_collection";
import { formatCompactNumber, formatCurrency } from "@/lib/utils/number";
import Image from "next/image";
import Link from "next/link";
import { IoMdStar } from "react-icons/io";
import AddToCartButton from "./AddToCartButton";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {

  const priceElement = product.discount ? (
    <>
      <div className="flex items-center mb-1">
        <p className="text-green-600 font-bold text-base mr-2">
          {formatCurrency(product.price * (1 - product.discount / 100))}
        </p>
        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
          {product.discount}%
        </span>
      </div>
      <p className="text-gray-600 text-xs line-through mb-1">
        {formatCurrency(product.price)}
      </p>
    </>
  ) : (
    <p className="text-gray-600 font-bold text-base mb-1">
      {formatCurrency(product.price)}
    </p>
  )

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link href={`/products/${product.slug}`}>
        <Image src={product.thumbnail} alt={product.name} width={200} height={200} className="w-full h-40 object-cover" />
        <div className="p-3">
          <h3 className="text-sm font-medium mb-1 truncate">{product.name}</h3>
          {priceElement}
          <div className="flex items-center mb-2 text-xs text-gray-600">
            <IoMdStar size={18} className="text-yellow-500 mr-1" />
            <span>{product.rating.value}</span>
            <span className="mx-1">|</span>
            <span>Terjual {formatCompactNumber(product.sales)}</span>
          </div>
        </div>
      </Link>
      <div className="px-3 pb-3">
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}

export default ProductCard;
