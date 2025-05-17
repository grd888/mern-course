import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import productRoute from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.use("/api/products", productRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
