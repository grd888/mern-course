import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/", (req, res) => {
  res.send("Server is ready 123");
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body)
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields",
    });
  }
  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error("Error creating product", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product", error);
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

export default router;