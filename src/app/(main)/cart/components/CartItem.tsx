import Image from "next/image";
import { formatCurrency } from "@/lib/utils/number";
import { CartItem as CartItemType } from '@/lib/db/cart_collection';
import { CartItemAction } from "./CartItemAction";

type CartItemProps = {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex items-center py-6 border-b border-gray-200 last:border-b-0 bg-white rounded-lg mb-4 overflow-hidden transition-all duration-300">
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-md overflow-hidden relative ml-4">
        <Image 
          src={item.thumbnail} 
          alt={item.name} 
          layout="fill" 
          objectFit="cover" 
          className="transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="ml-6 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <div className="mt-2 flex items-center space-x-4">
          <p className="text-sm text-gray-600">Unit Price: <span className="text-gray-800 font-medium">{formatCurrency(item.price)}</span></p>
          <p className="text-sm text-gray-600">Quantity: <span className="text-gray-800 font-medium">{item.quantity}</span></p>
        </div>
        <p className="mt-2 text-md text-gray-700">Total: <span className="text-gray-900 font-bold">{formatCurrency(item.price * item.quantity)}</span></p>
      </div>
      <div className="mr-4">
        <CartItemAction item={item} />
      </div>
    </div>
  );
}
