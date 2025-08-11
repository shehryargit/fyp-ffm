// ✅ FarmGallery.jsx — with Delete Button
import { useEffect, useState } from "react";
import axios from "axios";

function FarmGallery() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [uploading, setUploading] = useState(false);

  const fetchGallery = () => {
    const token = localStorage.getItem("sellerToken");
    axios
      .get("http://localhost:5000/api/farm/my-gallery", {
        headers: { Authorization: token },
      })
      .then((res) => setGallery(res.data))
      .catch((err) => console.error("Gallery fetch failed", err));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("sellerToken");
    if (!token || selectedImages.length === 0) return;

    const formData = new FormData();
    selectedImages.forEach((file) => formData.append("images", file));
    setUploading(true);

    try {
      await axios.post("http://localhost:5000/api/farm/upload", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      setSelectedImages([]);
      fetchGallery();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this image?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("sellerToken");
      await axios.delete(`http://localhost:5000/api/farm/delete/${id}`, {
        headers: { Authorization: token },
      });
      fetchGallery(); // Refresh
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📸 My Farm Gallery</h2>

      <form onSubmit={handleUpload} className="mb-6">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {uploading ? "Uploading..." : "Upload Images"}
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {gallery.map((img) => (
          <div key={img._id} className="relative">
            <img
              src={img.imageUrl}
              alt="Farm"
              className="w-full h-48 object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmGallery;
