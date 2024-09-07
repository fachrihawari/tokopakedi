import { NextResponse } from "next/server";


export async function GET() {
  const products = [
    {
      "name": "Apple iPhone 14",
      "description": "The latest iPhone with advanced features such as a 6.1-inch display, A15 Bionic chip, and improved battery life.",
      "thumbnail": "https://example.com/images/iphone-14.jpg",
      "price": 999.99,
      "discount": 10
    },
    {
      "name": "Samsung 65-inch QLED 4K Smart TV",
      "description": "Stunning 4K resolution with QLED technology and built-in smart features for a premium viewing experience.",
      "thumbnail": "https://example.com/images/samsung-qled-tv.jpg",
      "price": 1200.00,
      "discount": 15
    },
    {
      "name": "Dyson V15 Cordless Vacuum Cleaner",
      "description": "Powerful suction for a deeper clean, now with laser detection to reveal microscopic dust.",
      "thumbnail": "https://example.com/images/dyson-vacuum.jpg",
      "price": 699.99,
      "discount": 5
    },
    {
      "name": "Nintendo Switch OLED Model",
      "description": "Play at home or on the go with the enhanced OLED screen for richer colors and deeper contrast.",
      "thumbnail": "https://example.com/images/nintendo-switch-oled.jpg",
      "price": 349.99,
      "discount": 0
    },
    {
      "name": "Instant Pot Duo 7-in-1 Pressure Cooker",
      "description": "Versatile kitchen appliance that can pressure cook, slow cook, sauté, steam, and more.",
      "thumbnail": "https://example.com/images/instant-pot-duo.jpg",
      "price": 89.99,
      "discount": 20
    },
    {
      "name": "Sony PlayStation 5",
      "description": "The latest PlayStation console with ultra-fast SSD and 4K gaming experience.",
      "thumbnail": "https://example.com/images/ps5.jpg",
      "price": 499.99,
      "discount": 0
    },
    {
      "name": "Bose QuietComfort 45 Wireless Headphones",
      "description": "Noise-canceling wireless headphones with premium sound quality and long battery life.",
      "thumbnail": "https://example.com/images/bose-qc45.jpg",
      "price": 329.99,
      "discount": 10
    },
    {
      "name": "Fitbit Charge 5 Advanced Health Tracker",
      "description": "Track your health and fitness with advanced sensors for heart rate, sleep, and stress management.",
      "thumbnail": "https://example.com/images/fitbit-charge-5.jpg",
      "price": 149.99,
      "discount": 5
    },
    {
      "name": "Keurig K-Elite Coffee Maker",
      "description": "Single-serve coffee maker with iced coffee capabilities and customizable brew settings.",
      "thumbnail": "https://example.com/images/keurig-k-elite.jpg",
      "price": 169.99,
      "discount": 15
    },
    {
      "name": "Roku Streaming Stick 4K",
      "description": "Stream your favorite shows in stunning 4K with a simple, easy-to-use interface.",
      "thumbnail": "https://example.com/images/roku-stick.jpg",
      "price": 49.99,
      "discount": 20
    },
    {
      "name": "Apple MacBook Pro 13-inch M2",
      "description": "Powerful laptop with the latest M2 chip, Retina display, and all-day battery life.",
      "thumbnail": "https://example.com/images/macbook-pro-m2.jpg",
      "price": 1299.99,
      "discount": 5
    },
    {
      "name": "Samsung Galaxy Tab S8 Ultra",
      "description": "A powerful Android tablet with a 14.6-inch AMOLED screen, S Pen, and 5G connectivity.",
      "thumbnail": "https://example.com/images/galaxy-tab-s8.jpg",
      "price": 1099.99,
      "discount": 10
    },
    {
      "name": "GoPro HERO11 Black",
      "description": "Capture stunning 5.3K video and 23MP photos with this waterproof action camera.",
      "thumbnail": "https://example.com/images/gopro-hero11.jpg",
      "price": 499.99,
      "discount": 10
    },
    {
      "name": "KitchenAid Artisan Stand Mixer",
      "description": "Versatile stand mixer with 10 speeds and a 5-quart stainless steel bowl for mixing, kneading, and more.",
      "thumbnail": "https://example.com/images/kitchenaid-stand-mixer.jpg",
      "price": 449.99,
      "discount": 15
    },
    {
      "name": "LEGO Star Wars Millennium Falcon",
      "description": "Iconic Millennium Falcon LEGO set with over 7,500 pieces for endless fun.",
      "thumbnail": "https://example.com/images/lego-millennium-falcon.jpg",
      "price": 799.99,
      "discount": 5
    },
    {
      "name": "Sony WH-1000XM5 Wireless Headphones",
      "description": "High-end noise-canceling headphones with crystal-clear sound and touch controls.",
      "thumbnail": "https://example.com/images/sony-wh1000xm5.jpg",
      "price": 399.99,
      "discount": 10
    },
    {
      "name": "Oculus Quest 2 VR Headset",
      "description": "Wireless virtual reality headset with immersive experiences and intuitive controls.",
      "thumbnail": "https://example.com/images/oculus-quest-2.jpg",
      "price": 299.99,
      "discount": 0
    },
    {
      "name": "Canon EOS R5 Mirrorless Camera",
      "description": "Capture stunning photos and 8K video with this high-performance mirrorless camera.",
      "thumbnail": "https://example.com/images/canon-eos-r5.jpg",
      "price": 3899.99,
      "discount": 5
    },
    {
      "name": "Nespresso Vertuo Next Coffee Maker",
      "description": "Make barista-quality espresso and coffee at home with this versatile Nespresso machine.",
      "thumbnail": "https://example.com/images/nespresso-vertuo-next.jpg",
      "price": 199.99,
      "discount": 15
    },
    {
      "name": "Tile Pro Bluetooth Tracker",
      "description": "Keep track of your belongings with this powerful Bluetooth tracker that works with your smartphone.",
      "thumbnail": "https://example.com/images/tile-pro.jpg",
      "price": 34.99,
      "discount": 10
    },
    {
      "name": "Anker PowerCore 10000mAh Portable Charger",
      "description": "Compact and high-capacity portable charger for charging your devices on the go.",
      "thumbnail": "https://example.com/images/anker-powercore.jpg",
      "price": 29.99,
      "discount": 20
    },
    {
      "name": "JBL Flip 6 Portable Bluetooth Speaker",
      "description": "Waterproof Bluetooth speaker with powerful sound and long battery life, perfect for on-the-go use.",
      "thumbnail": "https://example.com/images/jbl-flip-6.jpg",
      "price": 129.99,
      "discount": 10
    },
    {
      "name": "Ring Video Doorbell 4",
      "description": "Smart doorbell with 1080p video, motion detection, and two-way audio for enhanced home security.",
      "thumbnail": "https://example.com/images/ring-video-doorbell.jpg",
      "price": 199.99,
      "discount": 15
    },
    {
      "name": "Theragun Prime Percussive Therapy Device",
      "description": "Relieve muscle tension and pain with this powerful percussive therapy device for recovery and relaxation.",
      "thumbnail": "https://example.com/images/theragun-prime.jpg",
      "price": 299.99,
      "discount": 10
    },
    {
      "name": "Apple AirTag",
      "description": "Track your items with Apple's AirTag, using the Find My network to locate lost belongings.",
      "thumbnail": "https://example.com/images/apple-airtag.jpg",
      "price": 29.00,
      "discount": 0
    },
    {
      "name": "LG C2 Series 77-inch OLED TV",
      "description": "A top-tier OLED TV with stunning picture quality, perfect blacks, and 120Hz refresh rate for gaming.",
      "thumbnail": "https://example.com/images/lg-c2-oled-tv.jpg",
      "price": 2999.99,
      "discount": 20
    },
    {
      "name": "Dell XPS 13 Laptop",
      "description": "Compact and powerful laptop with a 13.4-inch InfinityEdge display, Intel i7 processor, and 16GB RAM.",
      "thumbnail": "https://example.com/images/dell-xps-13.jpg",
      "price": 1399.99,
      "discount": 5
    },
    {
      "name": "Nest Learning Thermostat (3rd Gen)",
      "description": "Smart thermostat that learns your schedule and helps save energy by adjusting the temperature automatically.",
      "thumbnail": "https://example.com/images/nest-learning-thermostat.jpg",
      "price": 249.99,
      "discount": 10
    },
    {
      "name": "Garmin Forerunner 955 Smartwatch",
      "description": "Advanced GPS smartwatch for runners, featuring heart rate monitoring, VO2 max, and training metrics.",
      "thumbnail": "https://example.com/images/garmin-forerunner-955.jpg",
      "price": 499.99,
      "discount": 5
    },
    {
      "name": "Yeti Rambler 30 oz Tumbler",
      "description": "Durable stainless steel tumbler with double-wall vacuum insulation to keep drinks hot or cold.",
      "thumbnail": "https://example.com/images/yeti-rambler.jpg",
      "price": 34.99,
      "discount": 10
    },
    {
      "name": "Sony A7 IV Full-Frame Mirrorless Camera",
      "description": "High-performance full-frame camera with 33MP resolution, 4K video, and fast autofocus for professionals.",
      "thumbnail": "https://example.com/images/sony-a7iv.jpg",
      "price": 2499.99,
      "discount": 10
    },
    {
      "name": "TCL 6-Series 55-inch 4K Roku TV",
      "description": "Affordable 4K TV with mini-LED technology, HDR, and built-in Roku for seamless streaming.",
      "thumbnail": "https://example.com/images/tcl-6-series-tv.jpg",
      "price": 649.99,
      "discount": 20
    },
    {
      "name": "Cuisinart 12-Cup Coffee Maker",
      "description": "Programmable coffee maker with 12-cup capacity, self-cleaning function, and brew-strength control.",
      "thumbnail": "https://example.com/images/cuisinart-coffee-maker.jpg",
      "price": 99.99,
      "discount": 15
    },
    {
      "name": "Polaroid Now+ i-Type Instant Camera",
      "description": "Instant camera with Bluetooth connectivity, creative tools, and a built-in rechargeable battery.",
      "thumbnail": "https://example.com/images/polaroid-now-plus.jpg",
      "price": 149.99,
      "discount": 10
    },
    {
      "name": "Shark Vertex Cordless Stick Vacuum",
      "description": "Lightweight cordless vacuum with powerful suction, HEPA filtration, and flexible design for easy cleaning.",
      "thumbnail": "https://example.com/images/shark-vertex-vacuum.jpg",
      "price": 399.99,
      "discount": 20
    },
    {
      "name": "Beats Studio Buds",
      "description": "True wireless noise-canceling earbuds with dynamic sound and a comfortable, secure fit.",
      "thumbnail": "https://example.com/images/beats-studio-buds.jpg",
      "price": 149.99,
      "discount": 5
    },
    {
      "name": "Samsung Galaxy Watch5 Pro",
      "description": "Premium smartwatch with advanced fitness tracking, GPS, and long battery life for outdoor adventures.",
      "thumbnail": "https://example.com/images/galaxy-watch5-pro.jpg",
      "price": 449.99,
      "discount": 10
    },
    {
      "name": "Dyson Airwrap Complete Styler",
      "description": "Multi-functional hair styler that uses air to curl, wave, smooth, and dry with no extreme heat.",
      "thumbnail": "https://example.com/images/dyson-airwrap.jpg",
      "price": 599.99,
      "discount": 5
    },
    {
      "name": "Logitech MX Master 3 Wireless Mouse",
      "description": "High-performance wireless mouse with customizable buttons, ergonomic design, and precision tracking.",
      "thumbnail": "https://example.com/images/logitech-mx-master-3.jpg",
      "price": 99.99,
      "discount": 15
    },
    {
      "name": "Breville Smart Oven Air Fryer",
      "description": "Versatile countertop oven with air frying, toasting, baking, and roasting capabilities.",
      "thumbnail": "https://example.com/images/breville-smart-oven.jpg",
      "price": 399.99,
      "discount": 10
    },
    {
      "name": "Nintendo Switch Pro Controller",
      "description": "A premium controller for the Nintendo Switch, offering precision and comfort for long gaming sessions.",
      "thumbnail": "https://example.com/images/switch-pro-controller.jpg",
      "price": 69.99,
      "discount": 5
    },
    {
      "name": "Roomba i7+ Robot Vacuum",
      "description": "Self-emptying robot vacuum with smart mapping technology and powerful suction for a deeper clean.",
      "thumbnail": "https://example.com/images/roomba-i7.jpg",
      "price": 799.99,
      "discount": 10
    },
    {
      "name": "HP Envy 34 All-in-One Desktop",
      "description": "Stylish and powerful all-in-one desktop with a 34-inch curved display, Intel i9 processor, and 1TB SSD.",
      "thumbnail": "https://example.com/images/hp-envy-34.jpg",
      "price": 2499.99,
      "discount": 10
    },
    {
      "name": "Peloton Bike+",
      "description": "Interactive indoor cycling bike with a rotating touchscreen, live and on-demand classes, and auto resistance.",
      "thumbnail": "https://example.com/images/peloton-bike-plus.jpg",
      "price": 2495.00,
      "discount": 0
    }
  ]

  return NextResponse.json(products);
}
