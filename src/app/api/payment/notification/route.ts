import { NextRequest, NextResponse } from "next/server";
import midtransSnap from "@/lib/payment/midtrans";
import { MidtransNotification, Order, ordersCollection } from "@/lib/db/order_collection";
import { ObjectId } from "mongodb";
import { client } from "@/lib/db/client";
import { productsCollection } from "@/lib/db/product_collection";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.order_id.includes('test')) {
      return NextResponse.json({ message: 'OK' }, { status: 200 });
    }

    const response = await midtransSnap.transaction.notification(body);
    const { order_id: orderId, transaction_status: transactionStatus, fraud_status: fraudStatus } = response;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    const orderStatus = getOrderStatus(transactionStatus, fraudStatus);

    await updateOrderStatus(orderId, orderStatus, body);

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
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
  const session = client.startSession()

  try {
    session.startTransaction()

    const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) }, { session })

    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // Decrease stock and increase sales
    if (status === 'paid') {

      // I can't use Promise.all because of use transaction
      // to avoid the risk of deadlocking the database
      for (const product of order.products) {
        await productsCollection.updateOne(
          { _id: new ObjectId(product.productId) },
          {
            $inc: {
              stock: product.quantity * -1,
              sales: product.quantity
            }
          },
          { session }
        )
      }
    }

    // Update order status & payment notification
    await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status,
          "payment.notification": notificationBody
        }
      },
      { session }
    );

    await session.commitTransaction()
  } catch (error) {
    console.error(`Error updating order status: ${error}`);
    await session.abortTransaction()
    throw error;
  } finally {
    await session.endSession()
  }
}