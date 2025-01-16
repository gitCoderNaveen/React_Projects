import React, { useEffect, useState } from "react";
import "../Css/SearchAndSendSms.css";
import { FaPencilAlt } from "react-icons/fa";

export default function SearchAndSendSMS() {
  const [data, setData] = useState([]);
  const [productInput, setProductInput] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isProductDropdownVisible, setIsProductDropdownVisible] =
    useState(false);
  const [showresults, setShowresults] = useState(false);
  const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const maxLength = 290;
  const [customMessage, setCustomMessage] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Thro Signpost PHONE BOOK)"
  );

  const handleProductChange = (value) => {
    setProductInput(value);
  };

  const handleCityChange = (value) => {
    setCityInput(value);
  };

  const handleCheckboxChange = (client) => {
    setSelectedClients((prev) =>
      prev.includes(client)
        ? prev.filter((item) => item !== client)
        : [...prev, client]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedClients([]);
    } else {
      setSelectedClients(data);
    }
    setSelectAll(!selectAll);
  };

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
    fetchData();
  }, []);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (productInput) {
      fetchProductData(productInput);
      setShowresults(true);
    } else fetchData();
  };

  const handleClear = () => {
    setProductInput("");
    setSelectAll(false);
    setSelectedClients("");
    setShowresults(false);
  };

  const sendSMS = () => {
    if (selectedClients.length === 0) {
      window.alert("No clients selected!");
      return;
    }

    const mobileNumbers = selectedClients.map((client) => client.mobileno);
    try {
      const recipients = mobileNumbers.join(",");
      const smsUri = `sms:${recipients}?body=${encodeURIComponent(
        customMessage
      )}`;
      window.location.href = smsUri;
    } catch (error) {
      console.error("Error opening SMS application:", error.message);
      window.alert(
        "An error occurred while opening the SMS application. Please try again."
      );
    }
  };

  return (
    <div className="productCityMainDiv">
      <div className="productCityDiv" style={{ margin: "20px" }}>
        <p>
          <span className="headingCategory">
            <strong>CATEGORYWISE PROMOTION</strong>
          </span>
          <br />
          {`Send Text messages to all Mobile Users dealing in a specific product / keyword,  all over the selected city`}{" "}
          <br />
          {`1) First edit / create message to be sent. Minimum 1 Count (145 characters), Maximum 2 counts (290 characters)`}
          <br />
          {`2) Type specific Category / product / keyword `}
          <br />
          {`3) For error free delivery of messages,  send in batches 10 each time.`}
        </p>
        <label htmlFor="">
          <strong>
            Edit / Create Message :{" "}
            <span>
              <FaPencilAlt
                style={{
                  marginLeft: "10px",
                  cursor: "pointer",
                  color: "#000000",
                }}
              />
            </span>{" "}
          </strong>
        </label>
        <div
          className="message-box-container"
          style={{ position: "relative", width: "100%" }}
        >
          <textarea
            className="message-box"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={4}
            placeholder="Type your message here..."
            style={{
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
            }}
          ></textarea>
          <div
            className="char-counter"
            style={{
              position: "absolute",
              top: "2px",
              right: "10px",
              fontSize: "14px",
              color: customMessage.length === maxLength ? "red" : "black",
            }}
          >
            {maxLength - customMessage.length} / {maxLength}
          </div>
        </div>
        <div className="inputContainer">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <label htmlFor="product">
              <strong>Category : </strong>{" "}
            </label>
            <input
              type="text"
              id="product"
              placeholder="Type to search..."
              value={productInput}
              onChange={(e) => handleProductChange(e.target.value)}
              onFocus={() => setIsProductDropdownVisible(true)}
              onBlur={() =>
                setTimeout(() => setIsProductDropdownVisible(false), 200)
              }
              style={{ width: "100%", padding: "8px" }}
            />
            {isProductDropdownVisible && (
              <ul
                style={{
                  position: "absolute",
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  maxHeight: "150px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  listStyleType: "none",
                  margin: "0",
                  padding: "0",
                  zIndex: 1,
                }}
              >
                {filteredProducts.map((product, index) => (
                  <li
                    key={index}
                    onMouseDown={() => {
                      setSelectedProduct(product);
                      setProductInput(product);
                      setIsProductDropdownVisible(false);
                    }}
                    style={{ padding: "8px", cursor: "pointer" }}
                  >
                    {product}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div style={{ position: "relative", marginBottom: "20px" }}>
            <label htmlFor="city">
              <strong>City:</strong>
            </label>
            <input
              type="text"
              id="city"
              placeholder="Type to search..."
              value={cityInput}
              onChange={(e) => handleCityChange(e.target.value)}
              onFocus={() => setIsCityDropdownVisible(true)}
              onBlur={() =>
                setTimeout(() => setIsCityDropdownVisible(false), 200)
              }
              style={{ width: "100%", padding: "8px" }}
            />
            {isCityDropdownVisible && (
              <ul
                style={{
                  position: "absolute",
                  width: "100%",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  maxHeight: "150px",
                  overflowY: "auto",
                  backgroundColor: "#fff",
                  listStyleType: "none",
                  margin: "0",
                  padding: "0",
                  zIndex: 1,
                }}
              >
                {filteredCities.map((city, index) => (
                  <li
                    key={index}
                    onMouseDown={() => {
                      setSelectedCity(city);
                      setCityInput(city);
                      setIsCityDropdownVisible(false);
                    }}
                    style={{ padding: "8px", cursor: "pointer" }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="controlSection">
          {showresults && (
            <div className="selectedList">
              <p>
                <strong>Results Displayed :</strong> {data.length}
              </p>
              <p>
                <strong>Selected cards:</strong> {selectedClients.length}
              </p>
            </div>
          )}
          <div className="selectedList">
            <div className="selectionDiv">
              <label>
                <strong>Select All</strong>{" "}
              </label>
              &nbsp;&nbsp;
              <div>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </div>
            </div>
            <div>
              {productInput ? (
                <button className="form-btn" onClick={handleClear}>
                  Clear
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div>
            <div className="sendButton">
              <button
                onClick={sendSMS}
                style={{
                  marginTop: "10px",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  cursor: "pointer",
                  justifyContent: "left",
                }}
              >
                Send SMS
              </button>
            </div>
          </div>
        </div>
        {showresults ? (
          <div className="card-containerMain">
            {data.length > 0 ? (
              <>
                {data.map((item) => (
                  <div className="card" key={item.id}>
                    <div className="card-details">
                      <p className="heading-text">
                        <strong>{item.businessname}</strong>
                      </p>
                      <p className="card-para">{item.product}</p>
                    </div>
                    <div className="checkbox">
                      <p>{item.mobileno.slice(0, -5)}xxxxx</p>
                      <input
                        className="inputCheckbox"
                        type="checkbox"
                        checked={selectedClients.includes(item)}
                        onChange={() => handleCheckboxChange(item)}
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          <div className="container defaultContainer mt-2">
            <p>
              <strong>Your Result Will be Shown Here!!..</strong>
            </p>
          </div>
        )}
        <div className="sendButton">
          <button
            onClick={sendSMS}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007BFF",
              color: "#fff",
              cursor: "pointer",
              justifyContent: "left",
            }}
          >
            Send SMS
          </button>
        </div>
        <p>
          <strong>Selected cards:</strong> {selectedClients.length}
        </p>
      </div>
    </div>
  );
}
