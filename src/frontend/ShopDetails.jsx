import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FertilizerCard from "./FertilizerCard";
import axios from "axios";
import "./CSS/ShopDetails.css";

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [fertilizers, setFertilizers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch shop details
  useEffect(() => {
    axios.get(`http://localhost:5000/shops/${id}`)
      .then((response) => setShop(response.data))
      .catch((error) => console.error("Error fetching shop:", error));
  }, [id]);

  // Fetch fertilizers
  useEffect(() => {
    axios.get(`http://localhost:5000/fertilizers/${id}`)
      .then((response) => setFertilizers(response.data))
      .catch((error) => console.error("Error fetching fertilizers:", error));
  }, [id]);

  if (!shop) return <h2>Loading Shop Details...</h2>;

  const filteredFertilizers = fertilizers.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <div className="hero">
        <h2>{shop.name}</h2>
      </div>

      {/* Shop Info */}
      <div className="shop-container">
        <img className="shop-image" src={shop.image} alt={shop.name} />
        <div className="shop-info">
          <h2>{shop.name}</h2>
          <p><strong>📍 Address:</strong> {shop.address}</p>
          <p><strong>📞 Phone:</strong> {shop.phone_number}</p>
          <p><strong>⏰ Working Hours:</strong> {shop.work_time}</p>
        </div>
      </div>

      {/* Description */}
      <div className="description">
        <h3>Description</h3>
        <p>{shop.description}</p>
      </div>

      {/* Fertilizers */}
      <div className="fertilizers">
        <h3>Fertilizers</h3>
        <div className="fertilizer-search">
          <input
            type="text"
            placeholder="🔍 Search fertilizers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="fertilizer-grid">
          {filteredFertilizers.length > 0 ? (
            filteredFertilizers.map((item) => (
              <div
                key={item.id}
                className="fertilizer-card"
                onClick={() => navigate(`/fertilizer/${item.id}`)}
              >
                <FertilizerCard
                  id={item.id}
                  name={item.name}
                  image={`http://localhost:5000${item.image}`}
                />
              </div>
            ))
          ) : (
            <p>No fertilizers found.</p>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="back-button-container">
        <Link to="/shop" className="back-button">
          ⬅ Back to Shops
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default ShopDetails;
