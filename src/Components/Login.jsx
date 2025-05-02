import React, { useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Removed FaSpinner

const Login = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [mobileno, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { Login } = useAuth();
  const [loading, setLoading] = useState(false);

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
    setPassword(e.target.value.toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading
    Login(mobileno, password);
    setMobileNo("");
    setPassword("");
    setLoading(false);
    // Navigation will likely happen within the Login function from the Auth context
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
                    <span
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  )}
                </div>
              </div>
              <button type="submit" className="login-button" disabled={loading}>
                {loading ? <div className="loader"></div> : "Login"}
              </button>
            </form>
            <div className="links">
              <a>Dont have an account?</a>
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
