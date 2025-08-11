import React, { useEffect, useState } from "react";
import axios from "axios";

function SellerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (!token) return;

    axios
      .get("http://localhost:5000/api/orders/seller-orders", {
        headers: { Authorization: token },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("❌ Failed to fetch orders:", err));
  }, []);

  const handleCancel = async (orderId) => {
    const confirm = window.confirm("Are you sure you want to cancel this order?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error("❌ Failed to cancel order:", err);
      alert("Failed to cancel order.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold text-green-700 mb-6">🛒 Seller Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-5 rounded shadow relative">
              <button
                onClick={() => handleCancel(order._id)}
                className="absolute top-2 right-2 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              >
                Cancel
              </button>

              <h4 className="font-semibold mb-2 text-lg">
                👤 {order.buyerName} ({order.buyerEmail})
              </h4>
              <p className="text-sm text-gray-600">📞 {order.buyerPhone}</p>
              <p className="text-sm text-gray-600">📍 {order.buyerAddress}</p>

              <div className="mt-3">
                <h5 className="text-green-700 font-semibold mb-2">Products Ordered:</h5>
                <ul className="space-y-2">
                  {order.products.map((p, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <img
                        src={p.productId?.imageUrl}
                        alt={p.productId?.name}
                        className="w-10 h-10 object-cover rounded border"
                      />
                      <span>
                        {p.productId?.name || "Unnamed Product"} × {p.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 text-right">
                <p className="text-green-700 font-bold text-lg">
                  Rs. {order.totalPrice}
                </p>
                <p className="text-sm text-gray-400">
                  Placed on: {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerOrders;
