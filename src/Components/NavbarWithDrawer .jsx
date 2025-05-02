// export default NavbarWithDrawer;
import React, { useState } from "react";

const NavbarWithDrawer = () => {
  const [productSearch, setProductSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [isProductDropdownVisible, setIsProductDropdownVisible] =
    useState(false);
  const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);

  const templates = {
    template1: "This is template 1",
    template2: "This is template 2",
  };

  const fetchBusinesses = () => {
    // Simulated fetch logic
    setLoading(true);
    setTimeout(() => {
      setBusinesses([
        { mobileno: "1234567890", prefix: "Mr.", businessname: "ABC Corp" },
        { mobileno: "9876543210", prefix: "Ms.", businessname: "XYZ Ltd" },
      ]);
      setLoading(false);
    }, 1000);
  };

  const toggleSelectBusiness = (business) => {
    setSelectedBusinesses((prev) =>
      prev.some((b) => b.mobileno === business.mobileno)
        ? prev.filter((b) => b.mobileno !== business.mobileno)
        : [...prev, business]
    );
  };

  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      alert("No businesses selected!");
      return;
    }
    alert("SMS sent to selected businesses!");
  };

  return (
    <div className="container">
      <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <h3>Product and City Searchable Dropdown</h3>

        {/* Product Dropdown */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <label htmlFor="product">Product:</label>
          <input
            type="text"
            id="product"
            placeholder="Type to search..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
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
                  onClick={() => {
                    setProductSearch(product);
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

        {/* City Dropdown */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            placeholder="Type to search..."
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
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
                  onClick={() => {
                    setCitySearch(city);
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

        <button onClick={fetchBusinesses}>Search</button>
      </div>

      <select
        value={selectedTemplate}
        onChange={(e) => {
          setSelectedTemplate(e.target.value);
          setCustomMessage(templates[e.target.value]);
        }}
      >
        <option value="">Select Template</option>
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
      </select>

      <textarea
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {businesses.map((business) => (
            <div key={business.mobileno} className="card">
              <div>
                <p>
                  {business.prefix} {business.businessname}
                </p>
                <p>{business.mobileno}</p>
              </div>
              <button onClick={() => toggleSelectBusiness(business)}>
                {selectedBusinesses.some(
                  (b) => b.mobileno === business.mobileno
                )
                  ? "Deselect"
                  : "Select"}
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedBusinesses.length > 0 && (
        <p>Selected Businesses: {selectedBusinesses.length}</p>
      )}

      <button onClick={sendBatchSMS}>Send SMS to Selected</button>
    </div>
  );
};

export default NavbarWithDrawer;
