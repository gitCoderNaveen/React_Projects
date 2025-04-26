import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./Auth"; // Assuming this is your auth context
import "../Css/UserProfile.css";
import { Modal, Button, Form } from "react-bootstrap";
import bookLogo from "../assets/images/logos.png";
import iceCreamBadge from "../assets/images/image.png"; // Import the ice cream badge image

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isShopOwner, setIsShopOwner] = useState(false);
  const [isWelcomeOwnerSuccess, setIsWelcomeOwnerSuccess] = useState(false); // State for "welcome owner" success
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userData, setUserData } = useAuth(); // Fetch userData from Auth context
  const [details, setDetails] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [referralCount, setReferralCount] = useState(0);
  const [taskCount, setTaskCount] = useState(""); // Task count
  const [isEditing, setIsEditing] = useState(false);
  const [editableDetails, setEditableDetails] = useState(userData || {});
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const toggleModal = () => setShowModal(!showModal);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const date = new Date().toISOString().split("T")[0];

  const [profileImage, setProfileImage] = useState(
    userData?.profileImage || null
  ); // Initialize with userData

  const userId = userData?.id; // Optional chaining to safely access user data
  const [modalState, setModalState] = useState({
    defaultModal: false, // Existing modal
    membershipCard: false, // New Membership Card modal
  });
  const [soldCount, setSoldCount] = useState("");

  const toggleMembershipModal = (modalName) => {
    setModalState((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  useEffect(() => {
    checkIsBuyer();
  }, []);

  // Fetch saved profile image from the database on page load
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await axios.get(
          `https://signpostphonebook.in/image_upload_for_new_database.php?id=${userId}`
        );
        if (response.data.success) {
          setProfileImage(response.data.imageUrl);
          setUserData((prevData) => ({
            ...prevData,
            profileImage: response.data.imageUrl,
          }));
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };
    if (userId) {
      fetchProfileImage();
      fetchCountData();
      checkIsBuyer();
      checkIsOwner();
    }
  }, [userId, setUserData]); // Add userId and setUser Data as dependencies

  const handleBuyNow = (price) => {
    setSelectedPrice(price);
  };

  const checkIsOwner = async () => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/icecream/check_shop_owner_id.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log("welcome Owner");
        setIsShopOwner(true); // Set isShopOwner to true if the user is an owner
        setIsWelcomeOwnerSuccess(true); // Assuming this also implies "welcome owner" success
      } else {
        console.log("Your not a owner");
        setIsShopOwner(false);
        setIsWelcomeOwnerSuccess(false);
      }
    } catch (error) {
      console.log("Error Message from Buyer check", error);
    }
  };
  const checkIsBuyer = async () => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/icecream/check_ice_cream_buyer.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId }),
        }
      );

      const result = await response.json();
      if (result.success) {
        console.log("welcome Buyer");
      } else {
        console.log("Your not a Buyer");
      }
    } catch (error) {
      console.log("Error Message from Buyer check", error);
    }
  };

  const fetchCountData = async () => {
    try {
      if (!userData?.id || !date) {
        setError("Please provide a valid ID and Date.");
        return;
      }

      const response = await fetch(
        `https://signpostphonebook.in/data_entry_details.php?userid=<span class="math-inline">\{userData\.id\}&date\=</span>{date}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        setDetails(data.data);
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to fetch details.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
    }
  };

  const questionsAndAnswers = [
    {
      question: "What services do you offer?",
      answer: "We provide web development, app design, and digital marketing.",
    },
    {
      question: "What are your working hours?",
      answer: "We are available from 9 AM to 6 PM, Monday to Friday.",
    },
    {
      question: "Do you offer custom solutions?",
      answer: "Yes, we offer tailored solutions based on your requirements.",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch team data based on user ID
  const fetchTeamData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://signpostphonebook.in/try_totalcount.php?id=${userData?.id}`
      );
      if (response.data?.total_count) {
        setTeamData([{ total_count: response.data.total_count }]);
        setTaskCount(response.data.total_count || 0); // Set task count from the API response
      } else {
        setTeamData([]);
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      setTeamData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch referral count based on user mobile number
  const fetchReferralCount = async () => {
    try {
      if (!userData?.mobileno) {
        setError("Mobile number is required for fetching referral count.");
        return;
      }

      const response = await fetch(
        `https://signpostphonebook.in/try_referrals_count.php?mobile=${encodeURIComponent(
          userData.mobileno
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch referral count.");
      }

      const data = await response.text(); // Fetch response as text

      const match = data.match(/Total Referred: (\d+)/); // Extract number from response

      if (match) {
        setReferralCount(parseInt(match[1], 10)); // Set extracted referral count
      } else {
        setError("No referral data found.");
      }
    } catch (error) {
      setError(error.message || "Failed to fetch referral count.");
    }
  };

  useEffect(() => {
    if (userData) {
      fetchTeamData();
      fetchReferralCount();
    }
  }, [userData]);

  // Handle edit toggle
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile changes
  const handleSave = async () => {
    try {
      if (!editableDetails.id) {
        setError("User ID is missing. Cannot update profile.");
        return;
      }

      const { ...payload } = editableDetails;
      payload.id = userData.id;

      console.log("Payload being sent to server:", payload);

      const response = await axios.post(
        "https://signpostphonebook.in/try_update_profile_for_new_database.php",
        payload
      );

      if (response.data.success) {
        if (setUserData) {
          setUserData((prevData) => ({
            ...prevData,
            ...payload, // Include updated details
          }));
        } else {
          console.error("setUserData is not a function");
        }
        setIsEditing(false); // Switch to non-editable view
        setError(""); // Clear any errors
        console.log("Profile updated successfully:", response.data.message);
      } else {
        console.error("Failed to update profile:", response.data.message);
        setError(response.data.message || "Failed to save changes.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleTabChange = (selectedTab) => {
    setActiveTab(selectedTab); // Update active tab
  };

  // Handle image upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("id", userData?.id);
    formData.append(
      "name",
      userData?.businessname || userData?.person || "Unknown"
    );

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/image_upload_for_new_database.php",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        setProfileImage(response.data.imageUrl);
        setUserData({ ...userData, profileImage: response.data.imageUrl }); // Update userData with new image URL
      } else {
        console.error("Upload failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleSoldSubmit = () => {
    // Implement your logic to handle the sold count here
    console.log("Items Sold:", soldCount);
    // You might want to send this data to your backend
    setSoldCount(""); // Clear the input after submission
  };

  const defaultimage =
    "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png";

  // Check if userData is available before rendering
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <div className="content">
        {activeTab === "general" && (
          <div className="general-tab ">
            <div className="tab-content">
              <div className="profile-header">
                <div className="profile-picture">
                  <label htmlFor="profile-upload" className="profile-circle">
                    <img
                      src={
                        userData?.profileImage
                          ? `https://signpostphonebook.in/${userData.profileImage}`
                          : defaultimage
                      }
                      alt="Profile"
                      className="profile-img"
                    />
                    <i className="fas fa-camera cam-icon"></i>
                  </label>
                  <input
                    type="file"
                    id="profile-upload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                <div className="profile-container">
                  <div className="profile-info">
                    <h3>
                      {userData.businessname ||
                        userData.person ||
                        "Business Name Not Available"}
                    </h3>
                    <p style={{ color: "black" }}>
                      {userData.product ? userData.product : ""}
                    </p>
                    <p>Count : {details.count}</p>
                  </div>

                  {modalState.membershipCard && (
                    <div className="modal-overlay">
                      <div className="modal-content">
                        <span
                          className="close-button"
                          onClick={() =>
                            toggleMembershipModal("membershipCard")
                          }
                        >
                          &times;
                        </span>
                        <div className="membership-card">
                          <div className="memcard-header">
                            <img
                              src={bookLogo}
                              alt="CompanyLogo"
                              className="CompanyLogo "
                            />
                            Membership Card
                            {(isShopOwner || isWelcomeOwnerSuccess) && (
                              <img
                                src={iceCreamBadge}
                                alt="Ice Cream Badge"
                                className="icecream-badge"
                              />
                            )}
                          </div>
                          <div className="memcard-content">
                            <img
                              src={
                                userData?.profileImage
                                  ? `https://signpostphonebook.in/${userData.profileImage}`
                                  : "https://cdn.pixabay.com/photo/2021/07/25/08/03/account-6491185_1280.png"
                              }
                              alt="Profile"
                              className="memprofile-img"
                            />
                            <div className="memuser-details">
                              <h2>
                                {userData.businessname || userData.person || ""}
                              </h2>

                              <p>
                                <strong>Address: </strong>
                                {userData.address}
                              </p>
                              <p>
                                <strong>pincode: </strong>
                                {userData.pincode}
                              </p>
                            </div>
                          </div>
                          {isWelcomeOwnerSuccess && (
                            <div className="owner-section">
                              <Form.Group className="mb-3">
                                {/* <Form.Label>Enter Icecream Count</Form.Label> */}
                                <Form.Control
                                  type="number"
                                  placeholder="Enter count"
                                  value={soldCount}
                                  onChange={(e) => setSoldCount(e.target.value)}
                                />
                              </Form.Group>
                              <Button
                                variant="primary"
                                onClick={handleSoldSubmit}
                              >
                                Submit Sold Count
                              </Button>
                            </div>
                          )}
                          <div className="memfooter">
                            This card is valid for 12 Months from the date of
                            issue.
                            <br />
                            46, Sidco Industrial Estate, Coimbatore - 641021
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  className="membership-button"
                  onClick={() => toggleMembershipModal("membershipCard")}
                >
                  Membership Card
                </button>
              </div>
              <div className="about-details">
                {/* <p>
                  <strong>ID:</strong> {userData.id || "N/A"}
                </p> */}
                <p>
                  <strong>Prefix:</strong>{" "}
                  {userData.prefix || userData.personprefix || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong> {userData.address || "N/A"}
                </p>
                <p>
                  <strong>City:</strong> {userData.city || "N/A"}
                </p>
                <p>
                  <strong>Pincode:</strong> {userData.pincode || "N/A"}
                </p>
                <p>
                  <strong>Mobile:</strong> {userData.mobileno || "N/A"}
                </p>
                <p>
                  <strong>Landline:</strong> {userData.landline || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email || "N/A"}
                </p>
              </div>
            </div>

            {/* <div className="tab-content-2 col-lg-4">
              <div className="description">
                <h3>Bio</h3>
                <p>{userData.description || "N/A"}</p>
                <Button onClick={toggleModal} variant="primary">
                  Request from{" "}
                  {userData.businessname ||
                    userData.person ||
                    "Business Name Not Available"}{" "}
                  to signpostphonebook
                </Button>

                <Modal show={showModal} onHide={toggleModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Frequently Asked Questions{" "}
                      <h3 style={{ fontSize: 18 }}>
                        contact us if you need help
                      </h3>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <div className="faq-list">
                      {questionsAndAnswers.map((item, index) => (
                        <div key={index} className="faq-item">
                          <strong>Q: {item.question}</strong>
                          <p>A: {item.answer}</p>
                        </div>
                      ))}
                    </div>


                    <Form.Group className="mt-3">
                      <Form.Label>Ask a Question:</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={toggleModal}>
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        toggleModal();
                      }}
                    >
                      Send
                    </Button>
                  </Modal.Footer>
                </Modal>
                <div className="socialmedia">
                  <h3>Links</h3>
                  <Button variant="primary">Share</Button>
                  <Button variant="primary">Social media of Signpost</Button>
                </div>
              </div>
            </div> */}
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="tab-content">
            <div className="team-card">
              <h3>Team</h3>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <p>{teamData.length || 0} Members</p>
              )}
            </div>
            <div className="team-card">
              <h3>Data Counts</h3>
              <p>{taskCount || 0} Tasks</p>
            </div>
            <div className="team-card">
              <h3>Referrals</h3>
              <p>{referralCount || 0} Referrals</p>
            </div>
          </div>
        )}
        {activeTab === "sub" && (
          <div className="sub-container ">
            {selectedPrice === null ? (
              <div className="tab-content-3">
                <div className="sub-tab">
                  {/* Weekly Plan */}
                  <div className="starter-plan-card">
                    <div className="plan-header">
                      <h5>1 Week Trial Pack</h5>
                      <p className="plan-price">₹20</p>
                    </div>
                    <div className="plan-body">
                      <ul className="plan-features">
                        <li>Duration: 7 Days</li>
                        <li>Bulk Messages for 7 days</li>
                        <li>Free Support</li>
                      </ul>
                      <Button
                        variant="success"
                        onClick={() => handleBuyNow(20)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                  {/* Monthly Plan */}
                  <div className="monthly-plan-card">
                    <div className="plan-header">
                      <h5>1 Month Pack</h5>
                      <p className="plan-price">₹200</p>
                    </div>
                    <div className="plan-body">
                      <ul className="plan-features">
                        <li>Referral Bonus: ₹50</li>
                        <li>Free Support</li>
                        <li>Sign-up Bonus: ₹20</li>
                      </ul>
                      <Button
                        variant="success"
                        onClick={() => handleBuyNow(200)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                  {/* Yearly Plan */}
                  <div className="yearly-plan-card">
                    <div className="plan-header">
                      <h5>1 Year Pack</h5>
                      <p className="plan-price">₹1000</p>
                    </div>
                    <div className="plan-body">
                      <ul className="plan-features">
                        <li>Unlimited messages</li>
                        <li>24/7 Support</li>
                        <li>Sign-up Bonus: ₹20</li>
                      </ul>
                      <Button
                        variant="success"
                        onClick={() => handleBuyNow(1000)}
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Payment Form
              <div>
                <div className="mb-4">
                  <h2>Confirm order and pay</h2>
                  <span>
                    Please make the payment, after that you can enjoy all the
                    features and benefits.
                  </span>
                </div>

                <div className="row mainbox">
                  <div className="col-md-8 leftside">
                    <div className="leftesidecard p-3">
                      <h6 className="text-uppercase"> From Payment details</h6>
                      <div className="inputbox mt-3">
                        <span>Name</span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          required
                          value={userData.businessname || userData.person || ""}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              businessname: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="inputbox mt-3 mr-2">
                            <span>Address</span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your name"
                              required
                              value={userData.address || ""}
                              onChange={(e) =>
                                setUserData({
                                  ...userData,
                                  businessname: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="d-flex flex-row">
                            <div className="inputbox mt-3 mr-2">
                              <span>City</span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                                value={userData.city || ""}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    businessname: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="inputbox mt-3 mr-2">
                              <span>pincode</span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                required
                                value={userData.pincode || ""}
                                onChange={(e) =>
                                  setUserData({
                                    ...userData,
                                    businessname: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 mb-4">
                        <h6 className="text-uppercase">To Billing Address</h6>
                        <div className="row txt mt-3">
                          <div className="col-md-6">
                            <div className="inputbox mt-3 mr-2">
                              <span>Company Name</span>
                              <span className="form-control">
                                signpostphonebook{" "}
                              </span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="inputbox mt-3 mr-2">
                              <span>Address</span>
                              <span className="form-control">Address</span>
                            </div>
                          </div>
                        </div>

                        <div className="row mt-2">
                          <div className="col-md-6">
                            <div className="inputbox mt-3 mr-2">
                              <span>City</span>
                              <span className="form-control">Coimbatore</span>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="inputbox mt-3 mr-2">
                              <span>Pincode</span>
                              <span className="form-control">621450</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mb-4 d-flex justify-content-between">
                      <Button
                        variant="secondary"
                        onClick={() => setSelectedPrice(null)}
                      >
                        Previous step
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => setShowModal(true)}
                      >
                        Pay ₹{selectedPrice}
                      </Button>
                    </div>
                  </div>

                  <div className="col-md-4 rightside-sub">
                    <div className="card-blue p-3 text-white mb-3">
                      <span>You have to pay</span>
                      <div className="d-flex flex-row align-items-end mb-3">
                        <h1 className="mb-0 yellow">₹{selectedPrice}</h1>
                        <span>.00</span>
                      </div>
                      <span>
                        Enjoy all the features and perks after you complete the
                        payment.
                      </span>
                      <a href="#" className="yellow decoration">
                        Know all the features
                      </a>
                      <div className="highlight">
                        <span>
                          100% Guaranteed support and updates for the next 5
                          years.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="tab-content">
            <h2>Settings</h2>

            {!isEditing ? (
              <>
                <p>Change Password</p>
                <p>Manage Notifications</p>
                <p>Privacy Settings</p>

                {/* Button to Enable Edit Mode */}
                <Button variant="primary" onClick={toggleEdit}>
                  Edit Profile
                </Button>
              </>
            ) : (
              <div className="about-edit-form">
                <Form.Group>
                  <Form.Label>Prefix</Form.Label>
                  <Form.Control
                    type="text"
                    name="prefix"
                    value={
                      editableDetails.prefix ||
                      editableDetails.personprefix ||
                      ""
                    }
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="businessname/person"
                    value={
                      editableDetails.businessname ||
                      editableDetails.person ||
                      ""
                    }
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Product</Form.Label>
                  <Form.Control
                    type="text"
                    name="product"
                    value={editableDetails.product || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={editableDetails.address || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={editableDetails.city || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="number"
                    name="pincode"
                    value={editableDetails.pincode || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={editableDetails.email || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={editableDetails.description || ""}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Action Buttons */}
                <div className="action-buttons">
                  <Button variant="secondary" onClick={toggleEdit}>
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <ul>
          <li
            className={activeTab === "general" ? "active" : ""}
            onClick={() => handleTabChange("general")}
          >
            General
          </li>
          <li
            className={activeTab === "tasks" ? "active" : ""}
            onClick={() => handleTabChange("tasks")}
          >
            Tasks
          </li>
          <li
            className={activeTab === "sub" ? "active" : ""}
            onClick={() => handleTabChange("sub")}
          >
            Subscription
          </li>
          <li
            className={activeTab === "settings" ? "active" : ""}
            onClick={() => handleTabChange("settings")}
          >
            Settings
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
