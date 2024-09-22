import CartNotLoggedIn from './components/CartNotLoggedIn';
import CartEmpty from './components/CartEmpty';
import CartItems from './components/CartItems';
import { getCart } from '@/lib/actions/cart';
import { isLoggedIn } from '@/lib/utils/auth';

export default async function CartPage() {
  const cart = await getCart();
  
  let content;
  
  if (!isLoggedIn()) {
    content = <CartNotLoggedIn />
  } else if (cart.items.length === 0) {
    content = <CartEmpty />
  } else {
    content = <CartItems cartItems={cart.items} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {content}
    </div>
  );
}
