import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopManagement = () => {
  const [shops, setShops] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentShop, setCurrentShop] = useState(null);
  const [shopData, setShopData] = useState({
    name: "",
    image: "",
    address: "",
    phone_number: "",
    work_time: "",
    description: "",
    state: "",
    district: "",
    village_or_taluka: ""
  });

  useEffect(() => {
    fetchShops();
  }, []);

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
    setShopData({ ...shopData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopData({ ...shopData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/shops", shopData);
      fetchShops();
      closeModal();
    } catch (error) {
      console.error("Error adding shop:", error);
    }
  };

  const handleEditShop = (shop) => {
    setEditMode(true);
    setCurrentShop(shop.id);
    setShopData(shop);
    setModalOpen(true);
  };

  const handleUpdateShop = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/shops/${currentShop}`, shopData);
      fetchShops();
      closeModal();
    } catch (error) {
      console.error("Error updating shop:", error);
    }
  };

  const handleDeleteShop = async (id) => {
    if (window.confirm("Are you sure you want to delete this shop?")) {
      try {
        await axios.delete(`http://localhost:5000/shops/${id}`);
        fetchShops();
      } catch (error) {
        console.error("Error deleting shop:", error);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setShopData({
      name: "",
      image: "",
      address: "",
      phone_number: "",
      work_time: "",
      description: "",
      state: "",
      district: "",
      village_or_taluka: ""
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Shops</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg mb-4" onClick={() => setModalOpen(true)}>
        Add New Shop
      </button>
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shops.map((shop) => (
            <tr key={shop.id} className="text-center">
              <td className="border p-2">{shop.id}</td>
              <td className="border p-2">{shop.name}</td>
              <td className="border p-2">
                <img src={shop.image} alt="Shop" className="h-10 w-10 rounded" />
              </td>
              <td className="border p-2">{shop.address}</td>
              <td className="border p-2">{shop.phone_number}</td>
              <td className="border p-2">
                <button onClick={() => handleEditShop(shop)} className="text-blue-500 mr-2">✏️ Edit</button>
                <button onClick={() => handleDeleteShop(shop.id)} className="text-red-500">🗑 Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">{editMode ? "Edit Shop" : "Add New Shop"}</h2>
            <form onSubmit={editMode ? handleUpdateShop : handleAddShop}>
              <input type="text" name="name" placeholder="Shop Name" value={shopData.name} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="address" placeholder="Address" value={shopData.address} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="text" name="phone_number" placeholder="Phone Number" value={shopData.phone_number} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="text" name="work_time" placeholder="Work Time" value={shopData.work_time} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <textarea name="description" placeholder="Description" value={shopData.description} onChange={handleChange} className="w-full p-2 border rounded mb-2" />
              <input type="text" name="state" placeholder="State" value={shopData.state} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="text" name="district" placeholder="District" value={shopData.district} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <input type="text" name="village_or_taluka" placeholder="Village or Taluka" value={shopData.village_or_taluka} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editMode ? "Update Shop" : "Add Shop"}</button>
                <button onClick={closeModal} className="ml-2 text-gray-500">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopManagement;