import React from "react";
import image from "../assets/images/Logo_Phonebook.jpg";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactCard = () => {
  const googleMapsLink = "https://maps.app.goo.gl/p8LGyq3KxWWfadFH6";

  return (
    <div className="bg-white text-dark py-5">
      <div
        className="container shadow p-5 rounded"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <div className="text-center">
          <img
            src={image}
            alt="logo"
            className="img-fluid mb-4"
            style={{ maxWidth: "150px" }}
          />
          <h3 className="mb-3">Signpost Celfon.in Technology</h3>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <FaMapMarkerAlt className="me-2" style={{ minWidth: "20px" }} />{" "}
            {/* Ensure consistent icon width */}
            <p className="mb-0 text-start">
              46, SIGNPOST TOWERS, FIRST FLOOR, SIDCO INDUSTRIAL ESTATE, TAMIL
              NADU, COIMBATORE - 641 021.
            </p>
          </div>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="d-block text-primary mb-3"
          >
            View on Google Maps
          </a>
          <div className="d-flex align-items-center justify-content-center mb-3">
            <FaPhone className="me-2" style={{ minWidth: "20px" }} />{" "}
            {/* Ensure consistent icon width */}
            <p className="mb-0 text-start">95145 55132</p>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-4">
            <FaEnvelope className="me-2" style={{ minWidth: "20px" }} />{" "}
            {/* Ensure consistent icon width */}
            <p className="mb-0 text-start">
              drshivakumaarj.md@signpostphonebook.in
            </p>
          </div>
        </div>
      </div>
      <div
        className="container text-center border-top pt-4"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <p className="text-muted mb-0">
          Copy Rights © 2025 | SIGNPOST CELFON.IN TECHNOLOGY | All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
