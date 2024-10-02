import { getOrders } from "@/lib/actions/orders";
import OrdersEmpty from './components/OrdersEmpty';
import OrdersList from './components/OrdersList';
import { isLoggedIn } from '@/lib/actions/users';
import OrdersNotLoggedIn from './components/OrdersNotLoggedIn';

export default async function OrdersPage() {
  const orders = await getOrders();

  let content;

  if (!await isLoggedIn()) {
    content = <OrdersNotLoggedIn />
  } else if (orders.length === 0) {
    content = <OrdersEmpty />
  } else {
    content = <OrdersList orders={orders} />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Orders
      </h1>
      {content}
    </div>
  );
}
