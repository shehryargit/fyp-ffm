const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const FarmImage = require("../models/FarmImage");
const { upload } = require("../utils/cloudinary");

// 🔐 Middleware to verify seller
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.sellerId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ msg: "Invalid token" });
  }
};

// 📤 Upload multiple images
router.post("/upload", verifyToken, upload.array("images", 5), async (req, res) => {
  try {
    const imageDocs = await Promise.all(
      req.files.map((file) =>
        new FarmImage({
          sellerId: req.sellerId,
          imageUrl: file.path,
        }).save()
      )
    );
    res.status(201).json({ msg: "Images uploaded", images: imageDocs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Upload failed" });
  }
});

// 📥 Fetch gallery for logged-in seller
router.get("/my-gallery", verifyToken, async (req, res) => {
  try {
    const images = await FarmImage.find({
      sellerId: new mongoose.Types.ObjectId(req.sellerId),
    }).sort({ uploadedAt: -1 });

    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to fetch gallery" });
  }
});

// ✅ DELETE /api/farm/delete/:id
router.delete("/delete/:id", verifyToken, async (req, res) => {
  try {
    const image = await FarmImage.findOne({
      _id: req.params.id,
      sellerId: req.sellerId,
    });

    if (!image) return res.status(404).json({ msg: "Image not found" });

    await FarmImage.findByIdAndDelete(req.params.id);
    res.json({ msg: "Image deleted" });
  } catch (err) {
    console.error("Delete failed", err);
    res.status(500).json({ msg: "Failed to delete image" });
  }
});

module.exports = router;
