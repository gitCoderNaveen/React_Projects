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
  const [mypromocode, setMypromocode] = useState("");
  const [numberHelpText, setNumberHelpText] = useState(false);
  const [nameHelpText, setNameHelpText] = useState(false);
  const [prefixHelpText, setPrefixHelpText] = useState(false);
  const [addressHelpText, setAddressHelpText] = useState(false);
  const [cityHelpText, setCityHelpText] = useState(false);
  const [pincodeHelpText, setPincodeHelpText] = useState(false);
  const [prodcutHelpText, setProdcutHelpText] = useState(false);
  const [landlineHelpText, setlandlineHelpText] = useState(false);
  const [stdCodeHelpText, setstdCodeHelpText] = useState(false);
  const [emailHelpText, setemailHelpText] = useState(false);
  const [promoCodeHelpText, setPromoCodeHelpText] = useState(false);

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
      promocode: mypromocode,
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
    setMypromocode("");
  };

  const helpTextNumber = () => {
    setNameHelpText(false);
    setNumberHelpText(true);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextName = () => {
    setNameHelpText(true);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextPrefix = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(true);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextAddress = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(true);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextCity = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(true);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextPincode = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(true);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextProduct = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(true);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextLandline = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(true);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextstdCode = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(true);
    setemailHelpText(false);
    setPromoCodeHelpText(false);
  };
  const helpTextEmail = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(true);
    setPromoCodeHelpText(false);
  };

  const helpTextPromocode = () => {
    setNameHelpText(false);
    setNumberHelpText(false);
    setPrefixHelpText(false);
    setAddressHelpText(false);
    setCityHelpText(false);
    setPincodeHelpText(false);
    setProdcutHelpText(false);
    setlandlineHelpText(false);
    setstdCodeHelpText(false);
    setemailHelpText(false);
    setPromoCodeHelpText(true);
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
              type="number"
              placeholder="Mobile Number"
              maxLength={10}
              value={mymobileno}
              onClick={helpTextNumber}
              onChange={(e) => setMobileno(e.target.value)}
              onBlur={() => checkMobileNumber(mymobileno)}
              required
            />
            {numberHelpText && (
              <p className="helptext">
                Type 10 digits without Country code(+91) without Gap
              </p>
            )}
            <label>Person / Business Name :</label>
            <input
              type="text"
              placeholder="Person/Business Name"
              value={mybusinessname}
              onClick={helpTextName}
              onChange={(e) => setBusinessname(e.target.value)}
              required
            />
            {nameHelpText && (
              <p className="helptext">
                Enter your Business Name (or) Your Name
              </p>
            )}

            <label>*Prefix:</label>
            <div className="radio-group" aria-required>
              <label htmlFor="Mr">
                <input
                  type="radio"
                  value="Mr."
                  onClick={helpTextPrefix}
                  checked={myprefix === "Mr."}
                  onChange={(e) => setPrefix(e.target.value)}
                />
                &nbsp;Mr.
              </label>
              <label htmlFor="Mr">
                <input
                  type="radio"
                  value="Ms."
                  onClick={helpTextPrefix}
                  checked={myprefix === "Ms."}
                  onChange={(e) => setPrefix(e.target.value)}
                />
                &nbsp;Ms.
              </label>
              <label htmlFor="Mr">
                <input
                  type="radio"
                  value="M/s."
                  onClick={helpTextPrefix}
                  checked={myprefix === "M/s."}
                  onChange={(e) => setPrefix(e.target.value)}
                />
                &nbsp;Firm/Business
              </label>
            </div>
            {prefixHelpText && <p className="helptext">Select Your prefix</p>}

            <label>Address :</label>
            <textarea
              placeholder="Address"
              value={mydoorno}
              onClick={helpTextAddress}
              onChange={(e) => setDoorno(e.target.value)}
            />
            {addressHelpText && <p className="helptext">Enter your Address</p>}

            <label>City :</label>
            <input
              type="text"
              placeholder="City"
              value={mycity}
              onClick={helpTextCity}
              onChange={(e) => setCity(e.target.value)}
            />
            {cityHelpText && <p className="helptext">Enter Your City Hear</p>}

            <label>Pincode :</label>
            <input
              type="text"
              placeholder="Pincode"
              maxLength={6}
              onClick={helpTextPincode}
              required
              value={mypincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            {pincodeHelpText && (
              <p className="helptext">Enter Your Area Pincode</p>
            )}

            <label>Product / Service :</label>
            <input
              type="text"
              placeholder="Product"
              value={myproduct}
              onClick={helpTextProduct}
              required
              onChange={(e) => setProduct(e.target.value)}
            />
            {prodcutHelpText && (
              <p className="helptext">
                Enter Your Firm Product or your Personnel Designation
              </p>
            )}

            <label>Landline Number :</label>
            <input
              type="text"
              placeholder="Landline Number"
              value={mylandLine}
              onClick={helpTextLandline}
              onChange={(e) => setLandLine(e.target.value)}
            />
            {landlineHelpText && (
              <p className="helptext">Enter Your Companies Landline number</p>
            )}

            <label>STD Code :</label>
            <input
              type="text"
              placeholder="STD Code"
              onClick={helpTextstdCode}
              value={myLcode}
              onChange={(e) => setLcode(e.target.value)}
            />
            {stdCodeHelpText && (
              <p className="helptext">Enter Your Area STD Code</p>
            )}

            <label>Email :</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={myemail}
              onClick={helpTextEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailHelpText && (
              <p className="helptext">Enter Your full email Address</p>
            )}
            <label>Promo-Code :</label>
            <input
              type="text"
              placeholder="Mobile Number"
              maxLength={10}
              value={mypromocode}
              onClick={helpTextPromocode}
              onChange={(e) => setMypromocode(e.target.value)}
            />
            {promoCodeHelpText && (
              <p className="helptext">
                Enter the Number Refered you to this Website
              </p>
            )}
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
