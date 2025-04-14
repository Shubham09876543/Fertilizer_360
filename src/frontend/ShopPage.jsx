import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./CSS/shop.css";

const ShopPage = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 6;

  useEffect(() => {
    fetchShops(); // fetch all shops initially
    fetchFilters(); // fetch states, districts, cities
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch("http://localhost:5000/shops");
      const data = await response.json();
      setShops(data);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  const fetchFilters = async () => {
    try {
      const response = await fetch("http://localhost:5000/filters");
      const data = await response.json();
      setAllStates(data.states);
      setAllDistricts(data.districts);
      setAllCities(data.cities);
    } catch (error) {
      console.error("Error fetching filters:", error);
    }
  };

  useEffect(() => {
    if (selectedState) {
      const filtered = allDistricts.filter(d => d.state === selectedState);
      setFilteredDistricts(filtered);
      setSelectedDistrict("");
      setFilteredCities([]);
    } else {
      setFilteredDistricts([]);
      setFilteredCities([]);
    }
  }, [selectedState, allDistricts]);

  useEffect(() => {
    if (selectedDistrict) {
      const filtered = allCities.filter(c => c.district === selectedDistrict);
      setFilteredCities(filtered);
      setSelectedCity("");
    } else {
      setFilteredCities([]);
    }
  }, [selectedDistrict, allCities]);

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:5000/shops");
      const data = await response.json();

      const filtered = data.filter(shop => {
        return (
          (!selectedState || shop.state === selectedState) &&
          (!selectedDistrict || shop.district === selectedDistrict) &&
          (!selectedCity || shop.village_or_taluka === selectedCity)
        );
      });

      setShops(filtered);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering shops:", error);
    }
  };

  // Pagination Logic
  const indexOfLastShop = currentPage * shopsPerPage;
  const indexOfFirstShop = indexOfLastShop - shopsPerPage;
  const currentShops = shops.slice(indexOfFirstShop, indexOfLastShop);

  const totalPages = Math.ceil(shops.length / shopsPerPage);

  return (
    <div className="container">
      <Navbar />

      <div className="hero-section">
        <div className="overlay"></div>
        <h2 className="hero-text">Shop</h2>
      </div>

      <div className="filter-section">
        <h2 className="filter-title">Shops</h2>
        <div className="filter-box">
          <label>State</label>
          <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
            <option value="">Select State</option>
            {allStates.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>

          <label>District</label>
          <select onChange={(e) => setSelectedDistrict(e.target.value)} value={selectedDistrict} disabled={!selectedState}>
            <option value="">Select District</option>
            {filteredDistricts.map((district, index) => (
              <option key={index} value={district.name}>{district.name}</option>
            ))}
          </select>

          <label>Village / City</label>
          <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} disabled={!selectedDistrict}>
            <option value="">Select City</option>
            {filteredCities.map((city, index) => (
              <option key={index} value={city.name}>{city.name}</option>
            ))}
          </select>

          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="shop-grid">
        {currentShops.length > 0 ? (
          currentShops.map((shop) => (
            <div 
              className="shop-card" 
              key={shop.id}
              onClick={() => navigate(`/shop/${shop.id}`)}
              style={{ cursor: "pointer" }}
            >
              <img className="shop-image" src={shop.image} alt={shop.name} />
              <div className="shop-info">
                <h3 className="shop-name">{shop.name}</h3>
                <p className="shop-address">{shop.address}</p>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", padding: "20px" }}>No shops found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {[...Array(totalPages).keys()].map((page) => (
            <button
              key={page + 1}
              className="page-button"
              onClick={() => setCurrentPage(page + 1)}
              disabled={currentPage === page + 1}
            >
              {page + 1}
            </button>
          ))}

          <button
            className="next-button"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage >= totalPages}
          >
            Next
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ShopPage;
