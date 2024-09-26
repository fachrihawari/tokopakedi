import CartNotLoggedIn from './components/CartNotLoggedIn';
import CartEmpty from './components/CartEmpty';
import CartItems from './components/CartItems';
import { getCart } from '@/lib/actions/cart';
import { isLoggedIn } from '@/lib/utils/auth';
import CartSummary from './components/CartSummary';

export default async function CartPage() {
  const cart = await getCart();

  let content;

  if (!isLoggedIn()) {
    content = <CartNotLoggedIn />
  } else if (cart.items.length === 0) {
    content = <CartEmpty />
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CartItems cartItems={cart.items} />
        <CartSummary cartItems={cart.items} />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {content}
    </div>
  );
}
