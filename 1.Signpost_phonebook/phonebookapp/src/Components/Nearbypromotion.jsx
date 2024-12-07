// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../Css/NearbyPromotion.css";

// const Nearbypromotion = () => {
//   const [pincodeInput, setPincodeInput] = useState("");
//   const [businesses, setBusinesses] = useState([]);
//   const [selectedBusinesses, setSelectedBusinesses] = useState([]);
//   const [selectedTemplate, setSelectedTemplate] = useState("template1");
//   const [customMessage, setCustomMessage] = useState("");
//   const [prefixes, setPrefixes] = useState([]);
//   const [selectedPrefix, setSelectedPrefix] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const templates = {
//     template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`,

//     template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
//     WWW.signpostphonebook.in`,
//   };

//   useEffect(() => {
//     axios
//       .get("https://signpostphonebook.in/client_get_prefix.php")
//       .then((response) => setPrefixes(response.data))
//       .catch((error) => console.error("Error fetching prefixes:", error));
//   }, []);

//   const fetchBusinesses = () => {
//     if (!pincodeInput || !selectedPrefix) {
//       alert("Please enter a valid pincode and select a prefix.");
//       return;
//     }

//     setLoading(true);
//     axios
//       .get(
//         `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}&prefix=${selectedPrefix}`
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
//       const { mobileno } = business;
//       const personalizedMessage = `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
//     On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
//     WWW.signpostphonebook.in`;
//       const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
//         personalizedMessage
//       )}`;

//       window.open(smsUrl, "_blank");
//     });

//     alert("All messages have been sent!");
//   };

//   return (
//     <div className="container">
//       <div>
//         <label>Select Prefix</label>
//         <div className="prefix-container">
//           {prefixes.map((prefix) => (
//             <div key={prefix.name} className="prefix-item">
//               <input
//                 type="radio"
//                 id={prefix.name}
//                 name="prefix"
//                 value={prefix.name}
//                 onChange={() => setSelectedPrefix(prefix.name)}
//                 checked={selectedPrefix === prefix.name}
//               />
//               <label htmlFor={prefix.name}>{prefix.name}</label>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder="Enter Pincode"
//           maxLength={6}
//           value={pincodeInput}
//           onChange={(e) => setPincodeInput(e.target.value)}
//         />
//         <button className="btn btn-primary" onClick={fetchBusinesses}>
//           Search
//         </button>
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
//                 <p>{business.mobileno.slice(0, 5)}xxxxx</p>
//               </div>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => toggleSelectBusiness(business)}
//               >
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

//       <button className="btn btn-primary" onClick={sendBatchSMS}>
//         Send SMS to Selected
//       </button>
//     </div>
//   );
// };

// export default Nearbypromotion;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/NearbyPromotion.css";

const Nearbypromotion = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [customMessage, setCustomMessage] = useState("");
  const [prefixes, setPrefixes] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [loading, setLoading] = useState(false);

  // const templates = {
  //   template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
  //   On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
  //   WWW.signpostphonebook.in`,

  //   template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
  //   WWW.signpostphonebook.in`,
  // };

  useEffect(() => {
    axios
      .get("https://signpostphonebook.in/client_get_prefix.php")
      .then((response) => setPrefixes(response.data))
      .catch((error) => console.error("Error fetching prefixes:", error));
  }, []);

  const fetchBusinesses = () => {
    if (!pincodeInput || !selectedPrefix) {
      alert("Please enter a valid pincode and select a prefix.");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://signpostphonebook.in/sms_client_details.php?pincode=${pincodeInput}&prefix=${selectedPrefix}`
      )
      .then((response) => setBusinesses(response.data))
      .catch((error) => console.error("Error fetching businesses:", error))
      .finally(() => setLoading(false));
  };

  const toggleSelectBusiness = (business) => {
    const isSelected = selectedBusinesses.some(
      (b) => b.mobileno === business.mobileno
    );
    if (isSelected) {
      setSelectedBusinesses((prev) =>
        prev.filter((b) => b.mobileno !== business.mobileno)
      );
    } else {
      setSelectedBusinesses((prev) => [...prev, business]);
    }
  };

  const selectAllBusinesses = (checked) => {
    setSelectedBusinesses(checked ? businesses : []);
  };

  // const sendBatchSMS = () => {
  //   if (selectedBusinesses.length === 0) {
  //     alert("Please select at least one business!");
  //     return;
  //   }

  //   selectedBusinesses.forEach((business) => {
  //     const { mobileno } = business;
  //     const personalizedMessage = `I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me.`;
  //     const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
  //       personalizedMessage
  //     )}`;
  //     window.open(smsUrl, "_blank");
  //   });

  //   alert("All messages have been sent!");
  // };
  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      window.alert("No clients selected!");
      return;
    }

    const mobileNumbers = selectedBusinesses.map((client) => client.mobileno);
    const message =
      "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me.";

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
    <div className="container">
      <div className="input-section">
        <div>
          <label>Select Prefix : </label>
          <div className="prefix-container">
            {prefixes.map((prefix) => (
              <div key={prefix.name} className="prefix-item">
                <div>
                  <input
                    type="radio"
                    id={prefix.name}
                    name="prefix"
                    value={prefix.name}
                    onChange={() => setSelectedPrefix(prefix.name)}
                    checked={selectedPrefix === prefix.name}
                  />
                </div>
                &nbsp;
                <div>
                  <label htmlFor={prefix.name}>{prefix.name}</label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="">Pincode : </label>
          <input
            type="text"
            placeholder="Enter Pincode"
            maxLength={6}
            value={pincodeInput}
            onChange={(e) => setPincodeInput(e.target.value)}
          />
        </div>
      </div>
      <button className="btn btn-primary" onClick={fetchBusinesses}>
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="result-header">
            <div className="selectAllSection">
              <div>
                <label>Select All</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => selectAllBusinesses(e.target.checked)}
                  checked={selectedBusinesses.length === businesses.length}
                />
              </div>
            </div>
            <p>
              Fetched: {businesses.length}, Selected:{" "}
              {selectedBusinesses.length}
            </p>
          </div>
          <div className="result-container">
            {businesses.map((business) => (
              <div key={business.mobileno} className="card">
                <div className="card-content">
                  <p>{business.businessname}</p>
                  <p>{business.mobileno.slice(0, 5)}xxxxx</p>
                </div>
                <div>
                  <input
                    type="checkbox"
                    checked={selectedBusinesses.some(
                      (b) => b.mobileno === business.mobileno
                    )}
                    onChange={() => toggleSelectBusiness(business)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="btn btn-primary" onClick={sendBatchSMS}>
        Send SMS
      </button>
    </div>
  );
};

export default Nearbypromotion;
