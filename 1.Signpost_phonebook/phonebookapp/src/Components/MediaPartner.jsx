// import React, { useEffect, useState } from "react";
// import "../Css/MediaPartner.css";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "./Auth";
// import axios from "axios";

// const MediaPartner = () => {
//   const [showPopup, setShowPopup] = useState(false);
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
//   const [regName, setRegName] = useState("");
//   const [showPopup1, setShowPopup1] = useState(false);
//   const [regPrefix, setRegPrefix] = useState("");
//   const { userData } = useAuth();
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   const userName = userData?.businessname || "";
//   const userId = userData?.id || "";

//   const navigate = useNavigate();

//   const resetForm = () => {
//     setBusinessname("");
//     setDoorno("");
//     setCity("");
//     setPincode("");
//     setProduct("");
//     setLandLine("");
//     setLcode("");
//     setEmail("");
//     setPrefix("");
//     setMobileno("");
//     setIsRegistered(false);
//     setErrors({});
//   };

//   useEffect(() => {
//     setShowPopup(true);
//   }, []);

//   const checkMobileNumber = async (mobile) => {
//     if (!mobile) return;

//     try {
//       const response = await fetch(
//         `https://signpostphonebook.in/client_insert.php`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ mobileno: mobile }),
//         }
//       );
//       const result = await response.json();
//       if (result.registered) {
//         setIsRegistered(true);
//         setRegName(result.businessname);
//         setRegPrefix(result.prefix);
//         setShowPopup(false);
//         setShowPopup1(true);
//         setMobileno("");
//       } else {
//         setIsRegistered(false);
//       }
//     } catch (error) {
//       alert("Unable to verify mobile number.");
//     }
//   };
//   const handleMobileno = (e) => {
//     const mobile = e.target.value;
//     if (mobile.length <= 10) {
//       setMobileno(mobile);
//     } else {
//       alert("Allowed 10 digits only");
//     }
//   };

//   const insertbusinessName = async () => {
//     const dataName = {
//       name: userName,
//       date: new Date().toISOString().split("T")[0],
//       dataentry_name: mybusinessname,
//     };

//     try {
//       const response = await axios.post(
//         "https://signpostphonebook.in/dataentry_name_details.php",
//         dataName,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.data.success) {
//         console.log("Success", response.message);
//       } else {
//         console.log(response.message);
//       }
//     } catch (error) {
//       console.log("unable to reach server", error);
//     }
//   };

//   const insertCount = async () => {
//     const dataEntry = {
//       name: userName,
//       id: userId,
//       date: new Date().toISOString().split("T")[0],
//       count: 1, // Default count is 1 if mycount is not set
//     };

//     try {
//       const response = await axios.post(
//         "https://signpostphonebook.in/data_enty_insert.php",
//         dataEntry,
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const responseData = response.data;

//       // Handle response
//       if (responseData.success) {
//         setMessage(
//           `Success: ${responseData.message}, New Count: ${responseData.newCount}`
//         );
//         console.log(message);
//       } else {
//         setMessage(`Error: ${responseData.message}`);
//         console.log(message);
//       }
//     } catch (error) {
//       setMessage(`Error: Unable to reach the server. ${error.message}`);
//       console.log(message);
//     }
//   };
//   const insertRecord = async (e) => {
//     e.preventDefault();

//     if (
//       !mymobileno.trim() ||
//       !mybusinessname.trim() ||
//       !myprefix ||
//       !myproduct.trim()
//     ) {
//       alert("Enter details in required fields.");
//       return;
//     }

//     if (isRegistered) {
//       alert("Mobile number is already registered.");
//       return;
//     }

//     const data = {
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
//       promocode: "MediaPartner",
//     };

//     try {
//       const response = await fetch(
//         "https://signpostphonebook.in/client_insert.php",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );
//       const jsonResponse = await response.json();
//       if (jsonResponse.Message) {
//         alert("Success: " + jsonResponse.Message);
//         await insertCount(), insertbusinessName();
//         resetForm();
//       } else {
//         alert("Unexpected response from server.");
//       }
//     } catch (error) {
//       alert("Error: " + error.message);
//     }
//   };
//   const handleClosePopup1 = () => {
//     setShowPopup1(false);
//     setShowPopup(true);
//   };

//   return (
//     <div>
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-card animate-slide-in">
//             <h1 className="header-text">Media Partner</h1>
//             <form className="form-container">
//               <label>*Mobile Number :</label>
//               <input
//                 type="number"
//                 placeholder="Mobile Number"
//                 value={mymobileno}
//                 maxLength={10}
//                 onChange={handleMobileno}
//                 onBlur={() => checkMobileNumber(mymobileno)}
//                 required
//               />

//               <label>*Name / Business Name :</label>
//               <input
//                 type="text"
//                 placeholder="Name/Business Name"
//                 value={mybusinessname}
//                 onChange={(e) => setBusinessname(e.target.value)}
//                 required
//               />

