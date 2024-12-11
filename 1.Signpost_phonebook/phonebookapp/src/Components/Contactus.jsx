import React from "react";
import "../Css/Contactus.css"; // Import styles if needed

const ContactCard = ({ image, companyName, address, contactNumbers }) => {
  return (
    <div className="contact-card">
      <img src={image} alt={`${companyName} logo`} className="card-image" />
      <h3 className="company-name">{companyName}</h3>
      <p className="address">{address}</p>
      <div className="contact-numbers">
        {contactNumbers.map((number, index) => (
          <p key={index} className="contact-number">
            {number}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ContactCard;
