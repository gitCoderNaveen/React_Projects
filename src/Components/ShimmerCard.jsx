import React from "react";
import "../Css/Homepage.css";

const ShimmerCard = () => (
  <div className="home_card-container shimmer-card">
    {/* Discount Badge Placeholder */}
    <div className="shimmer-badge"></div>

    {/* Left Icons Placeholder */}
    <div className="home_card-left-icons">
      <div className="shimmer-icon-placeholder"></div>
      <div className="shimmer-icon-placeholder"></div>
    </div>

    {/* Middle Content Placeholders */}
    <div className="home_card-middle">
      <div className="shimmer-line name"></div>
      <div className="shimmer-line location"></div>
      <div className="shimmer-line phone"></div>
    </div>

    {/* Right Button Placeholder */}
    <div className="home_card-right">
      <div className="shimmer-button enquiry"></div>
    </div>
  </div>
);

export default ShimmerCard;
