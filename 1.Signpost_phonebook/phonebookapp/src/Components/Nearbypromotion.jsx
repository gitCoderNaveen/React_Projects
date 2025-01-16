import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Css/NearbyPromotion.css";
import { FaPencilAlt } from "react-icons/fa";

const Nearbypromotion = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [clrBtn, setClrBtn] = useState(false);
  const [datas, setData] = useState([]);
  const [showresults, setShowresults] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const maxLength = 290;
  const [customMessage, setCustomMessage] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Thro Signpost PHONE BOOK)"
  );
  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);

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
    if (!pincodeInput || !prefix) {
      alert("Please enter a valid pincode and select a prefix.");
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://signpostphonebook.in/testprefix.php?pincode=${pincodeInput}&prefix=${prefix}`
      )
      .then((response) => {
        setData(response.data);
        setClrBtn(true);
        setShowresults(true);
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
    setPrefix("");
    setSelectedPrefix(null);
    fetchData();
    setSelectAll(false);
    setSelectedBusinesses([]);
    setClrBtn(!clrBtn);
    setShowresults(false);
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
      handleSelectAllChange();
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
          <p>
            <span className="headingNearby">
              <strong>NEARBY PROMOTION</strong>
            </span>{" "}
            <br />
            {`Send Text messages to Mobile Users in desired Pincode Area`}{" "}
            <br />
            {`1) First edit / create message to be sent. Minimum 1 Count (145 characters), Maximum 2 counts (290 characters)`}
            <br />
            {`2) Select type of Recipient  (Males / Females / Business Firms)`}
            <br />
            {`3) Type Pincode Number of Targetted area for Promotion`}
            <br />
            {`4) For error free delivery of messages,  send in batches of 10 nos. each time`}
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
          <label>
            <strong>Select Recipients Type :</strong>{" "}
          </label>
          <div className="prefix-container">
            <div className="radio-group" aria-required>
              <label htmlFor="Mr">
                <input
                  type="radio"
                  value="Mr."
                  checked={prefix === "Mr."}
                  onChange={(e) => setPrefix(e.target.value)}
                />
                &nbsp;Males
              </label>
            </div>
            <div className="radio-group">
              <label htmlFor="Mr">
                <input
                  type="radio"
                  value="Ms."
                  checked={prefix === "Ms."}
                  onChange={(e) => setPrefix(e.target.value)}
                />
                &nbsp;Females
              </label>
            </div>
            <div className="radio-group">
              <label htmlFor="Mr">
                <input
                  type="radio"
                  value="M/s."
                  checked={prefix === "M/s."}
                  onChange={(e) => setPrefix(e.target.value)}
                />
                &nbsp;Business Firms
              </label>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="">
            <strong>Type Pincode of Recipients</strong>{" "}
          </label>
        </div>
        <div className="search_Container">
          <div className="input-wrapper">
            <input
              type="number"
              placeholder="Enter Pincode"
              maxLength={6}
              value={pincodeInput}
              onChange={(e) => setPincodeInput(e.target.value)}
            />
          </div>
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
        {showresults && (
          <div className="data_Controls">
            <div>
              <p>
                <strong>Results Displayed :</strong> {datas.length},
              </p>
            </div>
            <div>
              <p>
                <strong>Selected:</strong> {selectedBusinesses.length}
              </p>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="result-header">
            <label htmlFor="">
              <strong>Select Recipients :</strong>
            </label>
            <br />
            <div className="selectAllSection">
              <div>
                <label>
                  <strong>Select All</strong>{" "}
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={handleSelectAllChange}
                  checked={selectAll}
                />
              </div>
            </div>

            <button className="btn btn-primary mb-2" onClick={sendBatchSMS}>
              Send SMS
            </button>
          </div>
          {showresults ? (
            <div className="scroll-container">
              {datas.length > 0 ? (
                <>
                  {datas.map((item) => (
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
          ) : (
            <div className="container defaultContainer mt-2">
              <p>
                <strong>Your Result Will be Shown Here!!..</strong>
              </p>
            </div>
          )}
          <button className="btn btn-primary mt-2" onClick={sendBatchSMS}>
            Send SMS
          </button>
          <p>
            <strong>Selected:</strong> {selectedBusinesses.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Nearbypromotion;
