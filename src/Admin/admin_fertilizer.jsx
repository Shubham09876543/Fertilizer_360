import React, { useState, useEffect } from "react";
import axios from "axios";

const FertilizerManagement = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const [shops, setShops] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fertilizerData, setFertilizerData] = useState({
    id: "",
    shop_id: "",
    name: "",
    price: "",
    description: "",
    stocks: "",
    image: null,
  });

  useEffect(() => {
    fetchFertilizers();
    fetchShops();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fertilizers");
      setFertilizers(response.data);
    } catch (error) {
      console.error("Error fetching fertilizers:", error);
    }
  };

  const fetchShops = async () => {
    try {
      const response = await axios.get("http://localhost:5000/shops");
      setShops(response.data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFertilizerData({ ...fertilizerData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFertilizerData({ ...fertilizerData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(fertilizerData).forEach((key) => {
        formData.append(key, fertilizerData[key]);
      });

      if (isEditing) {
        // Update existing fertilizer
        await axios.put(`http://localhost:5000/fertilizers/${fertilizerData.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Fertilizer updated successfully");
      } else {
        // Add new fertilizer
        await axios.post("http://localhost:5000/fertilizers", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Fertilizer added successfully");
      }

      fetchFertilizers();
      setModalOpen(false);
      setIsEditing(false);
      setFertilizerData({
        shop_id: "",
        name: "",
        price: "",
        description: "",
        stocks: "",
        image: null,
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };

  const handleEdit = (fertilizer) => {
    setFertilizerData(fertilizer);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this fertilizer?")) {
      try {
        await axios.delete(`http://localhost:5000/fertilizers/${id}`);
        fetchFertilizers();
        alert("Fertilizer deleted successfully");
      } catch (error) {
        console.error("Error deleting fertilizer:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Manage Fertilizers</h2>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4 block w-full sm:w-auto"
        onClick={() => setModalOpen(true)}
      >
        Add New Fertilizer
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Shop</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stocks</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {fertilizers.map((fertilizer) => (
              <tr key={fertilizer.id} className="text-center">
                <td className="border p-2">{fertilizer.id}</td>
                <td className="border p-2">{fertilizer.shop_name}</td>
                <td className="border p-2">{fertilizer.name}</td>
                <td className="border p-2">{fertilizer.price}</td>
                <td className="border p-2">{fertilizer.stocks}</td>
                <td className="border p-2">
                  <img
                    src={fertilizer.image ? `http://localhost:5000${fertilizer.image}` : "http://localhost:5000/uploads/default-image.jpg"}
                    alt="Fertilizer"
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={() => handleEdit(fertilizer)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(fertilizer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 md:w-1/2">
            <h2 className="text-xl font-bold mb-4">{isEditing ? "Edit Fertilizer" : "Add New Fertilizer"}</h2>
            <form onSubmit={handleSubmit}>
              <select name="shop_id" value={fertilizerData.shop_id} onChange={handleChange} required className="w-full p-2 border rounded mb-2">
                <option value="">Select Shop</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>{shop.name}</option>
                ))}
              </select>
              <input type="text" name="name" placeholder="Name" value={fertilizerData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2 text-sm" required />
              <input type="number" name="price" placeholder="Price" value={fertilizerData.price} onChange={handleChange} className="w-full p-2 border rounded mb-2 text-sm" required />
              <input type="number" name="stocks" placeholder="Stocks" value={fertilizerData.stocks} onChange={handleChange} className="w-full p-2 border rounded mb-2 text-sm" required />
              <textarea name="description" placeholder="Description" value={fertilizerData.description} onChange={handleChange} className="w-full p-2 border rounded mb-2 text-sm" required />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded mb-2 text-sm" />
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4">
                {isEditing ? "Update Fertilizer" : "Add Fertilizer"}
              </button>
            </form>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 text-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerManagement;
