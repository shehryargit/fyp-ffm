import React, { useState } from "react";
import axios from "axios";

function Checkout({ cart, clearCart }) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/orders/place", {
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerAddress,
        products: cart,
      });

      alert(res.data.msg);
      clearCart();
    } catch (err) {
      console.error("Order failed:", err);
      alert("Order Failed!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Checkout</h2>
      <div className="mb-6 bg-green-50 border border-green-300 p-4 rounded">
        <h4 className="font-semibold text-green-800 mb-1">💳 Bank Transfer Details:</h4>
        <p><strong>Bank Name:</strong> Muslim Commercial Bank</p>
        <p><strong>Account Title:</strong> Farm Fresh Market Pvt. Ltd</p>
        <p><strong>Account Number:</strong> PKC459908780900</p>
        <p className="mt-3 text-sm text-green-700">
          👉 Please transfer the amount and send the payment screenshot on WhatsApp: <strong>+92 123 456 78</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={buyerPhone}
          onChange={(e) => setBuyerPhone(e.target.value)}
          required
          className="w-full p-3 border rounded"
        />
        <textarea
          placeholder="Address"
          value={buyerAddress}
          onChange={(e) => setBuyerAddress(e.target.value)}
          required
          className="w-full p-3 border rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
