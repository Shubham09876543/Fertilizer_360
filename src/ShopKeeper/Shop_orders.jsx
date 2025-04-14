import React, { useState, useEffect } from "react";
import axios from "axios";

const ShopOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [orderData, setOrderData] = useState({
    id: "",
    customer_name: "",
    fertilizer_name: "",
    quantity: "",
    total_price: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Find the existing order and merge changes
        const existingOrder = orders.find((order) => order.id === orderData.id);
        if (!existingOrder) {
          alert("Order not found!");
          return;
        }

        const updatedOrder = { ...existingOrder, ...orderData }; // Preserve old data, update only changed fields

        await axios.put(`http://localhost:5000/orders/${orderData.id}`, updatedOrder);
        alert("Order updated successfully");
      } else {
        await axios.post("http://localhost:5000/place-order", orderData);
        alert("Order added successfully");
      }

      fetchOrders();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (order) => {
    setOrderData(order); // Set the existing order data in the form
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        fetchOrders();
        alert("Order deleted successfully");
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setIsEditing(false);
    setOrderData({
      id: "",
      customer_name: "",
      fertilizer_name: "",
      quantity: "",
      total_price: "",
      status: "Pending",
    });
  };

  return (
    <div className="p-6">
      <h2 className="mb-4 text-2xl font-bold text-center md:text-left">Manage Orders</h2>
      <button
        className="block w-full px-4 py-2 mb-4 text-white bg-green-600 rounded-lg sm:w-auto"
        onClick={() => setModalOpen(true)}
      >
        Add New Order
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border border-collapse border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Fertilizer</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="text-center">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.customer_name}</td>
                <td className="p-2 border">{order.fertilizer_name}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.total_price}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 space-x-2 border">
                  <button
                    className="px-3 py-1 text-white bg-blue-500 rounded"
                    onClick={() => handleEdit(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 text-white bg-red-500 rounded"
                    onClick={() => handleDelete(order.id)}
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
            <h2 className="mb-4 text-xl font-bold">
              {isEditing ? "Edit Order" : "Add New Order"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="customer_name"
                placeholder="Customer Name"
                value={orderData.customer_name}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="text"
                name="fertilizer_name"
                placeholder="Fertilizer Name"
                value={orderData.fertilizer_name}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={orderData.quantity}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <input
                type="number"
                name="total_price"
                placeholder="Total Price"
                value={orderData.total_price}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
                required
              />
              <select
                name="status"
                value={orderData.status}
                onChange={handleChange}
                className="w-full p-2 mb-2 border rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="w-full px-4 py-2 mt-4 text-white bg-blue-600 rounded"
                >
                  {isEditing ? "Update Order" : "Add Order"}
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-2 mt-4 ml-2 text-white bg-gray-600 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopOrderManagement;
