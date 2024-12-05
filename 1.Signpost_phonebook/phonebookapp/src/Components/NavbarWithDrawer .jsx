// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const NavbarWithDrawer = () => {
//   const [products, setProducts] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [productSearch, setProductSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [isProductDropdownVisible, setIsProductDropdownVisible] =
//     useState(false);
//   const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://signpostphonebook.in/get_product_city.php"
//         ); // Replace with your API URL
//         const data = await response.json();
//         const uniqueProducts = [...new Set(data.map((item) => item.product))];
//         const uniqueCities = [...new Set(data.map((item) => item.city))];

//         setProducts(uniqueProducts);
//         setCities(uniqueCities);
//         setFilteredProducts(uniqueProducts);
//         setFilteredCities(uniqueCities);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const fetchBusinesses = () => {
//     if (!productSearch || !citySearch) {
//       alert("Please enter a valid pincode and select a prefix.");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_city_product.php?product=${productSearch}&city=${citySearch}`
//       )
//       .then((response) => setBusinesses(response.data))
//       .catch((error) => console.error("Error fetching businesses:", error))
//       .finally(() => setLoading(false));
//     setBusinesses([]);
//   };

//   const toggleSelectBusiness = (business) => {
//     const isSelected = selectedBusinesses.some(
//       (b) => b.mobileno === business.mobileno
//     );
//     if (isSelected) {
//       setSelectedBusinesses((prev) =>
//         prev.filter((b) => b.mobileno !== business.mobileno)
//       );
//     } else {
//       setSelectedBusinesses((prev) => [...prev, business]);
//     }
//   };

//   const sendBatchSMS = () => {
//     if (selectedBusinesses.length === 0) {
//       alert("Please select at least one business!");
//       return;
//     }

//     selectedBusinesses.forEach((business) => {
//       const { prefix, businessname, mobileno } = business;
//       const personalizedMessage = customMessage.replace(
//         "{name}",
//         `${prefix} ${businessname}`
//       );
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       window.open(smsUrl, "_blank");
//     });

//     alert("All messages have been sent!");
//   };

//   return (
//     <div className="container">
//       <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//         <h3>Product and City Searchable Dropdown</h3>

//         {/* Product Dropdown */}
//         <div style={{ position: "relative", marginBottom: "20px" }}>
//           <label htmlFor="product">Product:</label>
//           <input
//             type="text"
//             id="product"
//             placeholder="Type to search..."
//             value={productSearch}
//             onChange={(e) => setProductSearch(e.target.value)}
//             onFocus={() => setIsProductDropdownVisible(true)}
//             onBlur={() =>
//               setTimeout(() => setIsProductDropdownVisible(false), 200)
//             }
//             style={{ width: "100%", padding: "8px" }}
//           />
//           {isProductDropdownVisible && (
//             <ul
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 maxHeight: "150px",
//                 overflowY: "auto",
//                 backgroundColor: "#fff",
//                 listStyleType: "none",
//                 margin: "0",
//                 padding: "0",
//                 zIndex: 1,
//               }}
//             >
//               {filteredProducts.map((product, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     setProductSearch(product);
//                     setIsProductDropdownVisible(false);
//                   }}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {product}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>

//         {/* City Dropdown */}
//         <div style={{ position: "relative", marginBottom: "20px" }}>
//           <label htmlFor="city">City:</label>
//           <input
//             type="text"
//             id="city"
//             placeholder="Type to search..."
//             value={citySearch}
//             onChange={(e) => setCitySearch(e.target.value)}
//             onFocus={() => setIsCityDropdownVisible(true)}
//             onBlur={() =>
//               setTimeout(() => setIsCityDropdownVisible(false), 200)
//             }
//             style={{ width: "100%", padding: "8px" }}
//           />
//           {isCityDropdownVisible && (
//             <ul
//               style={{
//                 position: "absolute",
//                 width: "100%",
//                 border: "1px solid #ccc",
//                 borderRadius: "4px",
//                 maxHeight: "150px",
//                 overflowY: "auto",
//                 backgroundColor: "#fff",
//                 listStyleType: "none",
//                 margin: "0",
//                 padding: "0",
//                 zIndex: 1,
//               }}
//             >
//               {filteredCities.map((city, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     setCitySearch(city);
//                     setIsCityDropdownVisible(false);
//                   }}
//                   style={{
//                     padding: "8px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {city}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <button onClick={fetchBusinesses}>Search</button>
//       </div>

//       <select
//         value={selectedTemplate}
//         onChange={(e) => {
//           setSelectedTemplate(e.target.value);
//           setCustomMessage(templates[e.target.value]);
//         }}
//       >
//         <option value="">Select Template</option>
//         <option value="template1">Template 1</option>
//         <option value="template2">Template 2</option>
//       </select>

