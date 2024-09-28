'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { setQueryParams } from "@/lib/utils/url";
import { Order } from "@/lib/db/order_collection";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const createOrder = async () => {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/orders`, {
    method: 'POST',
    headers: {
      Cookie: cookies().toString()
    }
  });

  if (!res.ok) {
    const errorQuery = setQueryParams({ type: 'error', title: "Error", message: "Failed to checkout" });
    return redirect('/cart?' + errorQuery);
  }

  revalidateTag('cart')

  const data = await res.json()
  return data
}

export const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/orders`, {
    headers: {
      Cookie: cookies().toString()
    }
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json()
  return data
}