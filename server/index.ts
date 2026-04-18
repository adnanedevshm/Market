import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleOrder } from "./routes/order";
import { handlePayPalOrder, verifyPayPalOrder } from "./routes/paypal";
import { handleDonation } from "./routes/donation";
import {
  getProductImages,
  getProductReviews,
  searchProducts,
  getProductVariants,
} from "./routes/products";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Product routes - REAL data from Supabase
  app.get("/api/products/search", searchProducts);
  app.get("/api/products/:id/images", getProductImages);
  app.get("/api/products/:id/reviews", getProductReviews);
  app.get("/api/products/:id/variants", getProductVariants);

  // Order creation route - REAL database insertion + notifications
  app.post("/api/orders", handleOrder);
  app.post("/api/order", handleOrder); // Legacy route

  // PayPal routes - REAL PayPal API calls
  app.post("/api/paypal/order", handlePayPalOrder); // Create PayPal order
  app.post("/api/paypal/verify", verifyPayPalOrder); // Verify PayPal order

  // Donation route
  app.post("/api/donation", handleDonation);

  return app;
}
