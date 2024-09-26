import { NextRequest, NextResponse } from "next/server";
import midtransSnap from "@/lib/payment/midtrans";
import { MidtransNotification, Order, ordersCollection } from "@/lib/db/order_collection";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await midtransSnap.transaction.notification(body);
    const { order_id: orderId, transaction_status: transactionStatus, fraud_status: fraudStatus } = response;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    const orderStatus = getOrderStatus(transactionStatus, fraudStatus);

    await updateOrderStatus(orderId, orderStatus, body);

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    console.error('Error processing payment notification:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

function getOrderStatus(transactionStatus: string, fraudStatus: string): Order['status'] {
  if ((transactionStatus === 'capture' && fraudStatus === 'accept') || transactionStatus === 'settlement') {
    return 'paid';
  } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
    return 'cancelled';
  } else if (transactionStatus === 'pending') {
    return 'pending';
  }
  
  throw new Error(`Unknown transaction status: ${transactionStatus}`);
}

async function updateOrderStatus(orderId: string, status: Order['status'], notificationBody: MidtransNotification) {
  const result = await ordersCollection.updateOne(
    { _id: new ObjectId(orderId) },
    {
      $set: {
        status,
        "payment.notification": notificationBody
      }
    }
  );

  if (result.matchedCount === 0) {
    throw new Error(`Order not found: ${orderId}`);
  }
}