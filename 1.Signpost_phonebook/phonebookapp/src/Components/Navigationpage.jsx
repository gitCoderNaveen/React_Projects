import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "../Css/Navbar.css";

export default function Navigationpage() {
  const { user, Logout, Login, userData } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const adminUser = ["9843657564", "8344508070", "6383965890", "8838491311"];
  const checkAdminUser = adminUser.includes(userData?.mobileno);

  useEffect(() => {
    if (checkAdminUser) {
      setIsAdminUser(true);
    } else {
      setIsAdminUser(false);
    }
  }, [checkAdminUser]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleAddCustomer = () => {
    navigate("/Mediapartner");
    toggleDrawer();
  };

  const handleLogin = () => {
    Login();
    toggleDrawer();
    navigate("/login");
  };

  const handleLogout = () => {
    Logout();
    navigate("/login");
    toggleDrawer();
  };

  const handleProfile = () => {
    navigate("/profilePage");
    toggleDrawer();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <NavLink className="nav-brand" to="/">
            Signpost PHONE BOOK
          </NavLink>
          <button
            className="navbar-toggler bg-light"
            type="button"
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link text-light" to="/home">
                  Home
                </NavLink>
              </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/about">
                      About Us
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link text-light" to="/contactus">
                      Contact Us
                    </NavLink>
                  </li>    
                  {isAdminUser && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link text-light"
                    to="/admin"
                    onClick={toggleDrawer}
                  >
                    Admin
                  </NavLink>
                </li>
              )}      
            
            </ul>
            {user ? (
              <div className="userfn-btn">
                <span className="navbar-text d-block m-2 userlogin-name text-light">
                  {user ? (
                    <button className="user_btn" onClick={handleProfile}>
                      My Profile
                    </button>
                  ) : (
                    <p><strong>Guest</strong></p>
                  )}
                </span>
                <button onClick={handleAddCustomer} className="btn btn-primary">
                  <FaPlus className="me-2" />
                  Add Contact
                </button>
                <button onClick={handleLogout} className="btn btn-danger ms-3">
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center text-light text-center">
                <p><strong>Welcome Guest</strong></p>
                <button onClick={handleLogin} className="btn btn-primary ms-3">
                Login
              </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Drawer Section */}
      <div
        className={`drawer ${isDrawerOpen ? "drawer-open" : ""}`}
        style={{
          position: "fixed",
          top: "0",
          left: isDrawerOpen ? "0" : "-250px",
          width: "250px",
          height: "100%",
          backgroundColor: "#f8f9fa",
          boxShadow: "2px 0 5px rgba(0,0,0,0.2)",
          transition: "left 0.3s ease-in-out",
          zIndex: "1050",
        }}
      >
        <span className="navbar-text d-block m-2">
          {user ? (
            <div>
              <p>
                Welcome <strong>{user}</strong>
              </p>
              <button className="user_btn" onClick={handleProfile}>
                My Profile
              </button>
            </div>
          ) : (
            <strong>Welcome Guest</strong>
          )}
        </span>
        <ul className="navbar-nav p-3">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home" onClick={toggleDrawer}>
              Home
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/NearbyPromotion"
                  onClick={toggleDrawer}
                >
                  Nearby Promotion
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/SearchandSendSms"
                  onClick={toggleDrawer}
                >
                  Categorywise Promotion
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/reference"
                  onClick={toggleDrawer}
                >
                  Refer a Friend
                </NavLink>
              </li>
              {isAdminUser && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/admin"
                    onClick={toggleDrawer}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/subscriptionpage"
                  onClick={toggleDrawer}
                >
                  <button className="btn btn-danger">
                    Subscription Booking
                  </button>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={()=>toggleDrawer()}>
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contactus" onClick={()=>toggleDrawer()}>
                  Contact Us
                </NavLink>
              </li>
            </>
          )}
        </ul>
        <div>
          {user && (
            <div className="mb-3 userfn-btn">
              <button
                onClick={handleAddCustomer}
                className="btn btn-primary btn-block mb-2 addContact-btn"
              >
                <FaPlus className="me-2" />
                Add Contact
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-block"
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <button
              onClick={handleLogin}
              className="btn btn-primary btn-block m-2"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div
          className="drawer-overlay"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: "1040",
          }}
          onClick={toggleDrawer}
        ></div>
      )}

      <div style={{ paddingTop: "60px" }}></div>
    </div>
  );
}