//               <label>*Prefix:</label>
//               <div className="radio-group">
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       value="Mr."
//                       checked={myprefix === "Mr."}
//                       onChange={(e) => setPrefix(e.target.value)}
//                     />
//                     Mr.
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       value="Ms."
//                       checked={myprefix === "Ms."}
//                       onChange={(e) => setPrefix(e.target.value)}
//                     />
//                     &nbsp;Ms.
//                   </label>
//                 </div>
//                 <div>
//                   <label>
//                     <input
//                       type="radio"
//                       value="M/s."
//                       checked={myprefix === "M/s."}
//                       onChange={(e) => setPrefix(e.target.value)}
//                     />
//                     &nbsp;Firm/Business
//                   </label>
//                 </div>
//               </div>

//               <label>*Address :</label>
//               <textarea
//                 placeholder="Address"
//                 rows="4"
//                 value={mydoorno}
//                 onChange={(e) => setDoorno(e.target.value)}
//               />

//               <label>*City :</label>
//               <input
//                 type="text"
//                 placeholder="City"
//                 value={mycity}
//                 onChange={(e) => setCity(e.target.value)}
//               />

//               <label>*Pincode :</label>
//               <input
//                 type="number"
//                 placeholder="Pincode"
//                 value={mypincode}
//                 onChange={(e) => setPincode(e.target.value)}
//               />

//               <label>*Product / Service :</label>
//               <input
//                 type="text"
//                 placeholder="Product"
//                 value={myproduct}
//                 onChange={(e) => setProduct(e.target.value)}
//                 required
//               />

//               <label>Landline Number :</label>
//               <input
//                 type="number"
//                 placeholder="Landline Number"
//                 value={mylandLine}
//                 onChange={(e) => setLandLine(e.target.value)}
//               />

//               <label>STD Code :</label>
//               <input
//                 type="number"
//                 placeholder="STD Code"
//                 value={myLcode}
//                 onChange={(e) => setLcode(e.target.value)}
//               />

//               <label>Email :</label>
//               <input
//                 type="email"
//                 placeholder="example@mail.com"
//                 value={myemail}
//                 onChange={(e) => setEmail(e.target.value)}
//               />

//               <div className="submitButton">
//                 <button
//                   type="button"
//                   className="close-popup-btn"
//                   onClick={() => {
//                     setShowPopup(false);
//                     navigate("/");
//                   }}
//                 >
//                   X
//                 </button>
//               </div>
//             </form>
//             <button className="open-popup-btn m-2" onClick={insertRecord}>
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//       {/* Popup Modal */}
//       {showPopup1 && (
//         <div style={popupStyles.overlay}>
//           <div style={popupStyles.modal}>
//             <h3>Mobile Number Already Registered</h3>
//             <p>
//               <strong>In the Name of:</strong> {regPrefix}
//               {regName}
//             </p>
//             <button onClick={handleClosePopup1} style={popupStyles.closeButton}>
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
// // Popup styles
// const popupStyles = {
//   error: {
//     color: "#EC2D01",
//   },
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000,
//   },
//   modal: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//     maxWidth: "400px",
//     width: "80%",
//   },
//   closeButton: {
//     marginTop: "20px",
//     padding: "10px 20px",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default MediaPartner;

// =============================== Updated Page ==================================
import React, { useEffect, useState } from "react";
import "../Css/Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "./Auth";

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
  const mydiscount = "10";
  const mydescription = "Update Soon";
  const cmpanyPrefix = "M/s.";
  const navigate = useNavigate();
  const smsBody = encodeURIComponent(
    `Dear sir, \n Signpost PHONE BOOK,  is a portal for  Mobile Number Finder and & Dialerwith Digital Marketing. Please kindly view and verify the correctness of details on your firm, at the earliest. \n URL :- www.signpostphonebook.in \n User name :-  your mobile number \n Password  :- Signpost \n You can use the PHONE BOOK for your business promotion in any desired (Pincode) area so Entire Coimbatore`
  );

  const { userData } = useAuth();

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
    const smsBody = encodeURIComponent(
      `Dear sir,  
Signpost PHONE BOOK,  is a portal for  Mobile Number Finder and & Dialer with Digital Marketing. Please kindly view and verify the correctness of details on your firm, at the earliest.

URL :- www.signpostphonebook.in
User name :-  Your mobile number 
Password  :- Signpost

You can use the PHONE BOOK for your business promotion in any desired (Pincode) area so Entire Coimbatore`
    );
    const smsLink = `sms:${mymobileno}?body=${smsBody}`;

    setTimeout(() => {
      window.location.href = smsLink;
    }, 2000);
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

      // Handle response
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
    <div className="signup-container">
      <div className="signup-content">
        <button className="close-button" onClick={() => navigate("/home")}>
          &times;{" "}
        </button>
        <h2 className="header-text">Media Partner</h2>
        <div className="form-container">
          <form className="scrollable-form">
            <label htmlFor="mobile">Mobile Number:*</label>
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

            <label htmlFor="address">Address*:</label>
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

            <label htmlFor="city">City:*</label>
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
                <label htmlFor="productService">Product/Service:*</label>
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
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <div>
                <p>Registered successfully.</p>
                <button onClick={handlePopup}>OK</button>
              </div>
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

export default MediaPartner;
