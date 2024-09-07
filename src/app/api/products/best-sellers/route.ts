import { NextResponse } from "next/server";

export async function GET() {
  const products = [
    {
      "id": 1,
      "name": "Breville Smart Oven Air Fryer",
      "description": "Versatile countertop oven with air frying, toasting, baking, and roasting capabilities.",
      "thumbnail": "https://example.com/images/breville-smart-oven.jpg",
      "price": 399.99,
      "discount": 10
    },
    {
      "id": 2,
      "name": "Nintendo Switch Pro Controller",
      "description": "A premium controller for the Nintendo Switch, offering precision and comfort for long gaming sessions.",
      "thumbnail": "https://example.com/images/switch-pro-controller.jpg",
      "price": 69.99,
      "discount": 5
    },
    {
      "id": 3,
      "name": "Roomba i7+ Robot Vacuum",
      "description": "Self-emptying robot vacuum with smart mapping technology and powerful suction for a deeper clean.",
      "thumbnail": "https://example.com/images/roomba-i7.jpg",
      "price": 799.99,
      "discount": 10
    },
    {
      "id": 4,
      "name": "HP Envy 34 All-in-One Desktop",
      "description": "Stylish and powerful all-in-one desktop with a 34-inch curved display, Intel i9 processor, and 1TB SSD.",
      "thumbnail": "https://example.com/images/hp-envy-34.jpg",
      "price": 2499.99,
      "discount": 10
    },
    {
      "id": 5,
      "name": "Peloton Bike+",
      "description": "Interactive indoor cycling bike with a rotating touchscreen, live and on-demand classes, and auto resistance.",
      "thumbnail": "https://example.com/images/peloton-bike-plus.jpg",
      "price": 2495.00,
      "discount": 0
    }
  ]

  await new Promise(resolve => setTimeout(resolve, 5000));
  return NextResponse.json(products);
}
