import { useEffect, useState } from "react";
import axios from "axios";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    const token = localStorage.getItem("adminToken");
    axios.get("http://localhost:5000/api/admin/products", {
      headers: { Authorization: token }
    })
    .then(res => setProducts(res.data))
    .catch(err => console.error("Product fetch failed", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this product?")) return;
    const token = localStorage.getItem("adminToken");
    axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
      headers: { Authorization: token }
    }).then(() => fetchProducts());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">All Products</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-green-200">
          <tr>
            <th className="p-2">Product</th>
            <th>Seller</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="text-center border-t">
              <td className="p-2">{p.name}</td>
              <td>{p.sellerId?.name || "Unknown"}</td>
              <td>Rs. {p.price}</td>
              <td>
                <button onClick={() => handleDelete(p._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;
