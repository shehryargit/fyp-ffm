// ✅ routes/order.js – Supports Checkout, Seller Panel & Admin
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");
const Product = require("../models/Product");

// 🔐 Common JWT secret
const JWT_SECRET = "supersecretkey123";

// ✅ 1. Place Order (Checkout)
router.post("/place", async (req, res) => {
  try {
    const { buyerName, buyerEmail, buyerPhone, buyerAddress, products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ msg: "No products provided." });
    }

    const productIds = products.map((p) => p.productId);
    const productDocs = await Product.find({ _id: { $in: productIds } });

    let totalPrice = 0;
    const formattedProducts = products.map((item) => {
      const match = productDocs.find((p) => p._id.toString() === item.productId);
      if (match) {
        totalPrice += match.price * item.quantity;
        return {
          productId: match._id,
          quantity: item.quantity,
        };
      }
      return null;
    }).filter(Boolean);

    const newOrder = new Order({
      buyerName,
      buyerEmail,
      buyerPhone,
      buyerAddress,
      products: formattedProducts,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ msg: "Order placed successfully!" });
  } catch (err) {
    console.error("Order placement error:", err);
    res.status(500).json({ msg: "Order placement failed." });
  }
});

// ✅ 2. Get Orders for Seller
router.get("/seller-orders", async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const sellerId = decoded.id;

    // Find all products belonging to this seller
    const sellerProducts = await Product.find({ sellerId });
    const sellerProductIds = sellerProducts.map((p) => p._id);

    // Find orders that have at least one product from this seller
    const orders = await Order.find({
      "products.productId": { $in: sellerProductIds }
    }).populate({
      path: "products.productId",
      match: { _id: { $in: sellerProductIds } }
    });

    // Filter out null products (from other sellers)
    const filteredOrders = orders.map(order => ({
      ...order.toObject(),
      products: order.products.filter(p => p.productId !== null)
    }));

    res.json(filteredOrders);
  } catch (err) {
    console.error("Error fetching seller orders:", err);
    res.status(500).json({ msg: "Error fetching seller orders" });
  }
});

// ✅ 3. Delete Order (for Seller or Admin)
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: "Order cancelled successfully." });
  } catch (err) {
    console.error("Cancel order error:", err);
    res.status(500).json({ msg: "Cancel failed" });
  }
});

// ✅ 4. Get All Orders (for Admin)
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Admin orders fetch error:", err);
    res.status(500).json({ msg: "Failed to fetch orders" });
  }
});

module.exports = router;
