import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Components/Auth";
import "../Css/MediaPartner.css"; // Keeping your existing CSS

function MediaPartner() {
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
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const mypriority = "0";
  const mydiscount = "";
  const mydescription = "Update Soon";
  const cmpanyPrefix = "M/s.";
  const navigate = useNavigate();
  const smsBody = encodeURIComponent(
    `Dear ${
      mybusinessname ? `M/s.${mybusinessname}` : `${myprefix}.${myperson}`
    }, \n Signpost PHONE BOOK,  is a portal for  Mobile Number Finder and Dialerwith Digital Marketing. Please kindly view and verify the correctness of details on your firm, at the earliest. \n URL :- www.signpostphonebook.in \n User name :-  your mobile number \n Password  :- Signpost \n You can use the PHONE BOOK for your business promotion in any desired (Pincode) area so Entire Coimbatore`
  );

  const { userData } = useAuth();
  const [dateTime, setDateTime] = useState("");

  const updateDateTime = () => {
    const now = new Date();
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = now.toLocaleDateString(undefined, options);
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedTime = `<span class="math-inline">\{hours\}\:</span>{minutes < 10 ? "0" + minutes : minutes} ${ampm}`;
    setDateTime(`${formattedDate} ${formattedTime}`);
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
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
  const handlePopup = (e) => {
    e.preventDefault();
    setShowPopup(false);
    const smsBody = encodeURIComponent(
      `Dear ${
        mybusinessname
          ? `${myprefix} ${myperson}, M/s.${mybusinessname}`
          : `${myprefix} ${myperson}`
      }
Signpost PHONE BOOK,  is a portal for  Mobile Number Finder and & Dialer with Digital Marketing. Please kindly view and verify the correctness of details on your firm, at the earliest.

URL :- www.signpostphonebook.in
User name :-  Your mobile number
Password  :- Signpost
You are registered Under the Category
${myproduct}

You can use the PHONE BOOK for your business promotion in any desired (Pincode) area or Entire Coimbatore`
    );
    const smsLink = `sms:${mymobileno}?body=${smsBody}`;

    setTimeout(() => {
      window.location.href = smsLink;
    }, 2000);
    resetForm();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobileno(value);
      if (value.length > 10) {
        alert("The number should not exceed 10 digits.");
      } else if (value.length === 10 && !/^[6-9]/.test(value)) {
        alert("Enter a Valid number");
        setMobileno("");
      }
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

  const insertCount = async () => {
    const dataCount = {
      name: userData.businessname || userData.person,
      userid: userData.id,
      date: new Date().toISOString().split("T")[0],
      count: 1, //Default count is 1 if mycount is not set
    };

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/get_count_from_signpostphonebookdata.php",
        dataCount,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const responseData = response.data;

      if (responseData.success) {
        console.log(
          `Success: ${responseData.message}, New Count: ${responseData.newCount}`
        );
        console.log(responseData.message);
      } else {
        console.log(`Error: ${responseData.message}`);
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(`Error: Unable to reach the server. ${error.message}`);
      console.log(error.message);
    }
  };

  const insertbusinessName = async () => {
    const dataName = {
      name: userData.businessname || userData.person,
      date: new Date().toISOString().split("T")[0],
      dataentry_name: mybusinessname || myperson,
    };

    try {
      const response = await axios.post(
        "https://signpostphonebook.in/signpostphonebookdataentry_get_names.php",
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

  const insertRecord = async (e) => {
    e.preventDefault();

    if (!mymobileno) {
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
      discount: mydiscount,
      description: mydescription,
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
        setShowPopup(true);
        await insertCount(), insertbusinessName();
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
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="container shadow-md">
        <div className="card shadow-lg rounded-lg p-4">
          <button
            className="btn-close p-2 float-end fw-bolder"
            aria-label="Close"
            onClick={() => navigate("/home")}
          ></button>
          <h2 className="text-center mb-4 text-primary fw-bold">
            Media Partner Registration
          </h2>
          <form
            className="row g-3 needs-validation "
            onSubmit={insertRecord}
            noValidate
          >
            <div className="col-md-6">
              <label htmlFor="mobile" className="form-label fw-semibold">
                Mobile Number:<span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
                id="mobile"
                name="mobile"
                value={mymobileno}
                onClick={handleMobileHelptext}
                onChange={handleChange}
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
                  Type 10 digits without Country code (+91), without gap. Don't
                  Type Land Line.
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="person" className="form-label fw-semibold">
                Person Name:<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="person"
                name="person"
                value={myperson}
                onClick={handlePersonHelptext}
                onChange={handlePersonName}
                onSelect={() => {
                  if (mymobileno.length < 10) {
                    alert("Enter Valid Mobile Number");
                    setMobileno("");
                  }
                }}
              />
              {showPersonName && (
                <div className="form-text text-danger">
                  Type Initial at the end.
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Prefix:<span className="text-danger">*</span>
              </label>
              <div className="d-flex gap-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="title"
                    value="Mr."
                    checked={myprefix === "Mr."}
                    onClick={handleRadio}
                    onChange={(e) => {
                      setPrefix(e.target.value);
                    }}
                    id="mr"
                  />
                  <label className="form-check-label" htmlFor="mr">
                    Mr.
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="title"
                    value="Ms."
                    onClick={handleRadio}
                    checked={myprefix === "Ms."}
                    onChange={(e) => {
                      setPrefix(e.target.value);
                    }}
                    id="ms"
                  />
                  <label className="form-check-label" htmlFor="ms">
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

            <div className="col-md-6">
              <label htmlFor="businessname" className="form-label fw-semibold">
                Firm/Business Name:<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="businessname"
                name="businessname"
                value={mybusinessname}
                onClick={handleBusinessHelptext}
                onChange={handleBusinessName}
                onSelect={() => {
                  if (mymobileno.length < 10) {
                    alert("Enter Valid Mobile Number");
                    setMobileno("");
                  }
                }}
              />
              {showbusinesstext && (
                <div className="form-text text-danger">
                  Type Your FirmName or BusinessName.
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="city" className="form-label fw-semibold">
                City<span className="text-danger">*</span>:
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
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

            <div className="col-md-6">
              <label htmlFor="pincode" className="form-label fw-semibold">
                Pincode<span className="text-danger">*</span>:
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
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

            <div className="col-12">
              <label htmlFor="address" className="form-label fw-semibold">
                Address<span className="text-danger">*</span>:
              </label>
              <textarea
                className="form-control form-control-lg"
                id="address"
                name="address"
                value={myaddress}
                onClick={handleAddress}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                rows="3"
                required
              ></textarea>
              {showAddressText && (
                <div className="form-text text-danger">
                  Type Door Number, Street, Flat No, Appartment Name, Landmark,
                  Area Name etc.
                </div>
              )}
            </div>

            <div className="col-12">
              <label
                htmlFor="productService"
                className="form-label fw-semibold"
              >
                Product/Service:<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                id="productService"
                name="productService"
                value={myproduct}
                onChange={(e) => {
                  setProduct(e.target.value);
                }}
                onClick={handleProduct}
                required
              />
              {showProductText && (
                <div className="form-text text-danger">
                  Type Correct & Specific Name of Product/Service offered.
                  Separate Each Keyword By Comma. For example: "Plumber,
                  Electrician, Carpenter".
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label htmlFor="landline" className="form-label fw-semibold">
                Landline No:
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
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

            <div className="col-md-3">
              <label htmlFor="stdCode" className="form-label fw-semibold">
                STD Code:
              </label>
              <input
                type="number"
                className="form-control form-control-lg"
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
                  Type STD Code if Landline number is provided.
                </div>
              )}
            </div>

            <div className="col-md-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email:
              </label>
              <input
                type="email"
                className="form-control form-control-lg"
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

            <div className="col-12 text-center">
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-4 fw-bold"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPopup && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p className="mb-3 fw-semibold text-success">
                  Registered successfully!
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={handlePopup}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPopup1 && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title fw-bold">
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
                    <p className="mb-2 fw-semibold">
                      In the Name of{" "}
                      <strong className="text-primary">
                        {regBusinessPrefix} {regBusinessName}
                      </strong>
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="mb-2 fw-semibold">
                      In the name of{" "}
                      <strong className="text-primary">
                        {regPrefix} {regName}
                      </strong>
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer justify-content-center">
                <button
                  type="button"
                  className="btn btn-secondary btn-lg"
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

export default MediaPartner;
