import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div className="bg-green-800 p-4 rounded-lg">
          <h3 className="text-2xl font-bold mb-2">FarmFreshMarket</h3>
          <p className="text-sm leading-relaxed">
            Delivering fresh, organic, and local produce directly from farms to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-green-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Seller Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">
                Seller Signup
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="bg-green-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm">📧 Email: support@farmfresh.com</p>
          <p className="text-sm mt-1">📞 Phone: +92 300 1234567</p>
          <p className="text-sm mt-1">📍 Mansehra, Pakistan</p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm mt-10 text-green-200">
        © {new Date().getFullYear()} FarmFreshMarket. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
