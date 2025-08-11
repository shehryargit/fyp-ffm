const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Product = require("../models/Product");
const { upload } = require("../utils/cloudinary");

// Middleware: Verify seller token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.sellerId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

// 🧾 Add new product (with image)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    const imageUrl = req.file.path;

    const product = new Product({
      sellerId: req.sellerId,
      name,
      price,
      category,
      description,
      imageUrl,
    });

    await product.save();
    res.status(201).json({ msg: "Product added", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding product" });
  }
});

// 👀 Get all products by current seller
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const sellerObjectId = new mongoose.Types.ObjectId(req.sellerId);
    const products = await Product.find({ sellerId: sellerObjectId });
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch products" });
  }
});

// 🔓 Public route: Get all products (with seller name)
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find().populate("sellerId", "name email");
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch products" });
  }
});

// 🗑️ Delete product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      sellerId: req.sellerId,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found or unauthorized" });
    }

    await Product.deleteOne({ _id: req.params.id });
    res.json({ msg: "Product deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to delete product" });
  }
});

// ✏️ Edit product (no image)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      sellerId: req.sellerId,
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found or unauthorized" });
    }

    const { name, price, category, description } = req.body;

    product.name = name;
    product.price = price;
    product.category = category;
    product.description = description;

    await product.save();
    res.json({ msg: "Product updated", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to update product" });
  }
});

module.exports = router;
