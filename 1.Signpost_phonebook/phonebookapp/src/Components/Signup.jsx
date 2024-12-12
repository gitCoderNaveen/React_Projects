import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Signup.css";

const Signup = () => {
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

  const navigate = useNavigate();

  const checkMobileNumber = async (mobile) => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_insert.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mobileno: mobile }),
        }
      );
      const result = await response.json();
      if (result.registered) {
        setIsRegistered(true);
        alert("This mobile number is already registered.");
        setMobileno("");
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      alert("Unable to verify mobile number.");
    }
  };

  const insertRecord = async () => {
    if (isRegistered) {
      alert("Mobile number is already registered.");
      return;
    }

    if (
      !mybusinessname ||
      !mydoorno ||
      !mycity ||
      !mypincode ||
      !myprefix ||
      !mymobileno
    ) {
      alert("Please enter all required fields.");
      return;
    }

    const Data = {
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
    };

    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_insert.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.Message) {
        alert(jsonResponse.Message);
        navigate("/login");
        resetFields();
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Error saving data.");
      console.log(error);
    }
  };

  const resetFields = () => {
    setBusinessname("");
    setCity("");
    setDoorno("");
    setEmail("");
    setLandLine("");
    setPincode("");
    setLcode("");
    setMobileno("");
    setPrefix("");
    setProduct("");
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <button className="close-button" onClick={() => navigate("/login")}>
          &times;
        </button>
        <h2 className="header-text">Signup</h2>

        <div className="form-container">
          <form className="scrollable-form">
            <label>Mobile Number :</label>
            <input
              type="text"
              placeholder="Mobile Number"
              maxLength={10}
              value={mymobileno}
              onChange={(e) => setMobileno(e.target.value)}
              onBlur={() => checkMobileNumber(mymobileno)}
              required
            />

            <label>Person / Business Name :</label>
            <input
              type="text"
              placeholder="Person/Business Name"
              value={mybusinessname}
              onChange={(e) => setBusinessname(e.target.value)}
              required
            />

            <label>*Prefix:</label>
            <div className="radio-group" aria-required>
              <div className="input-buttons">
                <label htmlFor="Mr">
                  <input
                    type="radio"
                    value="Mr."
                    checked={myprefix === "Mr."}
                    onChange={(e) => setPrefix(e.target.value)}
                  />
                  &nbsp;Male
                </label>
                <label htmlFor="Mr">
                  <input
                    type="radio"
                    value="Ms."
                    checked={myprefix === "Ms."}
                    onChange={(e) => setPrefix(e.target.value)}
                  />
                  &nbsp;Female
                </label>
                <label htmlFor="Mr">
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

            <label>Address :</label>
            <textarea
              placeholder="Address"
              value={mydoorno}
              onChange={(e) => setDoorno(e.target.value)}
            />

            <label>City :</label>
            <input
              type="text"
              placeholder="City"
              value={mycity}
              onChange={(e) => setCity(e.target.value)}
            />

            <label>Pincode :</label>
            <input
              type="text"
              placeholder="Pincode"
              maxLength={6}
              required
              value={mypincode}
              onChange={(e) => setPincode(e.target.value)}
            />

            <label>Product / Service :</label>
            <input
              type="text"
              placeholder="Product"
              value={myproduct}
              required
              onChange={(e) => setProduct(e.target.value)}
            />

            <label>Landline Number :</label>
            <input
              type="text"
              placeholder="Landline Number"
              value={mylandLine}
              onChange={(e) => setLandLine(e.target.value)}
            />

            <label>STD Code :</label>
            <input
              type="text"
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
            <label>Promo-Code :</label>
            <input
              type="number"
              placeholder="Your Promo-Code"
              value={myemail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </form>
        </div>
        <div className="submit-Button">
          <button
            className="btn btn-primary"
            type="button"
            onClick={insertRecord}
          >
            Submit
          </button>
        </div>
        <div className="login-container">
          <p>
            Already Have an Account?{" "}
            <button
              type="button"
              className="signupButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
