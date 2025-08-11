const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Seller = require("../models/Seller");
const Product = require("../models/Product");
const Order = require("../models/Order");

const JWT_SECRET = "adminSecretKey123"; // You can move this to .env

// ✅ Admin Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ msg: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid email or password" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ msg: "Login failed" });
  }
});

// ✅ Admin Dashboard Stats
router.get("/stats", async (req, res) => {
  try {
    const sellers = await Seller.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    res.json({ sellers, products, orders });
  } catch (err) {
    console.error("Failed to fetch stats:", err);
    res.status(500).json({ msg: "Error fetching admin stats" });
  }
});

// ✅ Get All for Admin Management Panel
router.get("/manage", async (req, res) => {
  try {
    const sellers = await Seller.find();
    const products = await Product.find();
    const orders = await Order.find();
    res.json({ sellers, products, orders });
  } catch (err) {
    console.error("Failed to fetch management data:", err);
    res.status(500).json({ msg: "Error fetching admin data" });
  }
});

// ✅ Delete a Seller
router.delete("/seller/:id", async (req, res) => {
  try {
    await Seller.findByIdAndDelete(req.params.id);
    res.json({ msg: "Seller deleted successfully" });
  } catch (err) {
    console.error("Delete seller failed:", err);
    res.status(500).json({ msg: "Error deleting seller" });
  }
});

// ✅ Delete a Product
router.delete("/product/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product failed:", err);
    res.status(500).json({ msg: "Error deleting product" });
  }
});

// ✅ Delete an Order
router.delete("/order/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: "Order deleted successfully" });
  } catch (err) {
    console.error("Delete order failed:", err);
    res.status(500).json({ msg: "Error deleting order" });
  }
});

module.exports = router;
