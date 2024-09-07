import type { Product } from "@/db/product_collection";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {

  const priceElement = product.discount ? (
    <>
      <p className="font-bold text-green-600">
        Rp {Math.round(product.price * (1 - product.discount / 100)).toLocaleString()}
      </p>
      <div className="flex text-xs items-center">
        <span className="text-sm text-gray-600 line-through">
          Rp {product.price.toLocaleString()}
        </span>
        <span className="text-red-600 text-xs font-bold px-2 py-1 rounded">
          {product.discount}%
        </span>
      </div>
    </>
  ) : (
    <p className="font-bold text-gray-600">
      Rp {product.price.toLocaleString()}
    </p>
  )

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={product.thumbnail} alt={product.name} width={200} height={200} className="w-full h-48 object-cover" />
      <div className="p-4 gap-2">
        <h3 className="text-base text-gray-800 truncate">{product.name}</h3>
        {priceElement}
      </div>
    </div>
  )
}

export default ProductCard;
