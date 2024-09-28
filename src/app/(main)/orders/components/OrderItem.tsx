'use client'
import { useState } from 'react';
import Image from 'next/image';
import { FiCalendar, FiPackage, FiChevronUp, FiChevronRight } from "react-icons/fi";
import { Order } from "@/lib/db/order_collection";
import { formatDateTime } from '@/lib/utils/date';
import { formatCurrency } from '@/lib/utils/number';
import OrderStatus from './OrderStatus';
import { useMidtrans } from '@/lib/hooks/useMidtrans';
import Link from 'next/link';

interface OrderItemProps {
  order: Order;
}

export default function OrderItem({ order }: OrderItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isReady, pay } = useMidtrans();

  const toggleOrderExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePayNow = () => {
    if (isReady && order.payment?.token) {
      pay(order.payment.token);
    }
  };

  return (
    <li className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="font-medium">Order #{order._id.toString().toUpperCase()}</span>
        <div className="flex items-center">
          <OrderStatus status={order.status} />
          {order.status === 'pending' && (
            <button
              onClick={handlePayNow}
              className="ml-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded text-sm transition duration-300"
            >
              Pay Now
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center text-gray-600">
          <FiCalendar className="mr-2 h-4 w-4" />
          <span>Ordered on {formatDateTime(order.createdAt.toString())}</span>
        </div>
        <div className="flex items-center text-gray-600 justify-end">
          <span className="font-medium">Total: {formatCurrency(order.total)}</span>
        </div>
      </div>
      <button
        onClick={toggleOrderExpansion}
        className="w-full text-left flex items-center justify-between text-gray-600 hover:text-gray-800 transition duration-300"
      >
        <span className="flex items-center">
          <FiPackage className="mr-2 h-4 w-4" />
          Items in Your Order ({order.products.length})
        </span>
        {isExpanded ? <FiChevronUp /> : <FiChevronRight />}
      </button>
      {isExpanded && (
        <div className="bg-gray-50 rounded p-3 mt-2">
          <ul className="space-y-2">
            {order.products.map((product) => (
              <li key={product.productId.toString()} className="flex justify-between items-center text-sm">
                <Link className='flex items-center' href={`/products/${product.productId}`}>
                  <Image
                    src={product.thumbnail}
                    alt={product.name}
                    width={40}
                    height={40}
                    className="mr-2 rounded-sm object-cover"
                  />
                  <span>{product.name}</span>
                </Link>
                <span className="text-gray-600">
                  {product.quantity} x {formatCurrency(product.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}