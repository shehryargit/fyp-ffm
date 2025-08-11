import { useEffect, useState } from "react";
import axios from "axios";
import EditProductForm from "./EditProductForm";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/products/mine", {
        headers: { Authorization: token },
      })
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete?");
    if (!confirm) return;

    const token = localStorage.getItem("sellerToken");

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(
      products.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      )
    );
    setEditingProduct(null);
  };

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-4 text-green-700">My Products</h2>
      {products.length === 0 ? (
        <p>No products uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="text-green-700 font-bold">Rs. {p.price}</p>
              <p className="text-sm text-gray-500">{p.category}</p>
              <p className="text-gray-600 mb-3">{p.description}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </div>

              {editingProduct && editingProduct._id === p._id && (
                <EditProductForm
                  product={editingProduct}
                  onClose={() => setEditingProduct(null)}
                  onUpdate={handleUpdate}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;
