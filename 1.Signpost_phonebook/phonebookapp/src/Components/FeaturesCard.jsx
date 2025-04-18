import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const FeaturesCard = () => {
  return (
    <div className="mt-4 px-5">
      {" "}
      <div className="text-center">
        <p className="fs-2 fw-bold" style={{ color: "#2F0036" }}>
          {" "}
          Features of{" "}
          <span style={{ color: "#EA580C" }} className="fs-2">
            Signpost PHONEBOOK
          </span>{" "}
        </p>
        <p className="lead py-2 text-muted">
          {" "}
          Stay up-to-date with new mobile user additions to the directory every
          day.
        </p>
        <p className="text-muted py-1">
          {" "}
          Designed for effective B2B, B2C, and D2C marketing, catering to
          diverse business needs.
        </p>
      </div>
    </div>
  );
};

export default FeaturesCard;
