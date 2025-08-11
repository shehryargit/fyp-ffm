import { Link } from 'react-router-dom';

function Navbar({ cartCount }) {
  return (
    <nav className="bg-green-600 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center text-white">
        {/* Brand */}
        <div className="text-3xl md:text-4xl font-bold">
          <Link to="/" className="text-white hover:text-green-100 transition">
            FarmFreshMarket
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex items-center space-x-4 md:space-x-5 text-sm md:text-base">
          <li>
            <Link to="/" className="hover:text-green-200 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-green-200 transition">
              Shop
            </Link>
          </li>
          <li className="relative">
            <Link to="/cart" className="hover:text-green-200 transition">
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-200 font-medium"
            >
              Seller Signup
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className="bg-white text-green-700 px-3 py-1 rounded hover:bg-gray-200 font-medium"
            >
              Seller Login
            </Link>
          </li>
          <li>
            <Link
              to="/admin/login"
              className="bg-yellow-300 text-green-900 px-3 py-1 rounded hover:bg-yellow-400 font-medium"
            >
              Admin Panel
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
