import React, { useState, useContext, useEffect } from "react";
import { Authcontext } from "./Auth";
import { FaPlus, FaTimes, FaPaperPlane, FaArrowLeft } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Buyer.css";
import { useNavigate } from "react-router-dom";

const Buyer = () => {
  const navigate = useNavigate();
  const { userData } = useContext(Authcontext);
  const [buyerId, setBuyerId] = useState("");
  const [buyerMobile, setBuyerMobile] = useState("");
  const [buyerList, setBuyerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(
    "Congratulations, you are eligible for the ice cream!"
  );
  const [companies, setCompanies] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const userId = userData?.id || "";
  const userName = userData?.businessname || userData?.person || "Guest";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://signpostphonebook.in/client_fetch_for_new_database.php"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonResponse = await response.json();
        if (Array.isArray(jsonResponse)) {
          const sortedData = jsonResponse.sort((a, b) => b.id - a.id);
          setCompanies(sortedData);
        } else {
          setErrorMessage("Unexpected response from server.");
        }
      } catch (error) {
        setErrorMessage("Failed to load data: " + error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (buyerId) {
      const match = companies.find((c) => String(c.id) === String(buyerId));
      if (match) {
        setBuyerMobile(match.mobileno || "");
        setSelectedItem(match);
      } else {
        setBuyerMobile("");
        setSelectedItem(null);
      }
    } else {
      setBuyerMobile("");
      setSelectedItem(null);
    }
  }, [buyerId, companies]);

  const handleAddBuyer = async () => {
    if (!buyerId) {
      setErrorMessage("Please enter a valid Buyer ID");
      return;
    }
    setErrorMessage("");

    if (buyerList.some((item) => item.buyerId === buyerId)) {
      setErrorMessage("This Buyer ID has already been added.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://signpostphonebook.in/icecream/information.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            user_name: userName,
            buyer_id: buyerId,
            date: new Date().toISOString().slice(0, 10),
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (!result.success) {
        setErrorMessage("Failed to add buyer: " + result.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      setErrorMessage("An error occurred: " + error.message);
      setLoading(false);
      return;
    }

    const updatedList = [...buyerList, { buyerId, buyerMobile }];
    setBuyerList(updatedList);
    setBuyerId("");
    setBuyerMobile("");
    setLoading(false);
  };

  const handleRemoveBuyer = (idToRemove) => {
    const updatedList = buyerList.filter((b) => b.buyerId !== idToRemove);
    setBuyerList(updatedList);
  };

  const handleSubmitAndSendSMS = () => {
    if (buyerList.length === 0) {
      setErrorMessage("Please add at least one Buyer ID to send the message.");
      return;
    }
    setErrorMessage("");

    const mobileNumbers = buyerList.map((buyer) => buyer.buyerMobile);

    const recipients = mobileNumbers.join(",");

    const smsUrl = `sms:${recipients}?body=${encodeURIComponent(message)}`;

    window.open(smsUrl);
    setBuyerList([]);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container buyer-container mt-4">
      <div className="d-flex align-items-center mb-3">
        <p onClick={handleGoBack} className="btn btn-danger mb-5">
          <FaArrowLeft className="me-2" /> Back
        </p>
        <h2 className="text-primary mb-0 mt-5">
          <FaPaperPlane className="me-2" size={25} /> Send Icecream
        </h2>
        <div></div> {/* Empty div for spacing */}
      </div>

      <div className="card shadow">
        <div className="card-body">
          <div className="mb-3 d-flex align-items-center">
            <input
              type="number"
              className="form-control me-2"
              placeholder="Enter Buyer ID"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
            />
            <button
              onClick={handleAddBuyer}
              className="btn btn-primary rounded-circle"
              title="Add Buyer"
              disabled={loading}
            >
              {loading ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                />
              ) : (
                <FaPlus />
              )}
            </button>
          </div>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}

          {buyerList.length > 0 && (
            <div className="mb-3">
              <h5 className="mb-2">Buyers to Notify:</h5>
              <ul className="list-group">
                {buyerList.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span>
                      ID: {item.buyerId} | Mobile: {item.buyerMobile}
                    </span>
                    <button
                      onClick={() => handleRemoveBuyer(item.buyerId)}
                      className="btn btn-outline-danger btn-sm rounded-circle"
                      title="Remove Buyer"
                    >
                      <FaTimes />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="messageTextarea" className="form-label">
              <strong>Message:</strong>
            </label>
            <textarea
              className="form-control"
              id="messageTextarea"
              rows="4"
              placeholder="Edit your message here"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button
              onClick={handleSubmitAndSendSMS}
              className="btn btn-success"
              disabled={loading || buyerList.length === 0}
            >
              {loading ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  />
                  Sending SMS
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" /> Send SMS
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buyer;
