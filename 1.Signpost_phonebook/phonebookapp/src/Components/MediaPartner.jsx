import React, { useEffect, useState } from "react";
import "../Css/MediaPartner.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import axios from "axios";

const MediaPartner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [mybusinessname, setBusinessname] = useState("");
  const [mydoorno, setDoorno] = useState("");
  const [mycity, setCity] = useState("");
  const [mypincode, setPincode] = useState("");
  const [myproduct, setProduct] = useState("");
  const [mylandLine, setLandLine] = useState("");
  const [myLcode, setLcode] = useState("");
  const [myemail, setEmail] = useState("");
  const [myprefix, setPrefix] = useState("");
  const [mymobileno, setMobileno] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [regName, setRegName] = useState("");
  const [showPopup1, setShowPopup1] = useState(false);
  const [regPrefix, setRegPrefix] = useState("");
  const { userData } = useAuth();
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const userName = userData?.businessname || "";
  const userId = userData?.id || "";

  const navigate = useNavigate();

  const resetForm = () => {
    setBusinessname("");
    setDoorno("");
    setCity("");
    setPincode("");
    setProduct("");
    setLandLine("");
    setLcode("");
    setEmail("");
    setPrefix("");
    setMobileno("");
    setIsRegistered(false);
    setErrors({});
  };

  useEffect(() => {
    setShowPopup(true);
  }, []);

  const checkMobileNumber = async (mobile) => {
    if (!mobile) return;

    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_insert.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobileno: mobile }),
        }
      );
      const result = await response.json();
      if (result.registered) {
        setIsRegistered(true);
        setRegName(result.businessname);
        setRegPrefix(result.prefix);
        setShowPopup(false);
        setShowPopup1(true);
        setMobileno("");
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      alert("Unable to verify mobile number.");
    }
  };
  const handleMobileno = (e) => {
    const mobile = e.target.value;
    if (mobile.length <= 10) {
      setMobileno(mobile);
    } else {
      alert("Allowed 10 digits only");
    }
  };

  const insertbusinessName = async () => {
    const dataName = {
      name: userName,
      date: new Date().toISOString().split("T")[0],
      dataentry_name: mybusinessname,
    };

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/dataentry_name_details.php",
        dataName,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        console.log("Success", response.message);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log("unable to reach server", error);
    }
  };

  const insertCount = async () => {
    const dataEntry = {
      name: userName,
      id: userId,
      date: new Date().toISOString().split("T")[0],
      count: 1, // Default count is 1 if mycount is not set
    };

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/data_enty_insert.php",
        dataEntry,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const responseData = response.data;

      // Handle response
      if (responseData.success) {
        setMessage(
          `Success: ${responseData.message}, New Count: ${responseData.newCount}`
        );
        console.log(message);
      } else {
        setMessage(`Error: ${responseData.message}`);
        console.log(message);
      }
    } catch (error) {
      setMessage(`Error: Unable to reach the server. ${error.message}`);
      console.log(message);
    }
  };
  const insertRecord = async (e) => {
    e.preventDefault();

    if (
      !mymobileno.trim() ||
      !mybusinessname.trim() ||
      !myprefix ||
      !myproduct.trim()
    ) {
      alert("Enter details in required fields.");
      return;
    }

    if (isRegistered) {
      alert("Mobile number is already registered.");
      return;
    }

    const data = {
      businessname: mybusinessname,
      doorno: mydoorno,
      city: mycity,
      pincode: mypincode,
      prefix: myprefix,
      mobileno: mymobileno,
      email: myemail,
      product: myproduct,
      landline: mylandLine,
      lcode: myLcode,
      promocode: "MediaPartner",
    };

    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_insert.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.Message) {
        alert("Success: " + jsonResponse.Message);
        await insertCount(), insertbusinessName();
        resetForm();
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  const handleClosePopup1 = () => {
    setShowPopup1(false);
    setShowPopup(true);
  };

  return (
    <div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card animate-slide-in">
            <h1 className="header-text">Media Partner</h1>
            <form className="form-container">
              <label>*Mobile Number :</label>
              <input
                type="number"
                placeholder="Mobile Number"
                value={mymobileno}
                maxLength={10}
                onChange={handleMobileno}
                onBlur={() => checkMobileNumber(mymobileno)}
                required
              />

              <label>*Name / Business Name :</label>
              <input
                type="text"
                placeholder="Name/Business Name"
                value={mybusinessname}
                onChange={(e) => setBusinessname(e.target.value)}
                required
              />

              <label>*Prefix:</label>
              <div className="radio-group">
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Mr."
                      checked={myprefix === "Mr."}
                      onChange={(e) => setPrefix(e.target.value)}
                    />
                    Mr.
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Ms."
                      checked={myprefix === "Ms."}
                      onChange={(e) => setPrefix(e.target.value)}
                    />
                    &nbsp;Ms.
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="M/s."
                      checked={myprefix === "M/s."}
                      onChange={(e) => setPrefix(e.target.value)}
                    />
                    &nbsp;Firm/Business
                  </label>
                </div>
              </div>

              <label>*Address :</label>
              <textarea
                placeholder="Address"
                rows="4"
                value={mydoorno}
                onChange={(e) => setDoorno(e.target.value)}
              />

              <label>*City :</label>
              <input
                type="text"
                placeholder="City"
                value={mycity}
                onChange={(e) => setCity(e.target.value)}
              />

              <label>*Pincode :</label>
              <input
                type="number"
                placeholder="Pincode"
                value={mypincode}
                onChange={(e) => setPincode(e.target.value)}
              />

              <label>*Product / Service :</label>
              <input
                type="text"
                placeholder="Product"
                value={myproduct}
                onChange={(e) => setProduct(e.target.value)}
                required
              />

              <label>Landline Number :</label>
              <input
                type="number"
                placeholder="Landline Number"
                value={mylandLine}
                onChange={(e) => setLandLine(e.target.value)}
              />

              <label>STD Code :</label>
              <input
                type="number"
                placeholder="STD Code"
                value={myLcode}
                onChange={(e) => setLcode(e.target.value)}
              />

              <label>Email :</label>
              <input
                type="email"
                placeholder="example@mail.com"
                value={myemail}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="submitButton">
                <button
                  type="button"
                  className="close-popup-btn"
                  onClick={() => {
                    setShowPopup(false);
                    navigate("/");
                  }}
                >
                  X
                </button>
              </div>
            </form>
            <button className="open-popup-btn m-2" onClick={insertRecord}>
              Submit
            </button>
          </div>
        </div>
      )}
      {/* Popup Modal */}
      {showPopup1 && (
        <div style={popupStyles.overlay}>
          <div style={popupStyles.modal}>
            <h3>Mobile Number Already Registered</h3>
            <p>
              <strong>In the Name of:</strong> {regPrefix}
              {regName}
            </p>
            <button onClick={handleClosePopup1} style={popupStyles.closeButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
// Popup styles
const popupStyles = {
  error: {
    color: "#EC2D01",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "400px",
    width: "80%",
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default MediaPartner;
