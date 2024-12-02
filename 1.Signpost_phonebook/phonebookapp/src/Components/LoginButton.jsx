import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Auth";

const LoginButton = () => {
  const { user } = useAuth();

  return (
    <button
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        outline: "none",
      }}
    >
      <FontAwesomeIcon icon={faSignInAlt} style={{ marginRight: "10px" }} />
      {!user && (
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      )}
    </button>
  );
};

export default LoginButton;
