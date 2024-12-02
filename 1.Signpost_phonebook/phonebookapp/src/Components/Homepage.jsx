import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSearch, FaWindowClose } from "react-icons/fa";
import {
  faPhone,
  faMapMarkerAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import MarqueeWithLink from "../Components/MarqueeWithLink";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import "../Css/Homepage.css";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firmName, setFirmName] = useState("");
  const [productName, setProductName] = useState("");
  const [messageTemplate] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me."
  );
  const encodedMessage = encodeURIComponent(messageTemplate);

  const { user } = useAuth();

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch.php"
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse.sort((a, b) => b.id - a.id));
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Failed to load data: " + error.message);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 480);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const maskMobileNumber = (mobileNumber) =>
    mobileNumber && mobileNumber.length > 5
      ? mobileNumber.slice(0, -5) + "xxxxx"
      : mobileNumber;

  const fetchFirmData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_byname.php?businessname=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load firm data: " + error.message);
    }
  };

  const fetchProductData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_product.php?product=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load product data: " + error.message);
    }
  };

  const handleCallClick = (item) => {
    if (user) {
      window.location.href = `tel:${item.mobileno}`;
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const handleMoreClick = (item) => {
    if (user) {
      setSelectedItem(item);
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const closePopup = () => {
    setSelectedItem(null);
  };

  useEffect(() => {
    if (firmName) fetchFirmData(firmName);
    else fetchData();
  }, [firmName]);

  useEffect(() => {
    if (productName) fetchProductData(productName);
    else fetchData();
  }, [productName]);

  const styles = {
    container: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "2px",
    },
    inputContainer: {
      position: "relative",
      width: "250px",
    },
    input: {
      width: "100%",
      padding: "10px 10px 10px 40px", // Leave space for the icon
      borderRadius: "5px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    icon: {
      position: "absolute",
      top: "50%",
      left: "10px",
      transform: "translateY(-50%)",
      color: "#888",
      fontSize: "18px",
    },
  };

  return (
    <div>
      <div className="mycontainer container-fluid">
        <div className="sticky-container">
          {/* Search Bars */}
          {isMobile ? (
            <div style={styles.container}>
              {/* First Input Box */}
              <div style={styles.inputContainer}>
                <FaSearch style={styles.icon} />
                <input
                  type="text"
                  placeholder="Firm/Person Name"
                  style={styles.input}
                  onChange={(e) => setFirmName(e.target.value)}
                  onSelect={() => setProductName("")}
                  value={firmName}
                />
              </div>

              {/* Second Input Box */}
              <div style={styles.inputContainer}>
                <FaSearch style={styles.icon} />
                <input
                  type="text"
                  placeholder="Product Name"
                  style={styles.input}
                  onChange={(e) => setProductName(e.target.value)}
                  onSelect={() => setFirmName("")}
                  value={productName}
                />
              </div>
            </div>
          ) : (
            <div className="search-container">
              <label>Firm/Person: </label>
              <input
                type="text"
                placeholder="Search by Firms/Persons..."
                className="search-box"
                onChange={(e) => setFirmName(e.target.value)}
                onSelect={() => setProductName("")}
                value={firmName}
              />
              <label>Product: </label>
              <input
                type="text"
                placeholder="Search By Products..."
                className="search-box"
                onChange={(e) => setProductName(e.target.value)}
                onSelect={() => setFirmName("")}
                value={productName}
              />
            </div>
          )}
        </div>
        {/* Contact Cards */}
        <div className="contactcard-div">
          {data.length > 0 ? (
            data.map((item) => (
              <div className="card-container" key={item.id}>
                <div className="card-left">
                  <h3 className="card-name">{item.businessname}</h3>
                  <p className="card-location">
                    {productName ? (
                      <>{item.product}</>
                    ) : (
                      <>
                        {item.city}, {item.pincode}
                      </>
                    )}
                  </p>
                </div>
                <div className="card-right">
                  <div className="phone-section">
                    <p className="phone-number">
                      {maskMobileNumber(item.mobileno)}
                    </p>
                  </div>
                  <div className="button-group">
                    <button
                      className="mybtn call-btn"
                      onClick={() => handleCallClick(item)}
                    >
                      Call
                    </button>
                    <button
                      className="mybtn more-btn"
                      onClick={() => handleMoreClick(item)}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>

        {/* Popup */}
        {selectedItem && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-btn" onClick={closePopup}>
                &times;
              </button>
              <h2>{selectedItem.businessname}</h2>
              <p>
                <strong>Mobile:</strong>{" "}
                {maskMobileNumber(selectedItem.mobileno)}
              </p>
              <p>
                <strong>Product:</strong> <br />
                {selectedItem.product}
              </p>
              <p>
                <strong>Address:</strong> {selectedItem.doorno},{" "}
                {selectedItem.city}, {selectedItem.pincode}
              </p>
              <div className="button-group">
                <a
                  href={`https://wa.me/${selectedItem.mobileno}`}
                  target="_blank"
                  rel="noreferrer"
                  className="popup-btn whatsapp-btn"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${
                    selectedItem.email || "business@example.com"
                  }`}
                  className="popup-btn mail-btn"
                >
                  Mail
                </a>
                <a
                  href={`tel:${selectedItem.mobileno}`}
                  className="popup-btn call-btn"
                >
                  Call
                </a>
                <a
                  href={`sms:${selectedItem.mobileno}?&body=${encodedMessage}`}
                  className="popup-btn sms-btn"
                >
                  SMS
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
