'use server'

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import { setQueryParams } from "@/lib/utils/url";
import { Order } from "@/lib/db/order_collection";
import { isLoggedIn } from "./users";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const createOrder = async () => {
  if (!await isLoggedIn()) return

  const res = await fetch(`${NEXT_PUBLIC_URL}/api/orders`, {
    method: 'POST',
    headers: {
      Cookie: cookies().toString()
    }
  });

  if (!res.ok) {
    const errorQuery = setQueryParams({ type: 'error', title: "Failed to checkout", message: "Please try again" });
    return redirect('/cart?' + errorQuery);
  }

  revalidateTag('cart')
  
  const data = await res.json()
  redirect(`/payment/${data.paymentToken}`)
}

export const getOrders = async (): Promise<Order[]> => {
  if (!await isLoggedIn()) return []

  const res = await fetch(`${NEXT_PUBLIC_URL}/api/orders`, {
    headers: {
      Cookie: cookies().toString()
    },
    next: {
      tags: ['orders']
    }
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json()
  return data
}