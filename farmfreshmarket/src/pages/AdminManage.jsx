import { useEffect, useState } from "react";
import axios from "axios";

function AdminManage() {
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/manage", {
        headers: { Authorization: token },
      });
      setSellers(res.data.sellers);
      setProducts(res.data.products);
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const deleteSeller = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/seller/${id}`, {
      headers: { Authorization: token },
    });
    fetchData();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/product/${id}`, {
      headers: { Authorization: token },
    });
    fetchData();
  };

  const deleteOrder = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/order/${id}`, {
      headers: { Authorization: token },
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-10 text-center">⚙️ Admin Management</h1>

      {/* Sellers */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">🧑 Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sellers.map((seller) => (
            <div key={seller._id} className="bg-white p-4 rounded shadow">
              <p className="font-bold">{seller.name}</p>
              <p className="text-sm text-gray-500">{seller.email}</p>
              <button
                onClick={() => deleteSeller(seller._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-green-700 mb-4">📦 Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="font-bold">{product.name}</h3>
              <p>💰 Rs. {product.price}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <button
                onClick={() => deleteProduct(product._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-2xl font-semibold text-green-700 mb-4">🧾 Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <p className="font-bold">👤 {order.buyerName}</p>
              <p className="text-sm text-gray-500">Total: Rs. {order.totalPrice}</p>
              <button
                onClick={() => deleteOrder(order._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminManage;
