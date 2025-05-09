import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is ready 123");
});

app.get("/products", (req, res) => {
  res.send("Products");
});

console.log(process.env.MONGO_URI);

app.listen(5001, async () => {
  await connectDB();
  console.log("Server running on PORT http://localhost:5001");
})