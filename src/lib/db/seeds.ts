import { faker } from "@faker-js/faker";
import slug from 'slug'
import { ProductForm, productsCollection } from "@/lib/db/product_collection";

const BASE_PRODUCTS = 1_000
const TOTAL_PRODUCTS = BASE_PRODUCTS * process.env.TOTAL_PRODUCTS;

async function seed() {
  console.log("Seeding products...");

  const categories = new Array(8).fill(0).map((_, i) => faker.commerce.department());

  let products: ProductForm[] = [];
  for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
    let productName = faker.commerce.productName();

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const newProduct: ProductForm = {
      name: productName,
      slug: slug(productName),
      description: faker.commerce.productDescription(),
      thumbnail: faker.image.url({ width: 512, height: 512 }),
      images: [
        faker.image.url({ width: 512, height: 512 }),
        faker.image.url({ width: 512, height: 512 }),
        faker.image.url({ width: 512, height: 512 }),
        faker.image.url({ width: 512, height: 512 }),
      ],
      price: Math.round(faker.number.int({ min: 10000, max: 1000000 }) / 1000) * 1000,
      discount: faker.number.int({ min: 0, max: 50 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      category: randomCategory,
      tags: [
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
      ],
      sales: faker.number.int({ min: 0, max: 1_000_000 }),
      createdAt: faker.date.between({ from: new Date(2022, 0, 1), to: new Date() }),
      rating: {
        count: faker.number.int({ min: 0, max: 1000 }),
        value: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
      }
    }
    products.push(newProduct);
    console.log(`${i}. Product ${newProduct.name} seeded successfully`);

    if ((i % BASE_PRODUCTS) === 0) {
      await productsCollection.insertMany(products);
      console.log("Products inserted successfully");
      products = [];
    }
  }

  console.log("Products seeded successfully");
}

seed().catch(console.error).finally(() => {
  console.log("Seeding done");
  process.exit(0);
});
