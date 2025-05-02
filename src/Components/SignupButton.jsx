import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const SignupButton = () => {
  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: "5px" }} />
      <NavLink className="nav-link" to="/signup">
        Signup
      </NavLink>
    </button>
  );
};

export default SignupButton;
