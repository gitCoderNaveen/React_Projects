import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const NavbarWithDrawer = ({
  user,
  handleAddCustomer,
  handleLogin,
  handleLogout,
}) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Singpost Phone Book
          </a>
          <button
            className="navbar-toggler d-lg-none" // Hide toggle button on large screens
            type="button"
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`${
              isDrawerOpen ? "show" : "collapse"
            } navbar-collapse d-lg-flex justify-content-between`}
            id="navbarMenu"
            style={{
              backgroundColor: isDrawerOpen ? "#f8f9fa" : "transparent",
              zIndex: "1050",
              position: isDrawerOpen ? "absolute" : "static",
              top: "60px",
              left: "0",
              width: "100%",
              padding: isDrawerOpen ? "10px" : "0",
              boxShadow: isDrawerOpen
                ? "0 2px 10px rgba(0, 0, 0, 0.2)"
                : "none",
            }}
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                  onClick={() => setDrawerOpen(false)}
                >
                  Home
                </NavLink>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/NearbyPromotion"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Nearby Promotion
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/about"
                  onClick={() => setDrawerOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contactus"
                  onClick={() => setDrawerOpen(false)}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {user && (
                <span className="navbar-text me-3">
                  Welcome, <strong>{user}</strong>
                </span>
              )}
              {user ? (
                <>
                  <button
                    onClick={handleAddCustomer}
                    className="btn btn-primary me-2"
                  >
                    <FaPlus className="me-2" />
                    Add Contact
                  </button>
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </>
              ) : (
                <button onClick={handleLogin} className="btn btn-primary">
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for drawer */}
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
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}

      {/* To add spacing after the fixed navbar */}
      <div style={{ paddingTop: "60px" }}></div>
    </div>
  );
};

export default NavbarWithDrawer;
