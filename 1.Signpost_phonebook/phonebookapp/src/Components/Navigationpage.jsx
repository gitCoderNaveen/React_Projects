import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import "../Css/Navbar.css";
import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2"; // Import SweetAlert

export default function Navigationpage() {
  const { user, Logout, Login, userData } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isIceCreamDropdownOpen, setIsIceCreamDropdownOpen] = useState(false); // State for dropdown visibility
  const adminUser = [
    "9843657564",
    "8344508070",
    "6383965890",
    "8838491311",
    "6383463820",
  ];
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

  const toggleIceCreamDropdown = () => {
    setIsIceCreamDropdownOpen(!isIceCreamDropdownOpen);
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
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Logout();
        navigate("/login");
        toggleDrawer();
      }
    });
  };

  const handleProfile = () => {
    navigate("/profilePage");
    toggleDrawer();
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
        <div className="container py-1">
          <NavLink className="nav-brand fw-bolder px-2" to="/">
            Signpost PHONE BOOK {/* Add the book icon */}
          </NavLink>
          <button
            className="navbar-toggler border-0" // Removed default icon
            type="button"
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
          >
            <div className={`hamburger ${isDrawerOpen ? "open" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
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
              {/* ICE CREAM DROPDOWN - Conditional rendering for admins only */}
              {isAdminUser && (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link text-light"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={isIceCreamDropdownOpen} // Control expansion with state
                    onClick={toggleIceCreamDropdown} // Toggle state on click
                  >
                    Ice Cream
                  </a>
                  <ul
                    className={`dropdown-menu ${
                      isIceCreamDropdownOpen ? "show" : ""
                    }`}
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/buyer"
                        onClick={() => setIsIceCreamDropdownOpen(false)}
                      >
                        <p>Buyer</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/shopkeeper"
                        onClick={() => setIsIceCreamDropdownOpen(false)}
                      >
                        Shopkeeper
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/transactions"
                        onClick={() => setIsIceCreamDropdownOpen(false)}
                      >
                        Transactions
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            {user ? (
              <div className="userfn-btn d-flex align-items-center">
                <span className="navbar-text d-block m-2 userlogin-name text-light">
                  {user ? (
                    <button className="user_btn" onClick={handleProfile}>
                      My Profile
                    </button>
                  ) : (
                    <p>
                      <strong>Guest</strong>
                    </p>
                  )}
                </span>
                <button
                  onClick={handleAddCustomer}
                  className="btn btn-primary me-2 fw-bold"
                  style={{ fontSize: "16px" }}
                >
                  {/* <MdPersonAddAlt1 className="me-2 mb-1" size={20} /> */}
                  <span style={{ fontSize: "20px" }}>+</span>Add Contact
                </button>
                <button
                  onClick={handleLogout}
                  className="btn btn-danger d-flex align-items-center justify-content-center"
                  style={{ fontSize: "16px" }}
                >
                  <MdLogout className="me-1" size={20} /> Logout
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center text-light text-center">
                <p>
                  <strong>Welcome Guest</strong>
                </p>
                <button onClick={handleLogin} className="btn btn-primary ms-3">
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Drawer Section (Conditional rendering for Ice Cream links) */}
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
              {/* Conditional rendering for Ice Cream links in the drawer */}
              {isAdminUser && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link fw-bold"
                      to="/icecream" // Keep this for the drawer if needed
                      onClick={toggleDrawer}
                    >
                      Ice Cream
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link ms-3"
                      to="/buyer"
                      onClick={toggleDrawer}
                    >
                      Buyer
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link ms-3"
                      to="/shopkeeper"
                      onClick={toggleDrawer}
                    >
                      Shopkeeper
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link ms-3"
                      to="/transactions"
                      onClick={toggleDrawer}
                    >
                      Transaction
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/favourite"
                  onClick={toggleDrawer}
                >
                  My List
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
                <NavLink
                  className="nav-link"
                  to="/about"
                  onClick={() => toggleDrawer()}
                >
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/contactus"
                  onClick={() => toggleDrawer()}
                >
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
                className="btn btn-primary btn-block mb-2 addContact-btn p-2 fw-bold"
              >
                <span>+</span> Add Contact
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-danger btn-block d-flex align-items-center justify-content-center"
              >
                <MdLogout className="me-2" size={20} /> Logout
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
