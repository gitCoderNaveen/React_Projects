import React, { useState, useEffect } from "react";
import axios from "axios";

const Nearbypromotion = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [customMessage, setCustomMessage] = useState("");
  const [prefixes, setPrefixes] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [loading, setLoading] = useState(false);

  const templates = {
    template1: `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
    On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
    WWW.signpostphonebook.in`,

    template2: `Dear customer, celebrate Deepavali with joy! Explore new business opportunities with the SIGNPOST PHONE BOOK App. Start promoting your services now! Visit:
    WWW.signpostphonebook.in`,
  };

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
    setBusinesses([]);
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

  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      alert("Please select at least one business!");
      return;
    }

    selectedBusinesses.forEach((business) => {
      const { mobileno } = business;
      const personalizedMessage = `Signpost Celfon Team wishes your family a HAPPY & JOYOUS DEEPAVALI!
    On this occasion, we launch our SIGNPOST PHONE BOOK Mobile App to help micro businesses promote their business in their neighborhood. Tap the link to access:
    WWW.signpostphonebook.in`;
      const smsUrl = `sms:${mobileno}?body=${encodeURIComponent(
        personalizedMessage
      )}`;

      window.open(smsUrl, "_blank");
    });

    alert("All messages have been sent!");
  };

  return (
    <div className="container">
      <div>
        <label>Select Prefix</label>
        <div className="prefix-container">
          {prefixes.map((prefix) => (
            <div key={prefix.name} className="prefix-item">
              <input
                type="radio"
                id={prefix.name}
                name="prefix"
                value={prefix.name}
                onChange={() => setSelectedPrefix(prefix.name)}
                checked={selectedPrefix === prefix.name}
              />
              <label htmlFor={prefix.name}>{prefix.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter Pincode"
          maxLength={6}
          value={pincodeInput}
          onChange={(e) => setPincodeInput(e.target.value)}
        />
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

export default Nearbypromotion;
