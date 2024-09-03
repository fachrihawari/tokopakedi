import { NextResponse } from "next/server";


export async function GET() {
  const products = [
    { id: 1, name: "Smartphone X", thumbnail: "/img/products/smartphone.webp", price: 5999000, discount: 20 },
    { id: 2, name: "Laptop Pro", thumbnail: "/img/products/laptop.webp", price: 12999000, discount: 10 },
    { id: 3, name: "Wireless Earbuds", thumbnail: "/img/products/earbuds.webp", price: 899000, discount: 30 },
    { id: 4, name: "Smart Watch", thumbnail: "/img/products/smartwatch.webp", price: 2499000, discount: 15 },
    { id: 5, name: "4K TV", thumbnail: "/img/products/tv.webp", price: 8999000, discount: 25 }
  ];

  return NextResponse.json(products);
}
