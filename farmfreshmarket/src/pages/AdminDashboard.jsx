import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [stats, setStats] = useState({ sellers: 0, products: 0, orders: 0 });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("http://localhost:5000/api/admin/stats", {
        headers: { Authorization: token },
      })
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Stats fetch failed", err));
  }, []);

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <h1 className="text-4xl font-bold text-green-800 mb-10">🌿 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow hover:scale-105 transition">
          <div className="text-5xl mb-3">👨‍🌾</div>
          <p className="text-xl font-semibold">Total Sellers</p>
          <p className="text-3xl font-bold">{stats.sellers}</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow hover:scale-105 transition">
          <div className="text-5xl mb-3">📦</div>
          <p className="text-xl font-semibold">Total Products</p>
          <p className="text-3xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow hover:scale-105 transition">
          <div className="text-5xl mb-3">🧾</div>
          <p className="text-xl font-semibold">Total Orders</p>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/admin/manage"
          className="inline-block bg-green-700 text-white text-lg px-6 py-3 rounded hover:bg-green-800 transition duration-300 shadow"
        >
          Manage Sellers, Products & Orders
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
