'use server'

import { cookies } from "next/headers";
import { Cart } from "@/lib/db/cart_collection";
import { isLoggedIn } from "@/lib/actions/users";
import { ObjectId } from "mongodb";
import { revalidateTag } from "next/cache";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function getCart(): Promise<Cart> {
  if (!await isLoggedIn()) {
    return { items: [], _id: new ObjectId(), userId: new ObjectId() }
  }
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/cart`, {
    headers: {
      Cookie: cookies().toString()
    },
    next: {
      tags: ['cart']
    }
  });

  if (!res.ok) { // if failed to get cart from server
    return { items: [], _id: new ObjectId(), userId: new ObjectId() }
  }

  return res.json()
}

export async function addToCart(productId: string, quantity: number) {
  if (!await isLoggedIn()) return

  await fetch(`${NEXT_PUBLIC_URL}/api/cart/${productId}`, {
    method: 'POST',
    body: JSON.stringify({ quantity }),
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidateTag('cart')
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  if (!await isLoggedIn()) return

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
  if (!await isLoggedIn()) return

  await fetch(`${NEXT_PUBLIC_URL}/api/cart/${productId}`, {
    method: 'DELETE',
    headers: {
      Cookie: cookies().toString()
    }
  });

  revalidateTag('cart')
}
