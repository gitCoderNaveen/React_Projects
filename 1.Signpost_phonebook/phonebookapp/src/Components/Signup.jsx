// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../Css/Signup.css";

// const Signup = () => {
//   const [mybusinessname, setBusinessname] = useState("");
//   const [mydoorno, setDoorno] = useState("");
//   const [mycity, setCity] = useState("");
//   const [mypincode, setPincode] = useState("");
//   const [myproduct, setProduct] = useState("");
//   const [mylandLine, setLandLine] = useState("");
//   const [myLcode, setLcode] = useState("");
//   const [myemail, setEmail] = useState("");
//   const [myprefix, setPrefix] = useState("");
//   const [mymobileno, setMobileno] = useState("");
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [mypromocode, setMypromocode] = useState("");
//   const [numberHelpText, setNumberHelpText] = useState(false);
//   const [nameHelpText, setNameHelpText] = useState(false);
//   const [prefixHelpText, setPrefixHelpText] = useState(false);
//   const [addressHelpText, setAddressHelpText] = useState(false);
//   const [cityHelpText, setCityHelpText] = useState(false);
//   const [pincodeHelpText, setPincodeHelpText] = useState(false);
//   const [prodcutHelpText, setProdcutHelpText] = useState(false);
//   const [landlineHelpText, setlandlineHelpText] = useState(false);
//   const [stdCodeHelpText, setstdCodeHelpText] = useState(false);
//   const [emailHelpText, setemailHelpText] = useState(false);
//   const [promoCodeHelpText, setPromoCodeHelpText] = useState(false);
//   const [showPopup, setShowPopup] = useState(false); // For popup visibility

//   const navigate = useNavigate();

//   const checkMobileNumber = async (mobile) => {
//     try {
//       const response = await fetch(
//         `https://signpostphonebook.in/client_insert.php`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ mobileno: mobile }),
//         }
//       );
//       const result = await response.json();
//       if (result.registered) {
//         setIsRegistered(true);
//         alert("This mobile number is already registered.");
//         setMobileno("");
//       } else {
//         setIsRegistered(false);
//       }
//     } catch (error) {
//       alert("Unable to verify mobile number.");
//     }
//   };

//   const insertRecord = async () => {
//     if (isRegistered) {
//       alert("Mobile number is already registered.");
//       return;
//     }

//     if (
//       !mybusinessname ||
//       !mydoorno ||
//       !mycity ||
//       !mypincode ||
//       !myprefix ||
//       !mymobileno
//     ) {
//       alert("Please enter all required fields.");
//       return;
//     }

//     const Data = {
//       businessname: mybusinessname,
//       doorno: mydoorno,
//       city: mycity,
//       pincode: mypincode,
//       prefix: myprefix,
//       mobileno: mymobileno,
//       email: myemail,
//       product: myproduct,
//       landline: mylandLine,
//       lcode: myLcode,
//       promocode: mypromocode,
//     };

//     try {
//       const response = await fetch(
//         "https://signpostphonebook.in/client_insert.php",
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(Data),
//         }
//       );

//       const jsonResponse = await response.json();

//       if (jsonResponse.Message) {
//         setShowPopup(true); // Show success modal
//       } else {
//         alert("Unexpected response from server.");
//       }
//     } catch (error) {
//       alert("Error saving data.");
//       console.log(error);
//     }
//   };

//   const resetFields = () => {
//     setBusinessname("");
//     setCity("");
//     setDoorno("");
//     setEmail("");
//     setLandLine("");
//     setPincode("");
//     setLcode("");
//     setMobileno("");
//     setPrefix("");
//     setProduct("");
//     setMypromocode("");
//   };

//   const helpTextNumber = () => {
//     setNameHelpText(false);
//     setNumberHelpText(true);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextName = () => {
//     setNameHelpText(true);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextPrefix = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(true);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextAddress = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(true);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextCity = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(true);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextPincode = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(true);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextProduct = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(true);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextLandline = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(true);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextstdCode = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(true);
//     setemailHelpText(false);
//     setPromoCodeHelpText(false);
//   };
//   const helpTextEmail = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(true);
//     setPromoCodeHelpText(false);
//   };