//       <textarea
//         value={customMessage}
//         onChange={(e) => setCustomMessage(e.target.value)}
//       />

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {businesses.map((business) => (
//             <div key={business.mobileno} className="card">
//               <div>
//                 <p>
//                   {business.prefix} {business.businessname}
//                 </p>
//                 <p>{business.mobileno}</p>
//               </div>
//               <button onClick={() => toggleSelectBusiness(business)}>
//                 {selectedBusinesses.some(
//                   (b) => b.mobileno === business.mobileno
//                 )
//                   ? "Deselect"
//                   : "Select"}
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {selectedBusinesses.length > 0 && (
//         <p>Selected Businesses: {selectedBusinesses.length}</p>
//       )}

//       <button onClick={sendBatchSMS}>Send SMS to Selected</button>
//     </div>
//   );
// };

// export default NavbarWithDrawer;
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function NavbarWithDrawer() {
//   const [products, setProducts] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [productSearch, setProductSearch] = useState("");
//   const [citySearch, setCitySearch] = useState("");
//   const [selectedCards, setSelectedCards] = useState([]);

//   // Fetch products and cities from the API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://signpostphonebook.in/get_product_city.php"
//         ); // Replace with your API URL
//         const data = await response.json();
//         const uniqueProducts = [...new Set(data.map((item) => item.product))];
//         const uniqueCities = [...new Set(data.map((item) => item.city))];

//         setProducts(uniqueProducts);
//         setCities(uniqueCities);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Fetch filtered data when product or city is selected
//   useEffect(() => {
//     if (productSearch && citySearch) {
//       axios
//         .get(
//           `https://signpostphonebook.in/sms_client_city_product.php?product=${productSearch}&city=${citySearch}`
//         )
//         .then((response) => setFilteredResults(response.data))
//         .catch((error) =>
//           console.error("Error fetching filtered data:", error)
//         );
//     }
//   }, [productSearch, citySearch]);

//   // Handle card selection
//   const toggleCardSelection = (card) => {
//     const isSelected = selectedCards.some(
//       (selected) => selected.mobileno === card.mobileno
//     );
//     if (isSelected) {
//       setSelectedCards(
//         selectedCards.filter((selected) => selected.mobileno !== card.mobileno)
//       );
//     } else {
//       setSelectedCards([...selectedCards, card]);
//     }
//   };

//   // Handle sending SMS
//   const sendSMS = () => {
//     if (selectedCards.length > 0) {
//       selectedCards.forEach((card) => {
//         console.log(`Sending SMS: "Welcome to all" to ${card.mobileno}`);
//         // Add SMS API call here
//       });
//       alert("SMS sent to selected contacts.");
//     } else {
//       alert("No cards selected.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Product and City Selector</h1>

//       {/* Dropdown for products */}
//       <label>
//         Select Product:
//         <select
//           onChange={(e) => setProductSearch(e.target.value)}
//           value={productSearch}
//         >
//           <option value="">--Select Product--</option>
//           {products.map((product, index) => (
//             <option key={index} value={product}>
//               {product}
//             </option>
//           ))}
//         </select>
//       </label>

//       {/* Dropdown for cities */}
//       <label>
//         Select City:
//         <select
//           onChange={(e) => setCitySearch(e.target.value)}
//           value={citySearch}
//         >
//           <option value="">--Select City--</option>
//           {cities.map((city, index) => (
//             <option key={index} value={city}>
//               {city}
//             </option>
//           ))}
//         </select>
//       </label>

//       {/* Results display */}
//       <div style={{ marginTop: "20px" }}>
//         <h2>Results</h2>
//         <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//           {filteredResults.map((result, index) => (
//             <div
//               key={index}
//               style={{
//                 border: "1px solid #ccc",
//                 borderRadius: "5px",
//                 padding: "10px",
//                 width: "200px",
//                 position: "relative",
//               }}
//             >
//               <p>
//                 <strong>Business Name:</strong> {result.businessname}
//               </p>
//               <p>
//                 <strong>Mobile:</strong> {result.mobileno}
//               </p>
//               <p>
//                 <strong>Product:</strong> {result.product}
//               </p>
//               <button
//                 style={{
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                   cursor: "pointer",
//                 }}
//                 onClick={() => toggleCardSelection(result)}
//               >
//                 {selectedCards.some((card) => card.mobileno === result.mobileno)
//                   ? "✔️"
//                   : "+"}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Send SMS button */}
//       <div style={{ marginTop: "20px" }}>
//         <button onClick={sendSMS}>Send SMS</button>
//       </div>
//     </div>
//   );
// }

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
