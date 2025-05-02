import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPencilAlt } from "react-icons/fa";
import { useAuth } from "./Auth";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/NearbyPromotion.css"; // Import your custom CSS for overrides

const Nearbypromotion = () => {
  const [pincodeInput, setPincodeInput] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [clrBtn, setClrBtn] = useState(false);
  const [datas, setData] = useState([]);
  const [showresults, setShowresults] = useState(false);
  const [noRecord, setNoRecord] = useState(false);
  const [selectedBusinesses, setSelectedBusinesses] = useState([]);
  const [selectedPrefix, setSelectedPrefix] = useState(null);
  const maxLength = 290;
  const [customMessage, setCustomMessage] = useState(
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Thro Signpost PHONE BOOK)"
  );
  const [prefix, setPrefix] = useState("");
  const [loading, setLoading] = useState(false);
  const { userData } = useAuth();

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
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse.sort((a, b) => b.id - a.id));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Unexpected response from server.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to load data: " + error.message,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchBusinesses = () => {
    if (!pincodeInput || !prefix) {
      Swal.fire({
        icon: "warning",
        title: "Attention!",
        text: "Please enter a valid pincode and select a recipient type.",
      });
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://signpostphonebook.in/get_details_based_on_prefix_pincode.php?pincode=${pincodeInput}&prefix=${prefix}`
      )
      .then((response) => {
        if (response.data?.[0] === "No records found.") {
          setNoRecord(true);
          setClrBtn(true);
          setData([]);
          setShowresults(false);
        } else {
          setData(response.data);
          setClrBtn(true);
          setShowresults(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching businesses:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching businesses.",
        });
      })
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
    setClrBtn(false);
    setShowresults(false);
    setNoRecord(false);
  };

  const sendBatchSMS = () => {
    if (selectedBusinesses.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Attention!",
        text: "No clients are selected!",
      });
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to send the following message to ${selectedBusinesses.length} recipients?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#007bff",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const currentDate = new Date().toISOString().split("T")[0];

        const postData = {
          user_name: userData?.bussinessname || userData?.person || "Unknown",
          date: currentDate,
          pincode: pincodeInput.trim(),
          product: "",
          selected_prefix: prefix,
          promotion_from: "Nearby Promotion",
          selected_count: selectedBusinesses.length,
        };

        axios
          .post(
            "https://signpostphonebook.in/promotion_app/promotion_appliaction.php",
            postData
          )
          .then((response) => {
            console.log(response.data.Message);
            Swal.fire({
              icon: "success",
              title: "SMS Request Sent!",
              text: "Your SMS request has been successfully sent.",
            });
          })
          .catch((error) => {
            console.error("Error sending data:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error sending data.",
            });
          });

        const mobileNumbers = selectedBusinesses.map(
          (client) => client.mobileno
        );
        try {
          const recipients = mobileNumbers.join(",");
          const smsUri = `sms:${recipients}?body=${encodeURIComponent(
            customMessage
          )}`;
          window.location.href = smsUri;
          setSelectedBusinesses([]);
          setSelectAll(false);
        } catch (error) {
          console.error("Error opening SMS application:", error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while opening the SMS application. Please try again.",
          });
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <div className="accordion mb-3" id="nearbyPromotionAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed fw-semibold text-primary"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              How to Use Nearby Promotion
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#nearbyPromotionAccordion"
          >
            <div className="accordion-body">
              <p>
                Send Text messages to Mobile Users in desired Pincode Area
                <br />
                1) First edit / create message to be sent. Minimum 1 Count (145
                characters), Maximum 2 counts (290 characters)
                <br />
                2) Select type of Recipient (Males / Females / Business Firms)
                <br />
                3) Type Pincode Number of Targetted area for Promotion
                <br />
                4) For error free delivery of messages, send in batches of 10
                nos. each time
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label fw-semibold">
          Edit / Create Message :
          <FaPencilAlt
            className="ms-2"
            style={{ cursor: "pointer", color: "#007bff" }}
          />
        </label>
        <div className="position-relative">
          <textarea
            className="form-control"
            id="message"
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            rows={4}
            placeholder="Type your message here..."
          ></textarea>
          <div
            className="text-muted position-absolute top-0 end-0 pe-2 pt-1"
            style={{
              color: customMessage.length === maxLength ? "red" : "inherit",
              fontSize: "0.8rem",
            }}
          >
            {maxLength - customMessage.length} / {maxLength}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">
          Select Recipients Type :
        </label>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="prefix"
              id="male"
              value="Mr."
              checked={prefix === "Mr."}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <label className="form-check-label" htmlFor="male">
              Males
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="prefix"
              id="female"
              value="Ms."
              checked={prefix === "Ms."}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <label className="form-check-label" htmlFor="female">
              Females
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="prefix"
              id="business"
              value="M/s."
              checked={prefix === "M/s."}
              onChange={(e) => setPrefix(e.target.value)}
            />
            <label className="form-check-label" htmlFor="business">
              Business Firms
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="pincode" className="form-label fw-semibold">
          Type Pincode of Recipients
        </label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            id="pincode"
            placeholder="Enter Pincode"
            maxLength={6}
            value={pincodeInput}
            onChange={(e) => setPincodeInput(e.target.value)}
          />
          <button
            className={`btn ${
              clrBtn ? "btn-outline-secondary" : "btn-primary"
            }`}
            type="button"
            onClick={clrBtn ? clearItems : fetchBusinesses}
          >
            {clrBtn ? "Clear" : "Search"}
          </button>
        </div>
      </div>

      {showresults && (
        <div className="d-flex justify-content-between mb-2">
          <p className="mb-0">
            <strong>Results Displayed:</strong> {datas.length}
          </p>
          <p className="mb-0">
            <strong>Selected:</strong> {selectedBusinesses.length}
          </p>
        </div>
      )}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label fw-semibold mb-0">
              Select Recipients :
            </label>
            <div className="d-flex align-items-center">
              <div className="form-check me-3">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleSelectAllChange}
                  checked={selectAll}
                  id="selectAll"
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor="selectAll"
                >
                  Select All
                </label>
              </div>
              <button className="btn btn-primary" onClick={sendBatchSMS}>
                Send SMS ({selectedBusinesses.length})
              </button>
            </div>
          </div>

          {showresults ? (
            <div className="scroll-container">
              {datas.length > 0 ? (
                <>
                  {datas.map((item) => (
                    <div className="card mb-2" key={item.id}>
                      <div className="card-body d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="card-title fw-semibold mb-1">
                            {item.businessname || item.person}
                          </h6>
                          <p className="card-text text-muted mb-0">
                            {item.product}
                          </p>
                        </div>
                        <div className="d-flex align-items-center">
                          <p className="mb-0 me-2 text-muted">
                            {item.mobileno.slice(0, -5)}xxxxx
                          </p>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedBusinesses.includes(item)}
                            onChange={() => handleCheckboxChange(item)}
                            id={`checkbox-${item.id}`}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-muted">No records found.</p>
              )}
            </div>
          ) : (
            <div className="card mt-2">
              <div className="card-body text-center text-muted">
                {noRecord ? (
                  <strong>No Records found</strong>
                ) : (
                  <strong>Your Result Will be Shown Here!!..</strong>
                )}
              </div>
            </div>
          )}

          {!showresults && (
            <button
              className="btn btn-primary mt-2 w-100"
              onClick={sendBatchSMS}
              disabled={selectedBusinesses.length === 0}
            >
              Send SMS ({selectedBusinesses.length})
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Nearbypromotion;
