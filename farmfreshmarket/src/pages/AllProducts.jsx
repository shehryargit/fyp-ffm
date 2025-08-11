import { useEffect, useState } from "react";
import axios from "axios";

function AllProducts({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Available Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p._id} className="border p-4 rounded shadow">
            <img
              src={p.imageUrl}
              alt={p.name}
              className="w-full h-40 object-cover mb-3 rounded"
            />
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-green-700 font-semibold">Rs. {p.price}/kg</p>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="text-sm mt-1 text-gray-500">
              Seller: {p.sellerId?.name || "Unknown"}
            </p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
