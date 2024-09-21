import { Cart } from "../db/cart_collection";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

export async function getCart(): Promise<Cart> {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/carts`, {
    cache: 'no-store',
  });
  return res.json();
}

export async function addToCart(productId: string, quantity: number) {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/carts`, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
    cache: 'no-store',
  });
  return res.json();
}

export async function updateCartItemQuantity(productId: string, quantity: number) {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/carts`, {
    method: 'PUT',
    body: JSON.stringify({ quantity, productId }),
    cache: 'no-store',

  });
  return res.json();
}

export async function removeFromCart(productId: string) {
  const res = await fetch(`${NEXT_PUBLIC_URL}/api/carts`, {
    method: 'DELETE',
    body: JSON.stringify({ productId }),
    cache: 'no-store',
  });
  return res.json();
}