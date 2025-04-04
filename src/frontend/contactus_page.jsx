import "./CSS/ContactPage.css"; // Import CSS for styling
import Navbar from "./navbar";
import Footer from "./footer";

const ContactUs = () => {
  return (
    <div className="contact-page">
        <Navbar />
      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h2 style={{color:"white"}}>Contact</h2>
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
                <p>RK University, Rajkot, 360020 Gujarat, India</p>
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
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form>
              <div className="input-group">
                <label>Your name</label>
                <input type="text" placeholder="Enter your name" required />
              </div>
              <br />

              <div className="input-group">
                <label>Email address</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <br />

              <div className="input-group">
                <label>Subject</label>
                <input type="text" placeholder="This is optional" />
              </div>
              <br />

              <div className="input-group">
                <label>Message</label>
                <textarea placeholder="Hi! I'd like to ask about..." rows="4"></textarea>
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
