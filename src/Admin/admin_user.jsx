import { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", role: "User" });
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.role) {
      setError("All fields are required!");
      return;
    }

    try {
      if (editingUser) {
        await axios.put(`http://localhost:5000/api/users/${editingUser.id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/users", formData);
      }
      setFormData({ name: "", email: "", role: "User" });
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      setError("Failed to add/update user. Try again.");
    }
  };

  // Edit user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* User Form */}
      <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border rounded p-2 w-full"
          />
          <select name="role" value={formData.role} onChange={handleChange} className="border rounded p-2 w-full">
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Shop Keeper">Shop Keeper</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 rounded">
          {editingUser ? "Update User" : "Add User"}
        </button>
      </form>

      {/* User List */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-3">User ID</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Email</th>
              <th className="text-left p-3">Role</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.role}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(user)} className="text-blue-500">✏ Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-500">🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
