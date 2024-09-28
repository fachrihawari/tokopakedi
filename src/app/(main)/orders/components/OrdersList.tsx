import { Order } from "@/lib/db/order_collection";
import OrderItem from './OrderItem';

export default function OrdersList({ orders }: { orders: Order[] }) {
  return (
    <ul className="space-y-6">
      {orders.map((order) => (
        <OrderItem key={order._id.toString()} order={order} />
      ))}
    </ul>
  );
}