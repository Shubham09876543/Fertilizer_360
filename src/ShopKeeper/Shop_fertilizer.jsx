import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopFertilizerManagement = () => {
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
      <h2 className="mb-4 text-2xl font-bold text-center md:text-left">Manage Fertilizers</h2>
      <button
        className="block w-full px-4 py-2 mb-4 text-white bg-green-600 rounded-lg sm:w-auto"
        onClick={() => setModalOpen(true)}
      >
        Add New Fertilizer
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Shop</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stocks</th>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {fertilizers.map((fertilizer) => (
              <tr key={fertilizer.id} className="text-center">
                <td className="p-2 border">{fertilizer.id}</td>
                <td className="p-2 border">{fertilizer.shop_name}</td>
                <td className="p-2 border">{fertilizer.name}</td>
                <td className="p-2 border">{fertilizer.price}</td>
                <td className="p-2 border">{fertilizer.stocks}</td>
                <td className="p-2 border">
                  <img
                    src={fertilizer.image ? `http://localhost:5000${fertilizer.image}` : "http://localhost:5000/uploads/default-image.jpg"}
                    alt="Fertilizer"
                    className="object-cover w-16 h-16 mx-auto rounded"
                  />
                </td>
                <td className="p-2 space-x-2 border">
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                    onClick={() => handleEdit(fertilizer)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded"
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
          <div className="w-full max-w-lg p-6 mx-4 bg-white rounded-lg shadow-lg md:w-1/2">
            <h2 className="mb-4 text-xl font-bold">{isEditing ? "Edit Fertilizer" : "Add New Fertilizer"}</h2>
            <form onSubmit={handleSubmit}>
              <select name="shop_id" value={fertilizerData.shop_id} onChange={handleChange} required className="w-full p-2 mb-2 border rounded">
                <option value="">Select Shop</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.id}>{shop.name}</option>
                ))}
              </select>
              <input type="text" name="name" placeholder="Name" value={fertilizerData.name} onChange={handleChange} className="w-full p-2 mb-2 text-sm border rounded" required />
              <input type="number" name="price" placeholder="Price" value={fertilizerData.price} onChange={handleChange} className="w-full p-2 mb-2 text-sm border rounded" required />
              <input type="number" name="stocks" placeholder="Stocks" value={fertilizerData.stocks} onChange={handleChange} className="w-full p-2 mb-2 text-sm border rounded" required />
              <textarea name="description" placeholder="Description" value={fertilizerData.description} onChange={handleChange} className="w-full p-2 mb-2 text-sm border rounded" required />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 mb-2 text-sm border rounded" />
              <button type="submit" className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded">
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

export default ShopFertilizerManagement;
