import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Signup.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function Signup() {
  const [mypromoCode, setPromoCode] = useState("");
  const [mybusinessname, setBusinessname] = useState("");
  const [myaddress, setAddress] = useState("");
  const [myperson, setPerson] = useState("");
  const [mycity, setCity] = useState("");
  const [mypincode, setPincode] = useState("");
  const [myproduct, setProduct] = useState("");
  const [mylandLine, setLandLine] = useState("");
  const [myLcode, setLcode] = useState("");
  const [myemail, setEmail] = useState("");
  const [myprefix, setPrefix] = useState("");
  const [mymobileno, setMobileno] = useState("");
  const [showMobiletext, setshowMobiletext] = useState(false);
  const [showbusinesstext, setShowBusinesstext] = useState(false);
  const [regName, setRegName] = useState("");
  const [regPrefix, setRegPrefix] = useState("");
  const [regBusinessName, setRegBusinessName] = useState("");
  const [regBusinessPrefix, setRegBusinessPrefix] = useState("");
  const [showPersonName, setShowPersonName] = useState(false);
  const [showprefixtext, setShowPrefixText] = useState(false);
  const [showAddressText, setshowAddressText] = useState(false);
  const [showCityText, setshowCityText] = useState(false);
  const [showPincodeText, setshowPincodeText] = useState(false);
  const [showProductText, setshowProductText] = useState(false);
  const [showLandlineText, setshowLandlineText] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [showStdText, setshowStdText] = useState(false);
  const [showEmailText, setshowEmailText] = useState(false);
  const [showPromoText, setshowPromoText] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const mypriority = "0";
  const mydiscount = "";
  const mydescription = "Update Soon";
  const cmpanyPrefix = "M/s.";
  const navigate = useNavigate();

  const [dateTime, setDateTime] = useState("");

  const updateDateTime = () => {
    const now = new Date();

    // Format date
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = now.toLocaleDateString(undefined, options);

    // Format time
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert to 12-hour format
    const formattedTime = `<span class="math-inline">\{hours\}\:</span>{minutes < 10 ? "0" + minutes : minutes} ${ampm}`;

    // Combine date and time
    setDateTime(`${formattedDate} ${formattedTime}`);
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const resetForm = () => {
    setBusinessname("");
    setMobileno("");
    setPrefix("");
    setAddress("");
    setPerson("");
    setPincode("");
    setCity("");
    setProduct("");
    setLandLine("");
    setLandLine("");
    setLcode("");
    setEmail("");
    setPromoCode("");
  };

  const handleBusinessName = (e) => {
    const businessName = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(businessName)) {
      setBusinessname(businessName);
    }
  };
  const handlePersonName = (e) => {
    const personName = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(personName)) {
      setPerson(personName);
    }
  };

  const handleClosePopup1 = (e) => {
    e.preventDefault();
    setShowPopup1(false);
  };
  const handleCityName = (e) => {
    const cityName = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(cityName)) {
      setCity(cityName);
    }
  };
  const checkMobileNumber = async (mobile) => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_insert_data_for_new_database.php`,
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
        console.log(result.data);
        setRegBusinessName(result.businessname);
        setRegBusinessPrefix(result.prefix);
        setRegName(result.person);
        setRegPrefix(result.personprefix);
        setIsRegistered(true);
        setShowPopup1(true);
        setMobileno("");
      } else {
        setIsRegistered(false);
        setShowPopup1(false);
      }
    } catch (error) {
      alert("Unable to verify mobile number.");
      console.log(error);
    }
  };

  const insertRecord = async (e) => {
    e.preventDefault();

    if (!myaddress || !mycity || !mypincode || !myprefix || !mymobileno) {
      alert("Please enter all required fields.");
      return;
    }

    if (isRegistered) {
      alert("Mobile number is already registered.");
      return;
    }
    const Data = {
      businessname: mybusinessname,
      prefix: cmpanyPrefix,
      person: myperson,
      personprefix: myprefix,
      address: myaddress,
      priority: mypriority,
      city: mycity,
      pincode: mypincode,
      mobileno: mymobileno,
      email: myemail,
      product: myproduct,
      landline: mylandLine,
      lcode: myLcode,
      promocode: mypromoCode,
      discount: mydiscount,
      description: mydescription,
      subscription_date: dateTime,
    };

    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_insert_data_for_new_database.php",
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
        Swal.fire({
          title: "Registration Successful!",
          html: `<p>You are successfully registered in the portal -</p>
                 <h4><strong>Signpost PHONE BOOK</strong></h4>
                 <p>Your access Credentials are :</p>
                 <p>User Name : <strong>${mymobileno}</strong></p>
                 <p>Password : <strong>Signpost</strong></p>`,
          icon: "success",
          confirmButtonText: "OK",
          didClose: () => {
            navigate("/login");
            resetForm();
          },
        });
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Error saving data.");
      console.log(error);
    }
  };

  const handleMobileHelptext = () => {
    setshowMobiletext(true);
    setShowPersonName(false);
    setShowPrefixText(false);
    setshowAddressText(false);
    setShowBusinesstext(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };

  const handleBusinessHelptext = () => {
    setShowBusinesstext(true);
    setshowMobiletext(false);
    setShowPersonName(false);
    setShowPrefixText(false);
    setshowAddressText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handlePersonHelptext = () => {
    checkMobileNumber(mymobileno);
    setShowPersonName(true);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowAddressText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleRadio = () => {
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(true);
    setshowAddressText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleAddress = () => {
    setshowAddressText(true);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleCity = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(true);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handlePincode = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(true);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleProduct = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(true);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleLandLine = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(true);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleStdCode = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(true);
    setshowEmailText(false);
    setshowPromoText(false);
  };
  const handleEmail = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(true);
    setshowPromoText(false);
  };
  const handlePromoCode = () => {
    setshowAddressText(false);
    setShowPersonName(false);
    setShowBusinesstext(false);
    setshowMobiletext(false);
    setShowPrefixText(false);
    setshowCityText(false);
    setshowPincodeText(false);
    setshowProductText(false);
    setshowLandlineText(false);
    setshowStdText(false);
    setshowEmailText(false);
    setshowPromoText(true);
  };
  return (
    <div className="container-fluid bg-light py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg p-4 rounded-lg">
            <button
              className="btn-close float-end"
              onClick={() => navigate("/login")}
              aria-label="Close"
            ></button>
            <h2 className="text-center mb-4">Signup</h2>
            <form className="scrollable-form">
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile Number<span className="text-danger">*</span>:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="mobile"
                  name="mobile"
                  value={mymobileno}
                  onClick={handleMobileHelptext}
                  onChange={(e) => {
                    setMobileno(e.target.value);
                  }}
                  maxLength={10}
                  onInput={(e) => {
                    if (e.target.value.length > 10)
                      e.target.value = e.target.value.slice(0, 10);
                  }}
                  onBlur={() => checkMobileNumber(mymobileno)}
                  required
                />
                {showMobiletext && (
                  <div className="form-text text-danger">
                    Type 10 digits with country code (+91), without gap. Don't
                    type Land Line.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Person Name<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={myperson}
                  onClick={handlePersonHelptext}
                  onChange={handlePersonName}
                />
                {showPersonName && (
                  <div className="form-text text-danger">
                    Type Initial at the end.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Prefix<span className="text-danger">*</span>:
                </label>
                <div className="d-flex align-items-center gap-3">
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="title"
                      value="Mr."
                      checked={myprefix === "Mr."}
                      onClick={handleRadio}
                      onChange={(e) => {
                        setPrefix(e.target.value);
                      }}
                      id="mr-radio" // Added an ID for the label to associate with
                    />
                    <label className="form-check-label" htmlFor="mr-radio">
                      Mr.
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name="title"
                      value="Ms."
                      onClick={handleRadio}
                      checked={myprefix === "Ms."}
                      onChange={(e) => {
                        setPrefix(e.target.value);
                      }}
                      id="ms-radio" // Added an ID for the label to associate with
                    />
                    <label className="form-check-label" htmlFor="ms-radio">
                      Ms.
                    </label>
                  </div>
                </div>
                {showprefixtext && (
                  <div className="form-text text-danger">
                    Select Mr. For Gents and Ms. for Ladies.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="businessName" className="form-label">
                  Firm/Business Name<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="businessName"
                  name="businessName"
                  value={mybusinessname}
                  onClick={handleBusinessHelptext}
                  onChange={handleBusinessName}
                />
                {showbusinesstext && (
                  <div className="form-text text-danger">
                    Type Your Firm Name or Business Name.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City<span className="text-danger">*</span>:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={mycity}
                  onClick={handleCity}
                  onChange={handleCityName}
                  required
                />
                {showCityText && (
                  <div className="form-text text-danger">
                    Type City Name. Don't Use Petnames (Kovai Etc.).
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode<span className="text-danger">*</span>:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="pincode"
                  name="pincode"
                  value={mypincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                  }}
                  onClick={handlePincode}
                  maxLength={6}
                  onInput={(e) => {
                    if (e.target.value.length > 6)
                      e.target.value = e.target.value.slice(0, 6);
                  }}
                  required
                />
                {showPincodeText && (
                  <div className="form-text text-danger">
                    Type 6 Digits Continuously Without Gap.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address<span className="text-danger">*</span>:
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={myaddress}
                  onClick={handleAddress}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  required
                ></textarea>
                {showAddressText && (
                  <div className="form-text text-danger">
                    Type Door Number, Street, Flat No, Appartment Name,
                    Landmark, Area Name etc.
                  </div>
                )}
              </div>

              {mybusinessname && (
                <div className="mb-3">
                  <label htmlFor="productService" className="form-label">
                    Product/Service<span className="text-danger">*</span>:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productService"
                    name="productService"
                    value={myproduct}
                    onChange={(e) => {
                      setProduct(e.target.value);
                    }}
                    onClick={handleProduct}
                  />
                  {showProductText && (
                    <div className="form-text text-danger">
                      Type Correct & Specific Name of Product/Service offered.
                      Separate Each Keyword By Comma.
                    </div>
                  )}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="landline" className="form-label">
                  Landline No:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="landline"
                  name="landline"
                  value={mylandLine}
                  onClick={handleLandLine}
                  onChange={(e) => {
                    setLandLine(e.target.value);
                  }}
                />
                {showLandlineText && (
                  <div className="form-text text-danger">
                    Type Only Landline, if Available. Don't Type Mobile Number
                    here.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="stdCode" className="form-label">
                  STD Code:
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="stdCode"
                  name="stdCode"
                  value={myLcode}
                  onClick={handleStdCode}
                  onChange={(e) => {
                    setLcode(e.target.value);
                  }}
                />
                {showStdText && (
                  <div className="form-text text-danger">
                    Type STD Code of your Landline.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email:
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={myemail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  onClick={handleEmail}
                />
                {showEmailText && (
                  <div className="form-text text-danger">
                    Type Correctly, Only If Available.
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="promoCode" className="form-label">
                  Promo Code:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="promoCode"
                  name="promoCode"
                  value={mypromoCode}
                  onClick={handlePromoCode}
                  onChange={(e) => {
                    setPromoCode(e.target.value);
                  }}
                />
                {showPromoText && (
                  <div className="form-text text-danger">
                    Mobile Number of Person, Who Referred you Here. Leave Blank
                    if Not Referred.
                  </div>
                )}
              </div>
            </form>
            <div className="d-grid mt-3">
              <button
                className="btn btn-primary"
                type="button"
                onClick={insertRecord}
              >
                Submit
              </button>
            </div>
            <p className="mt-3 text-center">
              If You have already registered, Please{" "}
              <button
                type="button"
                className="btn btn-link signupButton"
                onClick={() => {
                  navigate("/login");
                }}
              >
                <strong>Login</strong>
              </button>
            </p>
          </div>
        </div>
      </div>

      {showPopup1 && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  Mobile Number Already Registered
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClosePopup1}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                {regBusinessName ? (
                  <div>
                    <p>
                      In the Name of{" "}
                      <strong>
                        {regBusinessPrefix} {regBusinessName}
                      </strong>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p>
                      In the name of{" "}
                      <strong>
                        {regPrefix} {regName}
                      </strong>
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClosePopup1}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
