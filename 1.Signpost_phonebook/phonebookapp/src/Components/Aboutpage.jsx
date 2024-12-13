import React from "react";
import phonebookLogo from "../assets/images/Phonebook_Logo.png";
import qrCode from "../assets/images/QR_Scan.png";
import "../Css/Aboutus.css";

function AboutPage() {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#004080" }}>
        Business Promotion for MSMEs
      </h1>
      <h2 style={{ textAlign: "center", color: "#0066cc" }}>
        is now Made Easy with <strong>PHONE BOOK</strong>
      </h2>
      <p style={{ fontSize: "1.1rem", marginTop: "20px" }}>
        A Mobile App for Tiny, Micro & Small Firms
      </p>

      <h3 style={{ color: "#004080" }}>Highlights:</h3>
      <div className="phonebook_Intro">
        <div className="img_Section">
          <img src={phonebookLogo} alt="phonebookLogo" />
        </div>
        <div>
          <ul>
            <li>Built-in Database of Lakhs of MSMEs</li>
            <li>Can be used in your Smart Mobile Phones</li>
            <li>Firm-wise Alphabetical Search</li>
            <li>Category-wise Search (10,000+ Categories)</li>
            <li>Promoting your Business is now Made Easy</li>
            <li>Delivered in Old Feature Phones also</li>
            <li>New MSME Firms are daily added</li>
            <li>Highly Useful to B2C and B2B Segments</li>
          </ul>
        </div>
      </div>

      <h3 style={{ color: "#004080" }}>Uses:</h3>
      <div className="phonebook_Intro">
        <div>
          <ul>
            <li>Find Phone Numbers of any MSME & Dial</li>
            <li>Send SMS, WhatsApp, Email</li>
            <li>Shortlist targeted Prospects</li>
            <li>
              Nearby Mass Marketing - Send Bulk Promotional Text Messages
              selectively in a small nearby Postal area, or anywhere in India.
            </li>
            <li>
              Messages can be on Clearance Sales, New Introductions, Special
              Offers for the Day, Invitations, Change of Address, Shifting,
              Business Enquiries, Reminders
            </li>
            <li>Send Personalized messages</li>
            <li>
              Reach selectively to Firms, Professionals, Ladies or Gents, or All
            </li>
            <li>
              Specialty Reach: Find all the Prospects of a specific Category in
              a City and reach them.
            </li>
          </ul>
        </div>
        <div className="QR_Section">
          <img src={qrCode} alt="QrscanImage" />
        </div>
      </div>

      <h3 style={{ color: "#004080" }}>For Registrations, Subscription:</h3>
      <p>
        Signpost Celfon.in Technology, 46, SIDCO Industrial Estate, Coimbatore
        641021
      </p>
      <p>
        <strong>Contact:</strong> 98436 57564
      </p>

      <h2 style={{ textAlign: "center", color: "#0066cc" }}>
        <strong>Signpost PHONE BOOK</strong>
      </h2>
      <p style={{ textAlign: "center" }}>
        Scan QR Code or Visit{" "}
        <strong>
          <a href="https://signpostphonebook.in">www.signpostphonebook.in</a>
        </strong>
      </p>

      <h3 style={{ textAlign: "center", color: "#004080" }}>For MSMEs Only</h3>
      <p style={{ textAlign: "center" }}>
        <strong>Annual Subscription:</strong>
        <br />
        Rs 2,500 (for Tiny & Micro)
        <br />
        Rs 4,500 (for Small)
      </p>
    </div>
  );
}

export default AboutPage;
