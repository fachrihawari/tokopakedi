
export async function getLanding() {
  const res = await fetch('http://localhost:3000/api/products/landing');
  return res.json();
}

export async function getBestSellers() {
  const res = await fetch('http://localhost:3000/api/products/best-sellers');
  return res.json();
}

