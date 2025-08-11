const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);
const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);
const farmImageRoutes = require("./routes/farmImage");
app.use("/api/farm", farmImageRoutes);
const orderRoutes = require("./routes/order");
app.use("/api/orders", orderRoutes);
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);





// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
