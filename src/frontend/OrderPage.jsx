import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import axios from "axios";
import "./CSS/OrderPage.css";

const OrderPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedQuantity = location.state?.quantity || 1;

  const [fertilizer, setFertilizer] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/fertilizer/${id}`)
      .then((res) => setFertilizer(res.data))
      .catch((err) => console.error("Error fetching fertilizer:", err));
  }, [id]);

  const handleConfirmOrder = () => {
    navigate("/payment", {
      state: {
        fertilizer,
        quantity: passedQuantity,
        totalPrice: fertilizer.price * passedQuantity,
      },
    });
  };

  if (!fertilizer) {
    return <h2 style={{ textAlign: "center" }}>Loading Order Page...</h2>;
  }

  const totalPrice = fertilizer.price * passedQuantity;

  return (
    <div>
      <Navbar />
      <div className="order-container">
        <h2>Order Summary</h2>

        <div className="order-summary">
          <div className="order-product">
            <h3>Product</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img
                src={`http://localhost:5000${fertilizer.image}`}
                alt={fertilizer.name}
                style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <div>
                <p>{fertilizer.name}</p>
                <p>Quantity: {passedQuantity}</p>
              </div>
            </div>
          </div>

          <div className="order-price">
            <h3>Price Details</h3>
            <p>Price per item: ₹{fertilizer.price}</p>
            <p>Quantity: {passedQuantity}</p>
            <p className="order-total">Total: ₹{totalPrice}</p>
          </div>
        </div>

        <button className="confirm-button" onClick={handleConfirmOrder}>
          Confirm Order
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPage;
