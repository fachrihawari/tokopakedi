import { faker } from "@faker-js/faker";
import slug from 'slug'
import { Product, productsCollection } from "@/db/product_collection";

const TOTAL_PRODUCTS = 1_000 * 1;

async function seed() {
  console.log("Seeding products...");
  await productsCollection.drop();

  let products: Product[] = [];
  for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
    let productName = faker.commerce.productName();

    const newProduct: Product = {
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
      category: faker.commerce.department(),
      tags: [
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
        faker.commerce.productAdjective(),
      ]
    }
    products.push(newProduct);
    console.log(`${i}. Product ${newProduct.name} seeded successfully`);

    if ((i % 1000) === 0) {
      await productsCollection.insertMany(products);
      console.log("Products inserted successfully");
      products = [];
    }
  }

  console.log("Products seeded successfully");
  process.exit(0);
}

seed();
