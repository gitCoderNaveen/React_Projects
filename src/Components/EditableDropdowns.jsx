import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../Css/Homepage.css";

export default function EditableDropdowns() {
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [productName, setProductName] = useState("");
  const [cityName, setCityName] = useState("");
  const [messageTemplate] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me."
  );
  const encodedMessage = encodeURIComponent(messageTemplate);
 
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch.php"
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      setData(jsonResponse.sort((a, b) => b.id - a.id));
    } catch (error) {
      alert("Failed to load data: " + error.message);
    }
  };

  const fetchProductCityData = async (product, city) => {
    if (!product && !city) {
      fetchData();
      return;
    }
    const params = new URLSearchParams();
    if (product) params.append("product", product);
    if (city) params.append("city", city);
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_product_city.php?${params.toString()}`
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      setData(jsonResponse);
    } catch (error) {
      alert("Failed to load data: " + error.message);
    }
  };

  useEffect(() => {
    fetchProductCityData(productName, cityName);
  }, [productName, cityName]);

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSelection = (item) => {
    setSelectedItems((prevSelected) =>
      prevSelected.some((selected) => selected.id === item.id)
        ? prevSelected.filter((selected) => selected.id !== item.id)
        : [...prevSelected, item]
    );
  };

  const handleSendSMS = () => {
    if (!user) {
      alert("Login Required");
      navigate("/login");
      return;
    }
    const numbers = selectedItems.map((item) => item.mobileno).join(",");
    window.location.href = `sms:${numbers}?&body=${encodedMessage}`;
  };

  return (
    <div>
      <div className="mycontainer container-fluid">
        <div className="sticky-container">
          <div className="search-container">
            <label>Product: </label>
            <input
              type="text"
              placeholder="Search by Products..."
              className="search-box"
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <label>City: </label>
            <input
              type="text"
              placeholder="Search by City..."
              className="search-box"
              onChange={(e) => setCityName(e.target.value)}
              value={cityName}
            />
          </div>
        </div>

        {/* Contact Cards */}
        <div className="contactcard-div">
          <p>Fetched Results: {data.length}</p>
          {data.length > 0 ? (
            data.map((item) => (
              <div
                className={`card-container ${
                  selectedItems.some((selected) => selected.id === item.id)
                    ? "selected"
                    : ""
                }`}
                key={item.id}
              >
                <div className="card-left">
                  <h3 className="card-name">{item.businessname}</h3>
                  <p className="card-location">{item.city}</p>
                </div>
                <div className="card-right">
                  <button
                    className="mybtn add-btn"
                    onClick={() => toggleSelection(item)}
                  >
                    {selectedItems.some(
                      (selected) => selected.id === item.id
                    ) ? (
                      <FaCheckCircle style={{ color: "green" }} />
                    ) : (
                      <FaPlusCircle style={{ color: "blue" }} />
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        {/* Selected Count and SMS Button */}
        <div className="footer">
          <p>Selected Items: {selectedItems.length}</p>
          {selectedItems.length > 0 && (
            <button className="send-sms-btn" onClick={handleSendSMS}>
              Send SMS to Selected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
