import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import "./CSS/FertilizerDetails.css";

const FertilizerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fertilizer, setFertilizer] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/fertilizer/${id}`)
      .then((response) => setFertilizer(response.data))
      .catch((error) => console.error("Error fetching fertilizer:", error));
  }, [id]);

  if (!fertilizer) {
    return <h2>Loading Fertilizer Details...</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="fertilizer-main-container">
        <div className="fertilizer-image-section">
          <img
            src={`http://localhost:5000${fertilizer.image}`}
            alt={fertilizer.name}
            className="fertilizer-img"
          />
        </div>

        <div className="fertilizer-content-section">
          <h1 className="fertilizer-title">{fertilizer.name}</h1>
          <p className="fertilizer-price">Rs. {fertilizer.price}.00</p>
          <p className="fertilizer-description">{fertilizer.description}</p>

          <div className="fertilizer-stock">
            <span>Stocks</span>
            <span className="stock-number">{fertilizer.stocks}</span>
          </div>

          <div className="quantity-wrapper">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button
            className="advance-booking-btn"
            onClick={() =>
              navigate(`/fertilizer/${id}/order`, {
                state: { quantity: quantity },
              })
            }
          >
            Advance Booking
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FertilizerDetails;
