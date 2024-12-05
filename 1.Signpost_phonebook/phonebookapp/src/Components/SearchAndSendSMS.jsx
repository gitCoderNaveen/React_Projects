import React, { useEffect, useState } from "react";
import "../Css/SearchAndSendSms.css";

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
  const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);
  const [smsClients, setSmsClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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

  useEffect(() => {
    if (productInput) fetchProductData(productInput);
    else fetchData();
  }, [productInput]);

  const handleClear = () => {
    setProductInput("");
  };

  const sendSMS = () => {
    if (selectedClients.length === 0) {
      window.alert("No clients selected!");
      return;
    }

    const mobileNumbers = selectedClients.map((client) => client.mobileno);
    const message = "Welcome to all";

    try {
      // Join multiple numbers with a comma
      const recipients = mobileNumbers.join(",");

      // Create the SMS URI
      const smsUri = `sms:${recipients}?body=${encodeURIComponent(message)}`;

      // Trigger the SMS application
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
        <h2>Product and City Selection</h2>
        <div className="inputContainer">
          <div style={{ position: "relative", marginBottom: "20px" }}>
            <label htmlFor="product">Product:</label>
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
            <label htmlFor="city">City:</label>
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
          {productInput ? <button onClick={handleClear}>Clear</button> : <></>}
        </div>
        <div className="card-containerMain">
          {data.length > 0 ? (
            <>
              <div className="selectallInput">
                <label>Select All</label>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                />
              </div>
              {data.map((item) => (
                <div className="card" key={item.id}>
                  <div className="card-details">
                    <p className="heading-text">{item.businessname}</p>
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
            <p>No data available.</p>
          )}
        </div>
        <div className="selectedList">
          <p>Total cards fetched: {data.length}</p>
          <p>Selected cards: {selectedClients.length}</p>
        </div>
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
          }}
        >
          Send SMS
        </button>
      </div>
    </div>
  );
}
