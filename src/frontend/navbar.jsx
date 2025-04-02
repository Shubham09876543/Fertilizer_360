import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Fertilizer360 Logo" style={styles.logo} />
        <h1 style={styles.logoText}>Fertilizer360</h1>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/home-page" style={styles.link}>Home</Link></li>
        <li><Link to="/shop" style={styles.link}>Shop</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
      </ul>
      <div
        style={styles.accountContainer}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <span style={styles.icon}>👤</span>
        <Link to="/account" style={styles.link}>My Account</Link>
        {isDropdownOpen && (
          <div style={styles.dropdown}>
            <Link to="/profile" style={styles.dropdownContent}>Profile</Link>
            <div style={styles.dropdownContent} onClick={() => alert("Logging out...")}>Log Out</div>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "40px",
    marginRight: "10px",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#000",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
    fontWeight: "500",
  },
  accountContainer: {
    display: "flex",
    zIndex: 1,
    alignItems: "center",
    position: "relative",
    cursor: "pointer",
  },
  icon: {
    marginRight: "8px",
    fontSize: "18px",
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    overflow: "hidden",
  },
  dropdownContent: {
    padding: "10px 15px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
    display: "block",
  },
};

export default Navbar;