import { cookies } from 'next/headers';
import CartNotLoggedIn from './components/CartNotLoggedIn';
import CartEmpty from './components/CartEmpty';
import CartItems from './components/CartItems';
import { getCart } from '@/lib/actions/cart';

export default async function CartPage() {
  const isLoggedIn = cookies().get('token'); // Replace this with actual authentication check
  const cart = await getCart();

  let content;

  if (!isLoggedIn) {
    content = <CartNotLoggedIn />
  } else if (cart.length === 0) {
    content = <CartEmpty />
  } else {
    content = <CartItems initialCart={cart} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {content}
    </div>
  );
}
