import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import "../Css/Homepage.css";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firmName, setFirmName] = useState("");
  const [productName, setProductName] = useState("");
  const [priorityClients, setPriorityClients] = useState([]);
  const [messageTemplate] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me."
  );
  const encodedMessage = encodeURIComponent(messageTemplate);
  const [progress, setProgress] = useState(0);

  const { user, userData } = useAuth();

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
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
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

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
    if (!name) return;
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_byname_and_byperson.php?searchname=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        const priorityData = jsonResponse.filter(
          (item) => Number(item.priority) === "1"
        );
        const nonPriorityData = jsonResponse.filter(
          (item) => Number(item.priority) !== "0"
        );
        if (priorityData) {
          setData([...priorityData, ...nonPriorityData]);
        } else {
          setData(jsonResponse);
        }
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load firm data: " + error.message);
    }
  };

  const fetchProductData = async (name) => {
    if (!name) return;

    try {
      const response = await fetch(
        `http://signpostphonebook.in/client_fetch_product.php?product=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();

      // Ensure the response is an array
      if (Array.isArray(jsonResponse)) {
        const priorityData = jsonResponse.filter(
          (item) => Number(item.priority) === "1"
        );
        const nonPriorityData = jsonResponse.filter(
          (item) => Number(item.priority) !== "0"
        );
        if (priorityData) {
          setData([...priorityData, ...nonPriorityData]);
        } else {
          setData(jsonResponse);
        }
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
        <div className="home_contactcard-div">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                className={`home_card-container ${
                  Number(item.priority) === 1 ? "priority_card" : ""
                }`}
                key={item.id}
              >
                {Number(item.priority) === 1 ? (
                  <div className="Prime_badge">Prime</div>
                ) : (
                  ""
                )}
                <div className="home_card-left">
                  <h3
                    className={`home_card-name ${
                      Number(item.priority) === 1
                        ? "priority_card-headings"
                        : ""
                    }`}
                  >
                    {firmName &&
                    item.person.toLowerCase().includes(firmName.toLowerCase())
                      ? toTitleCase(item.person)
                      : toTitleCase(
                          item.businessname ? item.businessname : item.person
                        )}
                  </h3>
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
                <div className="home_card-right">
                  <div className="phone-section">
                    <p className="phone-number">
                      {maskMobileNumber(item.mobileno)}
                    </p>
                  </div>
                  <div className="button-group">
                    <button
                      className={`mybtn call-btn ${
                        Number(item.priority) === 1 ? "prime_call-button" : ""
                      }`}
                      onClick={() => handleCallClick(item)}
                    >
                      Call
                    </button>
                    <button
                      className={`mybtn more-btn ${
                        Number(item.priority) === 1 ? "prime_more-button" : ""
                      }`}
                      onClick={() => handleMoreClick(item)}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="download-container">
              <div className="loader-wrapper">
                <div className="status-text">
                  {progress < 100 ? "Loading..." : "Completed!"}
                </div>
                {progress < 100 && <div className="spinner"></div>}
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Popup */}
        {selectedItem && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              <h2>{selectedItem.businessname}</h2>
              {selectedItem.person && (
                <h3>
                  {selectedItem.personprefix}
                  {selectedItem.person}
                </h3>
              )}
              <p>
                <strong>Mobile:</strong>{" "}
                {maskMobileNumber(selectedItem.mobileno)}
              </p>
              <p>
                <strong>Product/Services:</strong> <br />
                {selectedItem.product}
              </p>
              <p>
                <strong>Address:</strong> {selectedItem.address},{" "}
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
                {selectedItem.email && (
                  <a
                    href={`mailto:${
                      selectedItem.email || "business@example.com"
                    }`}
                    className="popup-btn mail-btn"
                  >
                    Mail
                  </a>
                )}
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
