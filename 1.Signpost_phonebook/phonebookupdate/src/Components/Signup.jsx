import React, { useEffect, useState } from "react";
import "../Css/Signup.css"; // Import the CSS file for styling

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
  const [showPersonName, setShowPersonName] = useState(false);
  const [showprefixtext, setShowPrefixText] = useState(false);
  const [showAddressText, setshowAddressText] = useState(false);
  const [showCityText, setshowCityText] = useState(false);
  const [showPincodeText, setshowPincodeText] = useState(false);
  const [showProductText, setshowProductText] = useState(false);
  const [showLandlineText, setshowLandlineText] = useState(false);
  const [showStdText, setshowStdText] = useState(false);
  const [showEmailText, setshowEmailText] = useState(false);
  const [showPromoText, setshowPromoText] = useState(false);
  const mypriority = "0";
  const dataTime = new Date().toString();
  const mydiscount = "10";
  const mydescription = "Update Soon";
  const cmpanyPrefix = "M/s.";

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

  console.log(typeof dateTime);
  console.log(dateTime);

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
  const handleCityName = (e) => {
    const cityName = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(cityName)) {
      setCity(cityName);
    }
  };

  const insertRecord = async (e) => {
    e.preventDefault();
    if (!myaddress || !mycity || !mypincode || !myprefix || !mymobileno) {
      alert("Please enter all required fields.");
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
        alert(jsonResponse.Message);
        resetForm();
        window.location.reload();
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
    <div className="form-container">
      <form className="form">
        <h1>Signup Form</h1>
        <div className="form-group">
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
            required
          />
          {showMobiletext && (
            <p className="helptext">{`Type 10 digits with get Country code (+91), without gap Don't Type Land Line`}</p>
          )}
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>

        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>
        {mybusinessname && (
          <div className="form-group">
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
        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <label htmlFor="promoCode">Promo Code:</label>
          <input
            type="number"
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
        </div>
        <button onClick={insertRecord} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
