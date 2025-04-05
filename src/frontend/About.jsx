import Navbar from "./navbar";
import Footer from "./footer";
import "./CSS/About.css";

const About = () => {
  return (
    <div className="about-container">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="overlay"></div>
        <h2 className="hero-text">About Us</h2>
      </div>

      {/* About Content */}
      <div className="about-content">
        <h1>About Us</h1>
        <p>
          At Fertilizer360, we provide comprehensive solutions for all your gardening needs, 
          offering a wide range of fertilizers to make your plants thrive. With a focus on quality and sustainability, 
          we ensure that you have access to the best products available. Our mission is to support gardeners and 
          farmers in achieving their growth goals effortlessly.
        </p>
      </div>

      {/* Mission Section */}
      <div className="section">
        <div className="text">
          <h3>Our Mission</h3>
          <p>
            At Fertilizer360, our mission is to provide top-quality fertilizers that enhance the success of gardeners and farmers. 
            We are committed to supporting sustainable agriculture and ensuring that plants receive the best nutrients for optimal growth and health.
          </p>
        </div>
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ8IcBMwo0ZqAyRCiaJtZOzpYLX5ooR3CNUv12x2Z1iHzxCbVQG" alt="Our Mission" className="hexagon-image" />
      </div>

   {/* Products Section */}
<div className="section">
  <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcR861Q3vL8HCpOwkZ80A9Y9iQdg_xQNZ-cN_7U6D044fd_4idxN " alt="Our Products" className="hexagon-image" />
  <div className="text">
    <h3>Our Products</h3>
    <p>
      We offer an extensive range of fertilizers, including organic, synthetic, liquid, and slow-release options. 
      Each variety is carefully curated to maximize soil nourishment and plant vitality. Whether you're looking to 
      increase your garden’s plant yield, or maintain a lush lawn, Fertilizer360 has the perfect solution for you.
    </p>
  </div>
</div>


      {/* Commitment Section */}
      <div className="section">
        <div className="text">
          <h3>Our Commitment</h3>
          <p>
            Fertilizer360 is dedicated to delivering exceptional customer service and product advice. 
            Our knowledgeable team is always ready to help you find the best fertilizer for your specific needs. 
            We are proud to support a thriving community of passionate gardeners and farmers.
          </p>
        </div>
        <img src="https://www.shutterstock.com/image-photo/fertilizer-applications-tea-leaves-roots-260nw-2171987987.jpg" alt="Our Commitment" className="hexagon-image" />
      </div>

      <Footer />
    </div>
  );
};

export default About;
