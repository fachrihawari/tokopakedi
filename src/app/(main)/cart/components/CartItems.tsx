import type { CartItem as CartItemType } from "@/lib/db/cart_collection";
import { CartItem } from "./CartItem";

type CartItemsProps = {
  cartItems: CartItemType[]
}

export default function CartItems({ cartItems }: CartItemsProps) {
  return (
    <div className="md:col-span-2 bg-white rounded-lg flex flex-col gap-4">
      {cartItems.map((item) => (
        <CartItem
          key={item.productId.toString()}
          item={item}
        />
      ))}
    </div>
  );
}