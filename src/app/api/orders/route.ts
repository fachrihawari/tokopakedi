import { ObjectId } from "mongodb";
import { OrderForm, OrderSchema, ordersCollection } from "@/lib/db/order_collection";
import { NextRequest, NextResponse } from "next/server";
import { cartsCollection } from "@/lib/db/cart_collection";
import { usersCollection } from "@/lib/db/user_collection";
import midtransSnap from "@/lib/payment/midtrans";
import { client } from "@/lib/db/client";
export async function GET(req: NextRequest) {
  const userId = String(req.headers.get("x-user-id"))
  const orders = await ordersCollection.find({ userId: new ObjectId(userId) }).toArray()
  return NextResponse.json(orders)
}

export async function POST(req: NextRequest) {
  const userId = String(req.headers.get("x-user-id"))

  const session = client.startSession()
  try {
    session.startTransaction()
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const cart = await cartsCollection.findOne({ userId: new ObjectId(userId) }, { session })
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    // Create a new order
    const newOrder: OrderForm = {
      userId: new ObjectId(userId),
      products: cart.items,
      total: cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    OrderSchema.parse(newOrder)

    // Insert the order into the database
    const result = await ordersCollection.insertOne(newOrder, { session });

    // Clear cart
    await cartsCollection.updateOne(
      { userId: new ObjectId(userId) },
      {
        $set: { items: [] }
      },
      { session }
    )

    const transactionDetails = {
      order_id: result.insertedId.toString(),
      gross_amount: newOrder.total
    };

    const itemDetails = newOrder.products.map((product: any) => ({
      id: product.productId,
      price: product.price,
      quantity: product.quantity,
      name: product.name
    }));

    const customerDetails = {
      first_name: user.name,
      email: user.email
    };

    const midtransParameter = {
      transaction_details: transactionDetails,
      item_details: itemDetails,
      customer_details: customerDetails
    };

    // Create Midtrans transaction
    const transaction = await midtransSnap.createTransaction(midtransParameter);

    await ordersCollection.updateOne({ _id: result.insertedId }, { $set: { payment: { token: transaction.token } } }, { session })

    await session.commitTransaction()

    // Return the Midtrans token
    return NextResponse.json({
      orderId: result.insertedId,
      paymentToken: transaction.token
    }, { status: 201 });

  } catch (error) {
    await session.abortTransaction()
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  } finally {
    await session.endSession()
  }
}