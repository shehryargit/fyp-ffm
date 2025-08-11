const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await Seller.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = new Seller({ name, email, password: hashedPassword });
    await seller.save();

    res.status(201).json({ msg: "Seller registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.findOne({ email });
    if (!seller) return res.status(404).json({ msg: "Seller not found" });

    const match = await bcrypt.compare(password, seller.password);
    if (!match) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token, seller: { id: seller._id, name: seller.name, email: seller.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
