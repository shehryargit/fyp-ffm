import { useEffect, useState } from "react";
import axios from "axios";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    const token = localStorage.getItem("adminToken");
    axios.get("http://localhost:5000/api/admin/orders", {
      headers: { Authorization: token }
    })
    .then(res => setOrders(res.data))
    .catch(err => console.error("Order fetch failed", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this order?")) return;
    const token = localStorage.getItem("adminToken");
    axios.delete(`http://localhost:5000/api/admin/orders/${id}`, {
      headers: { Authorization: token }
    }).then(() => fetchOrders());
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">All Orders</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-green-200">
          <tr>
            <th className="p-2">Buyer</th>
            <th>Total</th>
            <th>Products</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="text-center border-t">
              <td className="p-2">{o.buyerName}</td>
              <td>Rs. {o.totalPrice}</td>
              <td>{o.products?.length}</td>
              <td>
                <button onClick={() => handleDelete(o._id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default AdminOrders;
