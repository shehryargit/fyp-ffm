import { useState } from "react";

function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get previously saved products from localStorage
    const stored = JSON.parse(localStorage.getItem('products')) || [];

    // Add current product to list
    const updatedProducts = [...stored, form];

    // Save updated list
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    alert("Product submitted successfully!");
    setForm({ name: "", price: "", category: "", image: "" });
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL (or leave blank)"
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
