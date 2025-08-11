import { useState } from "react";
import axios from "axios";

function SellerAddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("sellerToken");
    if (!token) return setError("Not authorized.");

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });

      setSuccess("Product uploaded successfully!");
      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: null,
      });
    } catch (err) {
      setError(err.response?.data?.msg || "Upload failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Add New Product</h2>
      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price / kg"
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="stock(kg)"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="image"
          onChange={handleChange}
          type="file"
          accept="image/*"
          className="w-full"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}

export default SellerAddProduct;
