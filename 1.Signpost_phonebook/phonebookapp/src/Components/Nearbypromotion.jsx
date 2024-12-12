import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/NearbyPromotion.css";

const Nearbypromotion = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [clrBtn, setClrBtn] = useState(false);
  const [datas, setData] = useState([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const [customMessage, setCustomMessage] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me."
  );
  const [prefixes, setPrefixes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://signpostphonebook.in/client_get_prefix.php")
      .then((response) => setPrefixes(response.data))
      .catch((error) => console.error("Error fetching prefixes:", error));
  }, []);

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedBusinesses([]);
    } else {
      setSelectedBusinesses(datas);
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

  const fetchBusinesses = () => {
    if (!pincodeInput || !selectedPrefix) {
      alert("Please enter a valid pincode and select a prefix.");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://signpostphonebook.in/testprefix.php?pincode=${pincodeInput}&prefix=${selectedPrefix}`
      )
      .then((response) => {
        setData(response.data);
        setClrBtn(true);
      })
      .catch((error) => console.error("Error fetching businesses:", error))
      .finally(() => setLoading(false));
  };

  const handleCheckboxChange = (client) => {
    setSelectedBusinesses((prev) =>
      prev.includes(client)
        ? prev.filter((item) => item !== client)
        : [...prev, client]
    );
  };

  const clearItems = () => {
    setPincodeInput("");
    setSelectedPrefix(null);
    fetchData();
    setSelectAll(false);
    setSelectedBusinesses([]);
    setClrBtn(!clrBtn);
  };
  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      window.alert("No clients selected!");
      return;
    }

    const mobileNumbers = selectedBusinesses.map((client) => client.mobileno);
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
        </div>
        <div className="search_Container">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter Pincode"
              maxLength={6}
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value)}
            />
            {clrBtn ? (
              <button
                className="btn btn-primary search_Button"
                onClick={clearItems}
              >
                Clear
              </button>
            ) : (
              <button
                className="btn btn-primary search_Button"
                onClick={fetchBusinesses}
              >
                Search
              </button>
            )}
          </div>
        </div>
      </div>

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
                  onChange={handleSelectAllChange}
                  checked={selectAll}
                />
              </div>
            </div>
            <div className="data_Controls">
              <div>
                <p>Fetched: {datas.length},</p>
              </div>
              <div>
                <p>Selected: {selectedBusinesses.length}</p>
              </div>
            </div>
          </div>
          <div className="scroll-container">
            {datas.length > 0 ? (
              <>
                {datas.map((item) => (
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
                        checked={selectedBusinesses.includes(item)}
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
        </div>
      )}

      <textarea
        className="message-box"
        value={customMessage}
        onChange={(e) => setCustomMessage(e.target.value)}
        rows={4}
      ></textarea>
      <button className="btn btn-primary" onClick={sendBatchSMS}>
        Send SMS
      </button>
    </div>
  );
};

export default Nearbypromotion;
