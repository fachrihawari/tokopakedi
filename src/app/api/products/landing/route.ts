import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      id: 1,
      "name": "Apple iPhone 14",
      "description": "The latest iPhone with advanced features such as a 6.1-inch display, A15 Bionic chip, and improved battery life.",
      "thumbnail": "https://example.com/images/iphone-14.jpg",
      "price": 999.99,
      "discount": 10
    },
    {
      id: 2,
      "name": "Samsung 65-inch QLED 4K Smart TV",
      "description": "Stunning 4K resolution with QLED technology and built-in smart features for a premium viewing experience.",
      "thumbnail": "https://example.com/images/samsung-qled-tv.jpg",
      "price": 1200.00,
      "discount": 15
    },
    {
      id: 3,
      "name": "Dyson V15 Cordless Vacuum Cleaner",
      "description": "Powerful suction for a deeper clean, now with laser detection to reveal microscopic dust.",
      "thumbnail": "https://example.com/images/dyson-vacuum.jpg",
      "price": 699.99,
      "discount": 5
    },
    {
      id: 4,
      "name": "Nintendo Switch OLED Model",
      "description": "Play at home or on the go with the enhanced OLED screen for richer colors and deeper contrast.",
      "thumbnail": "https://example.com/images/nintendo-switch-oled.jpg",
      "price": 349.99,
      "discount": 0
    },
    {
      id: 5,
      "name": "Instant Pot Duo 7-in-1 Pressure Cooker",
      "description": "Versatile kitchen appliance that can pressure cook, slow cook, sauté, steam, and more.",
      "thumbnail": "https://example.com/images/instant-pot-duo.jpg",
      "price": 89.99,
      "discount": 20
    }
  ]

  await new Promise(resolve => setTimeout(resolve, 2000));

  return NextResponse.json(products);
}
