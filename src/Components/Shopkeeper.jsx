import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // Import SweetAlert

const Shopkeeper = () => {
  const [buyerId, setBuyerId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [icecreamQuantity, setIcecreamQuantity] = useState("");
  const [buyerDetails, setBuyerDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // State for loading spinner

  const fetchBuyerDetails = async () => {
    if (buyerId) {
      setLoading(true); // Start loading
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
          setOwnerName(matchedBuyer.person || matchedBuyer.businessname || ""); // Set owner name
          setErrorMessage(""); // Clear any previous error message
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
        setLoading(false); // End loading, regardless of success or failure
      }
    } else {
      setBuyerDetails(null);
      setOwnerName("");
      setErrorMessage("");
      setLoading(false); // Ensure loading is false if buyerId is empty
    }
  };

  // Fetch details only when the "Add" button is clicked
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

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="buyerId" className="form-label">
            Enter Owner ID:
          </label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              id="buyerId"
              value={buyerId}
              onChange={(e) => setBuyerId(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleAddClick}
              disabled={!buyerId}
            >
              Add
            </button>
          </div>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="ownerName" className="form-label">
            Owner Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="ownerName"
            value={ownerName}
            readOnly // Make it read-only as it's auto-filled
            placeholder={loading ? "Loading..." : ""} // Show loading text
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="icecreamQuantity" className="form-label">
            Enter Icecream Quantity:
          </label>
          <input
            type="number"
            className="form-control"
            id="icecreamQuantity"
            value={icecreamQuantity}
            onChange={(e) => setIcecreamQuantity(e.target.value)}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!buyerDetails || loading} // Disable submit during loading
          >
            Submit
          </button>
        </div>
      </form>

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && buyerDetails && (
        <div className="mt-3 alert alert-info">
          <h5>Buyer Details:</h5>
          <p className="mb-1">
            Name: {buyerDetails.person || buyerDetails.businessname}
          </p>
          <p className="mb-1">City: {buyerDetails.city}</p>
          <p className="mb-0">Pincode: {buyerDetails.pincode}</p>
        </div>
      )}
    </div>
  );
};

export default Shopkeeper;
