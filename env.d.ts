declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      MONGO_DATABASE: string;
      TOTAL_PRODUCTS: number;
      PORT: number;
      NEXT_PUBLIC_URL: string;
      JWT_SECRET: string;
      MIDTRANS_SERVER_KEY: string;
      MIDTRANS_CLIENT_KEY: string;
      NEXT_PUBLIC_MIDTRANS_CLIENT_KEY: string;
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
    }
  }
}

export {}
