import React, { useState } from "react";
import "../Css/MediaPartner.css";
const MediaPartner = () => {
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
  };

  const handleMobileno = (e) => {
    if (e.target.value.length <= 10) {
      setMobileno(e.target.value);
    } else {
      alert("Allowed 10 digits only");
    }
  };

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
      console.log("Check Mobile Response:", result);

      if (result.registered) {
        setIsRegistered(true);
        alert("This mobile number is already registered.");
        setMobileno("");
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      console.error("Error checking mobile:", error);
      alert("Unable to verify mobile number.");
    }
  };

  const insertRecord = async () => {
    if (!mymobileno.trim() || !mybusinessname.trim()) {
      alert("Enter details in required fields.");
      return;
    }
    if (isRegistered) {
      alert("Mobile number is already registered.");
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

    console.log("Sending Data:", Data);

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
      console.log("Server Response:", jsonResponse);

      if (jsonResponse.Message) {
        alert("Success: " + jsonResponse.Message);
        resetForm();
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="container">
        <h1 className="header-text">Media Partner</h1>
        <form className="form-container">
          <label>*Mobile Number :</label>
          <input
            type="number"
            placeholder="Mobile Number"
            value={mymobileno}
            onChange={handleMobileno}
            onBlur={() => checkMobileNumber(mymobileno)}
          />

          <label>*Name / Business Name :</label>
          <input
            type="text"
            placeholder="Name/Business Name"
            value={mybusinessname}
            onChange={(e) => setBusinessname(e.target.value)}
          />

          <label>*Prefix:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Mr."
                checked={myprefix === "Mr."}
                onChange={(e) => setPrefix(e.target.value)}
              />
              Mr.
            </label>
            <label>
              <input
                type="radio"
                value="Ms."
                checked={myprefix === "Ms."}
                onChange={(e) => setPrefix(e.target.value)}
              />
              Ms.
            </label>
            <label>
              <input
                type="radio"
                value="M/s."
                checked={myprefix === "M/s."}
                onChange={(e) => setPrefix(e.target.value)}
              />
              M/s. (for Firms)
            </label>
          </div>

          <label>*Address :</label>
          <textarea
            placeholder="Address"
            value={mydoorno}
            onChange={(e) => setDoorno(e.target.value)}
          ></textarea>

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
            maxLength={6}
            value={mypincode}
            onChange={(e) => setPincode(e.target.value)}
          />

          <label>*Product / Service :</label>
          <input
            type="text"
            placeholder="Product"
            value={myproduct}
            onChange={(e) => setProduct(e.target.value)}
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

          <button type="button" onClick={insertRecord}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MediaPartner;
