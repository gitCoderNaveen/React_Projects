import React from "react";
import phonebookLogo from "../assets/images/Phonebook_Logo.png";
import qrCode from "../assets/images/QR_Scan.png";
import "../Css/Aboutus.css";

function AboutPage() {
  return (
    <div>
      <div
        style={{
          padding: "20px",
          fontFamily: "Arial, sans-serif",
          lineHeight: "1.6",
          backgroundColor: "#282534",
        }}
      >
        <h1
          style={{
            textAlign: "justify",
            color: "#fff",
            fontSize: "1.5rem",
            marginTop: "5px",
          }}
        >
          Signpost PHONE BOOK is Your ultimate solution for effective business
          promotion. We specialize in helping businesses reach their target
          audience through powerful marketing channels like SMS, WhatsApp, and
          Email.
        </h1>

        <h3 style={{ color: "#fff" }}>Highlights:</h3>
        <div className="phonebook_Intro">
          <div className="img_Section">
            <img src={phonebookLogo} alt="phonebookLogo" />
          </div>
          <div style={{ color: "#fff" }}>
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

        <h3 style={{ color: "#fff" }}>Uses:</h3>
        <div className="phonebook_Intro">
          <div style={{ color: "#fff" }}>
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
                Reach selectively to Firms, Professionals, Ladies or Gents, or
                All
              </li>
              <li>
                Specialty Reach: Find all the Prospects of a specific Category
                in a City and reach them.
              </li>
            </ul>
          </div>
          <div className="QR_Section">
            <img src={qrCode} alt="QrscanImage" />
          </div>
        </div>

        <h3 style={{ color: "#fff" }}>For Registrations, Subscription:</h3>
        <p style={{ color: "#fff", textAlign: "justify" }}>
          46, SIGNPOST TOWERS, FIRST FLOOR, SIDCO INDUSTRIAL ESTATE, TAMIL NADU,
          COIMBATORE ,Pincode - 641 021.
        </p>
        <p style={{ color: "#fff", textAlign: "justify" }}>
          <strong>Contact:</strong> 95145 55132
        </p>

        <h2 style={{ textAlign: "center", color: "#fff" }}>
          <strong>Signpost PHONE BOOK</strong>
        </h2>
        <p style={{ textAlign: "justify", color: "#fff" }}>
          Our platform is designed to deliver seamless user experiences,
          ensuring you can easily create, manage, and track your promotional
          campaigns with ease. Whether you're a small business or a large
          enterprise, our tools are built to scale with your needs. We pride
          ourselves on offering <strong>24/7 customer support</strong>, ensuring
          that help is always available whenever you need it. With our reliable
          services and dedicated team, you can focus on growing your business
          while we handle the communication. Get started with Signpost Phone
          Book today and take your business promotion to the next level!
        </p>
        <p style={{ textAlign: "center", color: "#fff" }}>
          Scan QR Code or Visit{" "}
          <strong color="#fff">
            <a href="https://signpostphonebook.in" style={{ color: "#fff" }}>
              www.signpostphonebook.in
            </a>
          </strong>
        </p>

        <h3 style={{ textAlign: "center", color: "#fff" }}>For MSMEs Only</h3>
        <p style={{ textAlign: "center", color: "#fff" }}>
          <strong>Annual Subscription:</strong>
          <br />
          Rs 2,500 (for Tiny & Micro)
          <br />
          Rs 4,500 (for Small)
        </p>
      </div>

      <div className="footer-div text-center py-3 bg-dark text-white">
        <p>
          Copy Rights © 2025 | SIGNPOST CELFON.IN TECHNOLOGY | All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
