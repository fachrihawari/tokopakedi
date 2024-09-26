'use server'

import { cookies } from "next/headers";
import { setQueryParams } from "../utils/url";
import { redirect } from "next/navigation";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL

export const checkout = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000))
  return {
    paymentToken: "f39dbe10-2dc5-4b41-8359-a17d6dc2e5eb"
  }

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

  const data = await res.json()
  return data
}