import { useEffect, useState } from "react";
import axios from "axios";

function AdminSellers() {
  const [sellers, setSellers] = useState([]);

  const fetchSellers = () => {
    const token = localStorage.getItem("adminToken");
    axios.get("http://localhost:5000/api/admin/sellers", {
      headers: { Authorization: token }
    })
    .then(res => setSellers(res.data))
    .catch(err => console.error("Sellers fetch failed", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this seller?")) return;
    const token = localStorage.getItem("adminToken");
    axios.delete(`http://localhost:5000/api/admin/sellers/${id}`, {
      headers: { Authorization: token }
    }).then(() => fetchSellers());
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-4">All Sellers</h2>
      <table className="w-full table-auto bg-white shadow rounded">
        <thead className="bg-green-200">
          <tr>
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((seller) => (
            <tr key={seller._id} className="text-center border-t">
              <td className="p-2">{seller.name}</td>
              <td>{seller.email}</td>
              <td>
                <button onClick={() => handleDelete(seller._id)} className="bg-red-500 text-white px-2 py-1 rounded">
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

export default AdminSellers;
