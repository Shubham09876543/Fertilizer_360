import "./CSS/ContactPage.css";
import Navbar from "./navbar";
import Footer from "./footer";
import { useState } from "react";
import axios from "axios";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/send", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="contact-page">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h2 style={{ color: "white" }}>Contact</h2>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-container">
        <h2>Get In Touch With Us</h2>
        <p className="subtext">
          For more information about our products & services, please feel free to drop us
          an email. Our staff is always there to help you out. Do not hesitate!
        </p>

        <div className="contact-content">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-box">
              <span className="icon">📍</span>
              <div>
                <h3>Address</h3>
                <p>Gondal, Rajkot, Gujarat, India</p>
              </div>
            </div>

            <div className="info-box">
              <span className="icon">📞</span>
              <div>
                <h3>Phone</h3>
                <p>Mobile: +91 9925965449</p>
                <p>Hotline: +91 9925965449</p>
              </div>
            </div>

            <div className="info-box">
              <span className="icon">⏳</span>
              <div>
                <h3>Working Time</h3>
                <p>Monday - Friday: 9:00 - 22:00</p>
                <p>Saturday - Sunday: 9:00 - 21:00</p>
              </div>
            </div>

            {/* Map Section */}
            <div className="info-box">
              <h3 style={{ marginTop: "20px" }}>Location Map</h3>
              <div className="map-container">
                <iframe
                  title="gondal-map"
                  width="100%"
                  height="250"
                  frameBorder="0"
                  style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=70.902339%2C22.240911%2C70.912339%2C22.250911&amp;layer=mapnik&amp;marker=22.245911%2C70.907339"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
                <small>
                  <a
                    href="https://www.openstreetmap.org/?mlat=22.245911&amp;mlon=70.907339#map=17/22.245911/70.907339"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Larger Map
                  </a>
                </small>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Your name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </div>
              <br />

              <div className="input-group">
                <label>Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
              </div>
              <br />

              <div className="input-group">
                <label>Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="This is optional" />
              </div>
              <br />

              <div className="input-group">
                <label>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Hi! I'd like to ask about..." rows="4" required></textarea>
              </div>
              <br />

              <button type="submit" className="submit-btn">Submit</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
