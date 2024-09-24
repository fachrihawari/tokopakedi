import Image from "next/image";
import { formatCurrency } from "@/lib/utils/number";
import { CartItem as CartItemType } from '@/lib/db/cart_collection';
import { CartItemAction } from "./CartItemAction";

type CartItemProps = {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center py-6 px-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative mb-4 sm:mb-0">
        <Image 
          src={item.thumbnail} 
          alt={item.name} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex-1 sm:ml-6 text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
        <p className="text-sm text-gray-600 mb-1">Unit Price: <span className="text-gray-800 font-medium">{formatCurrency(item.price)}</span></p>
        <p className="text-md text-gray-700">Total: <span className="text-gray-900 font-bold">{formatCurrency(item.price * item.quantity)}</span></p>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-4">
        <CartItemAction item={item} />
      </div>
    </div>
  );
}
