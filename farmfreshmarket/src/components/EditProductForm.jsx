import { useState } from "react";
import axios from "axios";

function EditProductForm({ product, onClose, onUpdate }) {
  const [form, setForm] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("sellerToken");

    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${product._id}`,
        form,
        {
          headers: { Authorization: token },
        }
      );

      onUpdate(res.data.product); // pass updated product back
      onClose(); // close form
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4 border">
      <h3 className="text-lg font-bold mb-3">Edit Product</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Product Name"
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Price"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Category"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Description"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProductForm;
