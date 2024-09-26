
import midtransClient from "midtrans-client";

// Prepare Midtrans payment request
const midtransSnap = new midtransClient.Snap({
  isProduction: process.env.NODE_ENV === "production",
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

export default midtransSnap