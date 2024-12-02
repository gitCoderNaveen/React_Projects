import React, { useState } from "react";
import { useAuth } from "./Auth"; // Correctly import the useAuth hook
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";

const Login = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [mobileno, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSignup = () => {
    navigate("/signup");
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
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handlePassword}
                  required
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <div className="links">
              <a href="#forgot-password">Forgot password?</a>
              <span> | </span>
              <a href="/signup" onClick={handleSignup}>
                Signup
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