//   const helpTextPromocode = () => {
//     setNameHelpText(false);
//     setNumberHelpText(false);
//     setPrefixHelpText(false);
//     setAddressHelpText(false);
//     setCityHelpText(false);
//     setPincodeHelpText(false);
//     setProdcutHelpText(false);
//     setlandlineHelpText(false);
//     setstdCodeHelpText(false);
//     setemailHelpText(false);
//     setPromoCodeHelpText(true);
//   };

//   const handlePopup = (e) => {
//     e.preventDefault();
//     setShowPopup(false);
//     navigate("/login");
//     resetFields();
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-content">
//         <button className="close-button" onClick={() => navigate("/login")}>
//           &times;
//         </button>
//         <h2 className="header-text">Signup</h2>

//         <div className="form-container">
//           <form className="scrollable-form">
//             <label>Mobile Number :</label>
//             <input
//               type="number"
//               placeholder="Mobile Number"
//               maxLength={10}
//               value={mymobileno}
//               onClick={helpTextNumber}
//               onChange={(e) => setMobileno(e.target.value)}
//               onBlur={() => checkMobileNumber(mymobileno)}
//               required
//             />
//             {numberHelpText && (
//               <p className="helptext">
//                 Type 10 digits without Country code(+91) without Gap
//               </p>
//             )}
//             <label>Person / Business Name :</label>
//             <input
//               type="text"
//               placeholder="Person/Business Name"
//               value={mybusinessname}
//               onClick={helpTextName}
//               onChange={(e) => setBusinessname(e.target.value)}
//               required
//             />
//             {nameHelpText && (
//               <p className="helptext">
//                 Enter your Business Name (or) Your Name
//               </p>
//             )}

//             <label>*Prefix:</label>
//             <div className="radio-group" aria-required>
//               <label htmlFor="Mr">
//                 <input
//                   type="radio"
//                   value="Mr."
//                   onClick={helpTextPrefix}
//                   checked={myprefix === "Mr."}
//                   onChange={(e) => setPrefix(e.target.value)}
//                 />
//                 &nbsp;Mr.
//               </label>
//               <label htmlFor="Mr">
//                 <input
//                   type="radio"
//                   value="Ms."
//                   onClick={helpTextPrefix}
//                   checked={myprefix === "Ms."}
//                   onChange={(e) => setPrefix(e.target.value)}
//                 />
//                 &nbsp;Ms.
//               </label>
//               <label htmlFor="Mr">
//                 <input
//                   type="radio"
//                   value="M/s."
//                   onClick={helpTextPrefix}
//                   checked={myprefix === "M/s."}
//                   onChange={(e) => setPrefix(e.target.value)}
//                 />
//                 &nbsp;Firm/Business
//               </label>
//             </div>
//             {prefixHelpText && (
//               <p className="helptext">
//                 Select Mr. for Gents and Ms. for ladies
//               </p>
//             )}

//             <label>Address :</label>
//             <textarea
//               placeholder="Address"
//               value={mydoorno}
//               onClick={helpTextAddress}
//               onChange={(e) => setDoorno(e.target.value)}
//             />
//             {addressHelpText && (
//               <p className="helptext">
//                 Type Door No, Street, Flat No, Appartment Name, Land Mark, Area
//                 Name
//               </p>
//             )}

//             <label>City :</label>
//             <input
//               type="text"
//               placeholder="City"
//               value={mycity}
//               onClick={helpTextCity}
//               onChange={(e) => setCity(e.target.value)}
//             />
//             {cityHelpText && (
//               <p className="helptext">
//                 Type City Name, Don't use Petnames (Kovai etc)
//               </p>
//             )}

//             <label>Pincode :</label>
//             <input
//               type="number"
//               placeholder="Pincode"
//               maxLength={6}
//               onClick={helpTextPincode}
//               required
//               value={mypincode}
//               onChange={(e) => setPincode(e.target.value)}
//             />
//             {pincodeHelpText && (
//               <p className="helptext">
//                 Type 6 Digits, Continiously Without Gap.
//               </p>
//             )}

