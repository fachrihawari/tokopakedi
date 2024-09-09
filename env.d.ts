declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      MONGO_DATABASE: string;
      TOTAL_PRODUCTS: number;
    }
  }
}

export {}
