import React from "react";
import { Link } from "react-router-dom";

function Cart({ cart, setCart, updateCartItem, removeFromCart }) {
  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id, delta) => {
    const item = cart.find((p) => p._id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateCartItem(id, newQty);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 items-center border-b pb-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded shadow"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Rs. {item.price}/kg</p>
                  <div className="flex gap-2 items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, -1)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      −
                    </button>
                    <span className="text-lg font-semibold">{item.quantity}"kg"</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, 1)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="ml-4 px-3 py-1 bg-gray-300 text-sm rounded hover:bg-gray-400"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-right mt-8">
            <p className="text-xl font-bold text-green-800">
              Grand Total: Rs. {calculateTotal()}
            </p>
            <Link to="/checkout">
              <button className="mt-4 bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
