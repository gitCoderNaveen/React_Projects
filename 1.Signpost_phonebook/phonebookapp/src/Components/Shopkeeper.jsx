import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import {
  FaUser,
  FaIceCream,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Shopkeeper = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [buyerId, setBuyerId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [icecreamQuantity, setIcecreamQuantity] = useState("");
  const [buyerDetails, setBuyerDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBuyerDetails = async () => {
    if (buyerId) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://signpostphonebook.in/client_fetch_for_new_database.php`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const matchedBuyer = data.find((buyer) => String(buyer.id) === buyerId);

        if (matchedBuyer) {
          setBuyerDetails(matchedBuyer);
          setOwnerName(matchedBuyer.person || matchedBuyer.businessname || "");
          setErrorMessage("");
        } else {
          setBuyerDetails(null);
          setOwnerName("");
          setErrorMessage("Buyer ID not found.");
        }
      } catch (error) {
        console.error("Error fetching buyer details:", error);
        setBuyerDetails(null);
        setOwnerName("");
        setErrorMessage("Failed to fetch buyer details.");
      } finally {
        setLoading(false);
      }
    } else {
      setBuyerDetails(null);
      setOwnerName("");
      setErrorMessage("");
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    fetchBuyerDetails();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!buyerDetails) {
      setErrorMessage("Please enter a valid Buyer ID and click 'Add'.");
      return;
    }

    const formData = {
      shop_owner_id: buyerId,
      shop_owner_name: ownerName,
      total_ice_cream: parseInt(icecreamQuantity),
      sold_ice_cream: 0,
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      const response = await fetch(
        "https://signpostphonebook.in/icecream/owner_information.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Data submitted successfully!",
        }).then(() => {
          setBuyerId("");
          setOwnerName("");
          setIcecreamQuantity("");
          setBuyerDetails(null);
          setErrorMessage("");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: data.message,
        });
      }
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: "There was an error submitting the form.",
      });
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page in history
  };

  return (
    <div className="container-fluid p-3">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <p
          onClick={handleGoBack}
          className="me-3 bg-danger text-white p-2 mb-5"
        >
          <FaArrowLeft className="me-2" />
          Back
        </p>
        <h2 className="mb-0 text-center text-primary mt-5">
          <FaIceCream className="me-2" /> Icecream Owner
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="row gy-3">
        <div className="col-12">
          <label htmlFor="buyerId" className="form-label fw-bold">
            <FaUser className="me-1" /> Owner ID:
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control form-control-lg"
              id="buyerId"
              placeholder="Enter Owner ID"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-primary btn-lg"
              onClick={handleAddClick}
              disabled={!buyerId || loading}
            >
              {loading ? (
                <FaSpinner className="spinner-border spinner-border-sm" />
              ) : (
                <FaCheckCircle />
              )}{" "}
              Add
            </button>
          </div>
          {errorMessage && (
            <div className="text-danger mt-2">
              <FaTimesCircle className="me-1" /> {errorMessage}
            </div>
          )}
        </div>
        <div className="col-12">
          <label htmlFor="ownerName" className="form-label fw-bold">
            <FaUser className="me-1" /> Owner Name:
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            id="ownerName"
            value={ownerName}
            readOnly
            placeholder={loading ? "Loading..." : "Owner Name"}
          />
        </div>
        <div className="col-12">
          <label htmlFor="icecreamQuantity" className="form-label fw-bold">
            <FaIceCream className="me-1" /> Quantity:
          </label>
          <input
            type="number"
            className="form-control form-control-lg"
            id="icecreamQuantity"
            placeholder="Enter Quantity"
            value={icecreamQuantity}
            onChange={(e) => setIcecreamQuantity(e.target.value)}
          />
        </div>
        <div className="col-12 mt-3">
          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={!buyerDetails || loading || !icecreamQuantity}
          >
            Submit
          </button>
        </div>
      </form>
      {!loading && buyerDetails && (
        <div className="mt-4 p-3 bg-white text-dark shadow rounded">
          <h5 className="mb-2">
            <FaUser className="me-2" /> Owner Info:
          </h5>
          <p className="mb-1">
            <strong>Name:</strong>{" "}
            {buyerDetails.person || buyerDetails.businessname}
          </p>
          <p className="mb-1">
            <strong>City:</strong> {buyerDetails.city}
          </p>
          <p className="mb-0">
            <strong>Pincode:</strong> {buyerDetails.pincode}
          </p>
        </div>
      )}
      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <FaSpinner
            className="spinner-border text-primary spinner-border-lg"
            role="status"
          />
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default Shopkeeper;
