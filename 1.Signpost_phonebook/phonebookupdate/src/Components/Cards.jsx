import React from "react";
import "../Css/Card.css"; // Create a CSS file for styling

const Card = () => {
  return (
    <div className="card">
      <div className="badge">Prime</div>
      <div className="card-left">
        <h2 className="card-heading">Company Name</h2>
        <p className="card-address">1234 Street Name, City, State, ZIP</p>
      </div>
      <div className="card-right">
        <p className="card-phone">+1 (123) 456-7890</p>
        <div className="card-buttons">
          <button className="call-button">Call</button>
          <button className="more-button">More</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
