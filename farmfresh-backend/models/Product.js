const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "Seller", required: true },
  name: String,
  price: Number,
  category: String,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model("Product", productSchema);
