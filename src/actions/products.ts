export async function getLatest() {
  const res = await fetch('http://localhost:3000/api/products/latest', {
    cache: 'no-store',
  });
  return res.json();
}

export async function getBestSellers() {
  const res = await fetch('http://localhost:3000/api/products/best-sellers', {
    cache: 'no-store',
  });
  return res.json();
}

