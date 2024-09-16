import { productsCollection } from "./product_collection";

async function migrate() {
  await productsCollection.drop();
  await productsCollection.createIndex({ createdAt: -1 });
  await productsCollection.createIndex({ sales: -1 });
  await productsCollection.createIndex({ name: "text" });
}

migrate().catch(console.error).finally(() => {
  console.log("Migration done");
  process.exit(0);
});
