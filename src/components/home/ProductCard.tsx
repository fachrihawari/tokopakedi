import Image from "next/image";

export interface FlashSaleProduct {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  discountPercentage: number;
}

interface ProductCardProps {
  product: FlashSaleProduct;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="w-full h-48 object-cover" />
      <div className="p-4 gap-2">
        <h3 className="text-base text-gray-800 truncate">{product.name}</h3>
        <p className="font-bold text-green-500">
          Rp {Math.round(product.price * (1 - product.discountPercentage / 100)).toLocaleString()}
        </p>
        <div className="flex text-xs items-center">
          <span className="text-sm text-gray-500 line-through">
            Rp {product.price.toLocaleString()}
          </span>
          <span className="text-red-500 text-xs font-bold px-2 py-1 rounded">
            {product.discountPercentage}%
          </span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard;
