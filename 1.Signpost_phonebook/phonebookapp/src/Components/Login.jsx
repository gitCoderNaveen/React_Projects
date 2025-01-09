import React, { useState } from "react";
import { useAuth } from "./Auth"; // Correctly import the useAuth hook
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [mobileno, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const { Login } = useAuth(); // Correct usage of context

  const navigate = useNavigate();
  const handleClosePopup = () => {
    setIsPopupOpen(false);
    navigate("/");
  };

  const handleMobileno = (e) => {
    if (e.target.value.length <= 10) setMobileNo(e.target.value);
    else alert("Allow only 10 digits");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    Login(mobileno, password);
    setMobileNo("");
    setPassword("");
  };

  return (
    <div className="login-page">
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-card">
            <button className="close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Mobile Number</label>
                <input
                  type="number"
                  id="username"
                  name="username"
                  maxLength={10}
                  value={mobileno}
                  onChange={handleMobileno}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                    required
                  />
                  {password && (
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <div className="links">
              <a href="#forgot-password">Forgot password?</a>
              <span> | </span>
              <button
                type="button"
                className="signupButton"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
