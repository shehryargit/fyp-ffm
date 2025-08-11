import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SellerAddProduct from "../components/SellerAddProduct";
import MyProducts from "../components/MyProducts";
import FarmGallery from "../components/FarmGallery";

function SellerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("sellerToken");
    if (!token) {
      alert("Please login first");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sellerToken");
    alert("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-green-800">👨‍🌾 Seller Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            🚪 Logout
          </button>
        </div>

        {/* Welcome */}
        <p className="text-gray-700 mb-8">
          Manage your products, view your gallery and track orders below.
        </p>

        {/* Add Product */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">➕ Add New Product</h2>
          <SellerAddProduct />
        </div>

        {/* My Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">📦 My Products</h2>
          <MyProducts />
        </div>

        {/* Farm Gallery */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">📸 My Farm Gallery</h2>
          <FarmGallery />
        </div>

        {/* Orders */}
        <div className="text-center mt-10">
          <Link to="/seller-orders">
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 shadow">
              🧾 View My Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
