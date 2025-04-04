import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown on click
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Fertilizer360 Logo" style={styles.logo} />
        <h1 style={styles.logoText}>Fertilizer360</h1>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/shop" style={styles.link}>Shop</Link></li>
        <li><Link to="/about" style={styles.link}>About</Link></li>
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
      </ul>
      
      {/* Account Dropdown */}
      <div style={styles.accountContainer} ref={dropdownRef}>
        <button onClick={toggleDropdown} style={styles.accountButton}>
          👤 My Account ▼
        </button>
        
        {isDropdownOpen && (
          <div style={styles.dropdown}>
            <Link to="/profile" style={styles.dropdownContent}>My Profile</Link>
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
    position: "relative",
    cursor: "pointer",
  },
  accountButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },
  dropdown: {
    zIndex: 5,
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
    borderRadius: "5px",
    overflow: "hidden",
    minWidth: "150px",
    display: "flex",
    flexDirection: "column",
    animation: "fadeIn 0.2s ease-in-out",
  },
  dropdownContent: {
    padding: "10px 15px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
    display: "block",
    textAlign: "left",
    backgroundColor: "white",
    borderBottom: "1px solid #ddd",
  },
};

export default Navbar;
