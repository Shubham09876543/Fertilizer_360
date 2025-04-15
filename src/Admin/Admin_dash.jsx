import { useState } from "react";
import {
  FaHome,
  FaStore,
  FaLeaf,
  FaClipboardList,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import AdminShop from "./admin_shop";
import UserManagement from "./admin_user";
import ProfilePage from "./admin_profile";
import FertilizerManagement from "./admin_fertilizer";
import OrderManagement from "./admin_orders";

const Sidebar = ({ onMenuClick }) => {
  return (
    <div className="w-64 min-h-screen p-4 text-white bg-green-800">
      <h2 className="mb-6 text-2xl font-bold">Fertilizer360 Admin</h2>
      <ul className="space-y-4">
        <li
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => onMenuClick("dashboard")}
        >
          <FaHome /> Home
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => onMenuClick("shop")}
        >
          <FaStore /> Shop Management
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => onMenuClick("fertilizers")}
        >
          <FaLeaf /> Fertilizer Management
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => onMenuClick("order")}
        >
          <FaClipboardList /> Orders
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => onMenuClick("users")}
        >
          <FaUsers /> User Management
        </li>
        <li
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => onMenuClick("profile")}
        >
          <FaUser /> Profile
        </li>
      </ul>
    </div>
  );
};

const Dashboard = ({ setActiveMenu }) => {
  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
        <div className="p-4 bg-white border rounded-lg shadow-md">
          <p className="flex items-center gap-2 text-gray-600">
            <FaStore className="text-green-600" /> Total Shops
          </p>
          <h3 className="text-xl font-bold">200+</h3>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-md">
          <p className="flex items-center gap-2 text-gray-600">
            <FaLeaf className="text-green-600" /> Total Fertilizers
          </p>
          <h3 className="text-xl font-bold">500+</h3>
        </div>
        <div className="p-4 bg-white border rounded-lg shadow-md">
          <p className="flex items-center gap-2 text-gray-600">
            <FaUsers className="text-green-600" /> Total Users
          </p>
          <h3 className="text-xl font-bold">1000+</h3>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Quick Actions</h3>
        <div className="flex flex-wrap gap-4 mt-3">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md"
            onClick={() => setActiveMenu("shop")}
          >
            Add New Shop
          </button>
          <button
            className="px-4 py-2 text-white bg-yellow-500 rounded-md"
            onClick={() => setActiveMenu("fertilizers")}
          >
            Manage Fertilizers
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded-md"
            onClick={() => setActiveMenu("order")}
          >
            View All Orders
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md"
            onClick={() => setActiveMenu("users")}
          >
            View All Users
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <Dashboard setActiveMenu={setActiveMenu} />;
      case "shop":
        return <AdminShop />;
      case "order":
        return <OrderManagement />;
      case "users":
        return <UserManagement />;
      case "profile":
        return <ProfilePage />;
      case "fertilizers":
        return <FertilizerManagement />;
      default:
        return <Dashboard setActiveMenu={setActiveMenu} />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onMenuClick={setActiveMenu} />
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
