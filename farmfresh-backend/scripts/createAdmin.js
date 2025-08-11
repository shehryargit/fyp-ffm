const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

mongoose.connect("mongodb+srv://admin:ahmedq@ahmedq.unry2s1.mongodb.net/farmfresh?retryWrites=true&w=majority&appName=Ahmedq", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = new Admin({
    email: "admin@farmfresh.com",
    password: hashedPassword,
  });

  await admin.save();
  console.log("Admin created!");
  mongoose.disconnect();
}

createAdmin();