//             <label>Product / Service :</label>
//             <input
//               type="text"
//               placeholder="Product"
//               value={myproduct}
//               onClick={helpTextProduct}
//               required
//               onChange={(e) => setProduct(e.target.value)}
//             />
//             {prodcutHelpText && (
//               <p className="helptext">
//                 Type Correct & Specific Name of Product/Service offered.
//               </p>
//             )}

//             <label>Landline Number :</label>
//             <input
//               type="text"
//               placeholder="Landline Number"
//               value={mylandLine}
//               onClick={helpTextLandline}
//               onChange={(e) => setLandLine(e.target.value)}
//             />
//             {landlineHelpText && (
//               <p className="helptext">
//                 Type Only Available Landline only Don't Type Mobile Number Here
//               </p>
//             )}

//             <label>STD Code :</label>
//             <input
//               type="text"
//               placeholder="STD Code"
//               onClick={helpTextstdCode}
//               value={myLcode}
//               onChange={(e) => setLcode(e.target.value)}
//             />
//             {stdCodeHelpText && (
//               <p className="helptext">
//                 Type this Only the Landline is Typed above.
//               </p>
//             )}

//             <label>Email :</label>
//             <input
//               type="email"
//               placeholder="example@mail.com"
//               value={myemail}
//               onClick={helpTextEmail}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             {emailHelpText && (
//               <p className="helptext">Type Correctly, Only is Available.</p>
//             )}
//             <label>Promo-Code :</label>
//             <input
//               type="text"
//               placeholder="Mobile Number"
//               maxLength={10}
//               value={mypromocode}
//               onClick={helpTextPromocode}
//               onChange={(e) => setMypromocode(e.target.value)}
//             />
//             {promoCodeHelpText && (
//               <p className="helptext">
//                 Enter the Number Refered you to use this Website
//               </p>
//             )}
//           </form>
//         </div>
//         <div className="submit-Button">
//           <button
//             className="btn btn-primary"
//             type="button"
//             onClick={insertRecord}
//           >
//             Submit
//           </button>
//         </div>
//         <div className="login-container">
//           <p>
//             Already Have an Account?{" "}
//             <button
//               type="button"
//               className="signupButton"
//               onClick={() => {
//                 navigate("/login");
//               }}
//             >
//               Login
//             </button>
//           </p>
//         </div>
//         {/* Success Modal */}
//         {/* Popup Card */}
//         {showPopup && (
//           <div className="popup">
//             <div className="popup-content">
//               <p>You are successfully registered in the portal -</p>
//               <h4>
//                 <strong>Signpost PHONE BOOK</strong>
//               </h4>
//               <p>Your access Credintials are :</p>
//               <p>
//                 User Name : <strong>{mymobileno},</strong>{" "}
//               </p>
//               <p>
//                 Password : <strong>Signpost</strong>{" "}
//               </p>

