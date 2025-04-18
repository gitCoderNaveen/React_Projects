import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useAuth } from "./Auth";
import "../css/Login.css"; // Import the combined CSS

const LoginButton = () => {
  const { user } = useAuth();

  return (
    <button className="login-nav-button">
      <FontAwesomeIcon icon={faSignInAlt} className="login-icon" />
      {!user && (
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      )}
    </button>
  );
};

export default LoginButton;
