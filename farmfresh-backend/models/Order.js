const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  buyerName: String,
  buyerEmail: String,
  buyerPhone: String,
  buyerAddress: String,
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
