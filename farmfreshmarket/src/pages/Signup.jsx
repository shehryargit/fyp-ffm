import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/signup", form);
      alert("Signup successful! You can now login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Seller Signup</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded"
          required
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded"
          type="email"
          required
        />
        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded"
          type="password"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700"
        >
          Signup
        </button>
      </form>

      {/* ✅ New login button */}
      <div className="mt-6 text-center">
        <Link to="/login">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Already have an account? Login here!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
