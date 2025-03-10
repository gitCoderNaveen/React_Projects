import React from "react";
import "../Css/Contactus.css"; // Import styles if needed
import image from "../assets/images/Logo_Phonebook.jpg";

const ContactCard = () => {
  return (
    <div style={{backgroundColor:"#282534"}}>
    <div className="contact-card">
      <img src={image} alt={`logo`} className="card-image" />
      <h3 className="company-name">Signpost Celfon.in Technology</h3>
      <p className="address">
      46, SIGNPOST TOWERS, FIRST FLOOR, SIDCO INDUSTRIAL ESTATE, TAMIL NADU, COIMBATORE ,Pincode - 641 021.
      </p>
      <div className="contact-numbers">
        <p className="contact-number">95145 55132</p>
      </div>
      <div className="contact-numbers">
        <p className="contact-number">drshivakumaarj.md@signpostphonebook.in</p>
      </div>
    </div>
    <div className="footer-div-contact">
      <p>Copy Rights © 2025 | SIGNPOST CELFON.IN TECHNOLOGY | All Rights Reserved.</p>
    </div>
    </div>
  );
};

export default ContactCard;
