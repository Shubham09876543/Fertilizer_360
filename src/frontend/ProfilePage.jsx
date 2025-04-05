import { useState, useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./CSS/ProfilePage.css"; // Ensure this path is correct

export default function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFullName(storedUser.name);
    }
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          name: fullName,
          currentPassword: changePassword ? currentPassword : null,
          newPassword: changePassword ? newPassword : null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Profile updated successfully!");
        localStorage.setItem("user", JSON.stringify({ ...user, name: fullName }));
        setUser((prevUser) => ({ ...prevUser, name: fullName }));
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) return <p className="mt-10 text-center">Loading...</p>;

  return (
    <div>
      <Navbar />
      <div className="relative flex flex-col items-center w-full min-h-screen bg-gray-100">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="absolute px-4 py-2 text-white transition bg-red-500 rounded top-5 right-5 hover:bg-red-600"
        >
          Logout
        </button>

        {/* Profile Container */}
        <div className="p-8 mt-16 text-center bg-white rounded-lg shadow-lg w-96">
          <img src="/profile-avatar.png" alt="Profile" className="w-20 h-20 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="mb-4 text-gray-500">{user.email}</p>

          {/* Form */}
          <div className="text-left">
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full p-2 mt-1 border rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <div className="flex items-center mt-3">
              <input
                type="checkbox"
                checked={changePassword}
                onChange={() => setChangePassword(!changePassword)}
                className="mr-2"
              />
              <label className="font-medium text-gray-700">Change Password</label>
            </div>

            {changePassword && (
              <>
                <label className="block mt-3 font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  className="w-full p-2 mt-1 border rounded"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />

                <label className="block mt-3 font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  className="w-full p-2 mt-1 border rounded"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </>
            )}
          </div>

          {/* Update Button */}
          <button
            onClick={handleUpdateProfile}
            className="w-full py-2 mt-4 text-white transition bg-green-500 rounded hover:bg-green-600"
          >
            Update Profile
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
