import { Order } from "@/lib/db/order_collection";

interface OrderStatusProps {
  status: Order['status'];
}

export default function OrderStatus({ status }: OrderStatusProps) {
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'paid':
        return 'Completed';
      case 'pending':
        return 'Waiting Payment';
      default:
        return 'Cancelled';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
}