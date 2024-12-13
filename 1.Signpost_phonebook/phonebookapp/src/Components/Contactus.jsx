import React from "react";
import "../Css/Contactus.css"; // Import styles if needed
import image from "../assets/images/Logo_Phonebook.jpg";

const ContactCard = () => {
  return (
    <div className="contact-card">
      <img src={image} alt={`logo`} className="card-image" />
      <h3 className="company-name">Signpost Celfon.in Technology</h3>
      <p className="address">
        No.46, SIDCO Industrial Estate, Coimbatore-641 021.
      </p>
      <div className="contact-numbers">
        <p className="contact-number">98436 57564</p>
      </div>
    </div>
  );
};

export default ContactCard;
