import React from "react";
import "../Css/Homepage.css";

const ShimmerCard = () => (
  <div className="home_card-container shimmer-card">
    <div className="home_card-left">
      <div className="shimmer-line name"></div>
      <div className="shimmer-line location"></div>
    </div>
    <div className="home_card-right">
      <div className="shimmer-line phone"></div>
      <div className="button-group">
        <div className="shimmer-button call"></div>
        <div className="shimmer-button more"></div>
        <div className="shimmer-icon"></div>
      </div>
    </div>
  </div>
);

export default ShimmerCard;
