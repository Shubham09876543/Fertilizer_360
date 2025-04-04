import  { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./navbar";
import Footer from "./footer";
import "./CSS/shop.css";

const ShopPage = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const shops = [
    {
      id: 1,
      name: "ShreeNiavs",
      address: "The Homeland ShopBlock1 & Ground Floor Shop, NY Circle, Nx1, 150 Feet Ring Road",
      phone: "+91 9876543210",
      workingHours: "Monday - Sunday: 8:00 AM - 9:00 PM",
      description: "ShreeNiavs provides high-quality gardening supplies and fertilizers to help your plants grow healthier.",
      image: "https://content.jdmagicbox.com/comp/tiruvallur/a7/9999pxx44.xx44.170102145903.e6a7/catalogue/athithan-fertilizers-tiruvallur-ho-tiruvallur-fertilizer-dealers-sq1c8v8.jpg",
    },
    {
      id: 2,
      name: "Yara Corp",
      address: "Tanera Stores Mirmda, Connect Road, Ground Floor, Mangubhai Apartments, Africa Colony",
      phone: "+91 9123456789",
      workingHours: "Monday - Saturday: 9:00 AM - 8:00 PM",
      description: "Yara Corp offers a wide range of organic and synthetic fertilizers for professional farmers and home gardeners.",
      image: "https://content.jdmagicbox.com/comp/tiruvallur/a7/9999pxx44.xx44.170102145903.e6a7/catalogue/athithan-fertilizers-tiruvallur-ho-tiruvallur-fertilizer-dealers-sq1c8v8.jpg",
    },
    {
      id: 3,
      name: "MEGA Fer.",
      address: "Commercial Stores, Mirmda, Connect Road, Ground Floor, Amarjit Apartment, Africa Colony",
      phone: "+91 9988776655",
      workingHours: "Monday - Sunday: 7:30 AM - 10:00 PM",
      description: "MEGA Fer. specializes in premium-quality fertilizers, providing solutions for both small gardens and large farms.",
      image: "https://content.jdmagicbox.com/comp/tiruvallur/a7/9999pxx44.xx44.170102145903.e6a7/catalogue/athithan-fertilizers-tiruvallur-ho-tiruvallur-fertilizer-dealers-sq1c8v8.jpg",
    },
    {
      id: 4,
      name: "Farma Fer.",
      address: "The Homeland, ShopBlock1 & Ground Floor Shop, NY Circle, Nx1, 150 Feet Ring Road",
      phone: "+91 8899554460",
      workingHours: "Monday - Sunday: 8:00 AM - 9:00 PM",
      description: "Farma Fer. is your go-to shop for all types of fertilizers, soil enhancers, and gardening products.",
      image: "https://content.jdmagicbox.com/comp/tiruvallur/a7/9999pxx44.xx44.170102145903.e6a7/catalogue/athithan-fertilizers-tiruvallur-ho-tiruvallur-fertilizer-dealers-sq1c8v8.jpg",
    },
  ];

  return (
    <div className="container">
      <Navbar />
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <h2 className="hero-text">Shop</h2>
      </div>

      {/* Filter Section */}
      <div className="filter-section">
      <h2 className="filter-title">Shops</h2>
      <div className="filter-box">
        <label>State</label>
        <select onChange={(e) => setSelectedShop(e.target.value)}>
          <option value="">Selected Option</option>
          <option value="shop1">Shop 1</option>
          <option value="shop2">Shop 2</option>
        </select>

        <label>District</label>
        <select onChange={(e) => setSelectedDistrict(e.target.value)}>
          <option value="">Selected Option</option>
          <option value="district1">District 1</option>
          <option value="district2">District 2</option>
        </select>

        <label>Village / City</label>
        <select onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="">Selected Option</option>
          <option value="city1">City 1</option>
          <option value="city2">City 2</option>
        </select>

        <button className="search-button">Search</button>
      </div>
    </div>             
      {/* Shop Grid */}
      <div className="shop-grid">
        {shops.map((shop) => (
          <div 
            className="shop-card" 
            key={shop.id}
            onClick={() => navigate(`/shop/${shop.id}`)} // Navigate to shop details
            style={{ cursor: "pointer" }} // Make it look clickable
          >
            <img className="shop-image" src={shop.image} alt={shop.name} />
            <div className="shop-info">
              <h3 className="shop-name">{shop.name}</h3>
              <p className="shop-address">{shop.address}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button className="page-button">1</button>
        <button className="page-button">2</button>
        <button className="page-button">3</button>
        <button className="next-button">Next</button>
      </div>

      <Footer />
    </div>
  );
};

export default ShopPage;
