import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "../Css/FilterOptions.css";

const PopupFilter = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  const handleSelection = (e) => {
    const value = e.target.value;
    if (value === "ProductandCity") {
      navigate("/SearchandSendSms");
    } else if (value === "PrefixandPincode") {
      navigate("/PrefixandPicode");
    }
    setShowPopup(false);
  };

  useEffect(() => {
    // Automatically show the popup on page render
    setShowPopup(true);
  }, []);

  return (
    showPopup && (
      <div className="popup-overlay">
        <div style={styles.popup}>
          <button
            type="button"
            className="close-popup-btnn"
            onClick={() => {
              setShowPopup(false);
              navigate("/");
            }}
          >
            X
          </button>
          <h3>Select Filter option</h3>
          <div className="filterOptions">
            <div>
              <input
                type="radio"
                name="vehicle"
                value="ProductandCity"
                onChange={handleSelection}
              />
            </div>
            <div>
              &nbsp;<label>Product and City</label>
            </div>
          </div>
          <div className="filterOptions">
            <div>
              <input
                type="radio"
                name="vehicle"
                value="PrefixandPincode"
                onChange={handleSelection}
              />
            </div>
            <div>
              &nbsp;<label>Prefix and Pincode</label>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
// Styles for the popup
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
  },
};

export default PopupFilter;
