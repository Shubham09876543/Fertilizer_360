import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./CSS/HomePage.css";

const HomePage = () => {
  const images = [
    "https://www.foodicine.co.in/img/products/humic-acid-fertilizer.jpg",
    "https://4.imimg.com/data4/JB/PJ/MY-26160485/stim-rich-500x500.jpg",
    "https://5.imimg.com/data5/SELLER/Default/2022/1/HD/ON/MT/145400703/urea-n46.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <img
          src="https://t4.ftcdn.net/jpg/02/44/02/17/360_F_244021725_GsYLozplO0VH7oI5ONClebHBAN8RiHbo.jpg"
          alt="Hero"
          className="hero-image"
        />
        <div className="hero-overlay">
          <p className="hero-text">
            Discover nearby shops with the fertilizer stocks you need.
          </p>
          <p className="hero-subtext">Stay current with the latest updates.</p>
          <button className="hero-button">CHECK NOW!</button>
        </div>
      </section>

      {/* Product Categories */}
      <section className="product-section">
        <p className="product-description">
          Explore our extensive selection of fertilizers, featuring all types to meet your gardening needs.
        </p>
        <h2 className="product-heading">Browse The Range</h2>

        {/* Product Grid */}
        <div className="product-grid">
          {["Nitrogen Fertilizers", "Phosphorus Fertilizers", "Potassium Fertilizers"].map((product, index) => (
            <div key={index} className="product-item">
              <img src={images[index]} alt={product} className="product-image" />
              <p className="product-name">{product}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Section */}
      <div className="main-section">
        {/* Left Side Text */}
        <div className="main-text">
          <h2>Explore 50+ Fertilizer Shops</h2>
          <p>
            Discover a wide range of fertilizers, complete with prices and stock availability in various shops.
          </p>
          <button className="explore-button">Explore More</button>
        </div>

        {/* Image Slider */}
        <div className="slider-container">
          <button className="slider-button left" onClick={prevSlide}>&#10094;</button>
          <img src={images[currentIndex]} alt="Fertilizer Shop" className="slider-image" />
          <button className="slider-button right" onClick={nextSlide}>&#10095;</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
