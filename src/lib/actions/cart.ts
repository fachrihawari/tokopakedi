'use server'

import { cookies } from "next/headers";
import { Cart } from "@/lib/db/cart_collection";
import { isLoggedIn } from "@/lib/utils/auth";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { setQueryParams } from "../utils/url";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function getCart(): Promise<Cart> {
  if (!isLoggedIn()) {
    return { items: [], _id: new ObjectId(), userId: new ObjectId(), totalAmount: 0 }
  }
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/cart`, {
    headers: {
      Cookie: cookies().toString()
    },
    next: {
      tags: ['cart']
    }
  });

  return res.json()
}

export async function addToCart(productId: string, quantity: number) {
  await fetch(`${NEXT_PUBLIC_URL}/api/cart/${productId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidateTag('cart')

  const successQuery = setQueryParams({ type: 'success', title: "Added to Cart", message: "The product has been added to your cart." });
  redirect('/cart?' + successQuery);
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  await fetch(`${NEXT_PUBLIC_URL}/api/cart/${productId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidateTag('cart')
}

export async function removeFromCart(productId: string) {
  await fetch(`${NEXT_PUBLIC_URL}/api/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidateTag('cart')

  const successQuery = setQueryParams({ type: 'success', title: "Removed from Cart", message: "The product has been removed from your cart." });
  redirect('/cart?' + successQuery);
}