//               <button onClick={handlePopup}>OK</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useEffect, useState } from "react";
import "../Css/Signup.css";
import { useNavigate } from "react-router-dom";

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
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup1, setShowPopup1] = useState(false);
  const mypriority = "0";
  const mydiscount = "10";
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
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;

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
  const handlePopup = (e) => {
    e.preventDefault();
    setShowPopup(false);
    navigate("/login");
    resetForm();
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
        setShowPopup(true);
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
    <div className="signup-container">
      <div className="signup-content">
        <button className="close-button" onClick={() => navigate("/login")}>
          &times;{" "}
        </button>
        <h2 className="header-text">Signup</h2>
        <div className="form-container">
          <form className="scrollable-form">
            <label htmlFor="mobile">Mobile Number:</label>
            <input
              type="number"
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
              <p className="helptext">{`Type 10 digits with get Country code (+91), without gap Don't Type Land Line`}</p>
            )}

            <label htmlFor="name">Person Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={myperson}
              onClick={handlePersonHelptext}
              onChange={handlePersonName}
            />
            {showPersonName && (
              <p className="helptext">{`Type Initial at the end`}</p>
            )}

            <label>Prefix:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="title"
                  value="Mr."
                  checked={myprefix === "Mr."}
                  onClick={handleRadio}
                  onChange={(e) => {
                    setPrefix(e.target.value);
                  }}
                />
                Mr.
              </label>
              <label>
                <input
                  type="radio"
                  name="title"
                  value="Ms."
                  onClick={handleRadio}
                  checked={myprefix === "Ms."}
                  onChange={(e) => {
                    setPrefix(e.target.value);
                  }}
                />
                Ms.
              </label>
            </div>
            {showprefixtext && (
              <p className="helptext">{`Select Mr. For Gents and Ms. for Ladies`}</p>
            )}

            <label htmlFor="name">Firm/Business Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={mybusinessname}
              onClick={handleBusinessHelptext}
              onChange={handleBusinessName}
            />
            {showbusinesstext && (
              <p className="helptext">{`Type Your FirmName or BusinessName`}</p>
            )}

            <label htmlFor="address">Address:</label>
            <textarea
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
              <p className="helptext">{`Type Door Number, Street, Flat No, Appartment Name, Landmark, Area Name etc.`}</p>
            )}

            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={mycity}
              onClick={handleCity}
              onChange={handleCityName}
              required
            />
            {showCityText && (
              <p className="helptext">{`Type City Name. Don't Use Petnames (Kovai Etc.)`}</p>
            )}

            <label htmlFor="pincode">Pincode:</label>
            <input
              type="number"
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
              <p className="helptext">{`Type 6 Digits Continioulsy Without Gap`}</p>
            )}

            {mybusinessname && (
              <div>
                <label htmlFor="productService">Product/Service:</label>
                <input
                  type="text"
                  id="productService"
                  name="productService"
                  value={myproduct}
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                  onClick={handleProduct}
                />
                {showProductText && (
                  <p className="helptext">{`Type Correct & Specific Name of Product/Service offered. Sepparate Each Keyword By Comma. For `}</p>
                )}
              </div>
            )}

            <label htmlFor="landline">Landline No:</label>
            <input
              type="number"
              id="landline"
              name="landline"
              value={mylandLine}
              onClick={handleLandLine}
              onChange={(e) => {
                setLandLine(e.target.value);
              }}
            />
            {showLandlineText && (
              <p className="helptext">{`Type Only Landline, if Available. Don't Type Mobile Number here.`}</p>
            )}

            <label htmlFor="stdCode">STD Code:</label>
            <input
              type="number"
              id="stdCode"
              name="stdCode"
              value={myLcode}
              onClick={handleStdCode}
              onChange={(e) => {
                setLcode(e.target.value);
              }}
            />
            {showStdText && (
              <p className="helptext">{`Type Only Landline, if Available. Don't Type Mobile Number here.`}</p>
            )}

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={myemail}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onClick={handleEmail}
            />
            {showEmailText && (
              <p className="helptext">{`Type Correctly, Only If Available`}</p>
            )}

            <label htmlFor="promoCode">Promo Code:</label>
            <input
              type="text"
              id="promoCode"
              name="promoCode"
              value={mypromoCode}
              onClick={handlePromoCode}
              onChange={(e) => {
                setPromoCode(e.target.value);
              }}
            />
            {showPromoText && (
              <p className="helptext">{`Mobile Number of Person, Who Refered you Here. Leave Blank if Not Refer`}</p>
            )}
          </form>
        </div>
        <div className="submit-Button">
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={insertRecord}
          >
            Submit
          </button>
        </div>
        <div className="login-container">
          <p>
            If You have already registered, Please{" "}
            <button
              type="button"
              className="signupButton"
              onClick={() => {
                navigate("/login");
              }}
            >
              <strong>Login</strong>
            </button>
          </p>
        </div>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>You are successfully registered in the portal -</p>
              <h4>
                <strong>Signpost PHONE BOOK</strong>
              </h4>
              <p>Your access Credintials are :</p>
              <p>
                User Name : <strong>{mymobileno},</strong>{" "}
              </p>
              <p>
                Password : <strong>Signpost</strong>{" "}
              </p>

              <button onClick={handlePopup}>OK</button>
            </div>
          </div>
        )}
        {/* Popup Modal */}
        {showPopup1 && (
          <div style={popupStyles.overlay}>
            <div style={popupStyles.modal}>
              <h3>Mobile Number Already Registered</h3>
              <div>
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
              <button
                onClick={handleClosePopup1}
                style={popupStyles.closeButton}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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

export default Signup;
