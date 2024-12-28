import React, { useState } from "react";
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
  const mypriority = "0";
  const myfieldOne = "Column";
  const myfieldTwo = "Column";
  const mydiscount = "10";
  const mydescription = "Update Soon";
  const cmpanyPrefix = "M/s.";

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

  const insertRecord = async (e) => {
    e.preventDefault();
    if (
      !mybusinessname ||
      !myaddress ||
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
      fieldone: myfieldOne,
      fieldtwo: myfieldTwo,
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
        </div>
        <div className="form-group">
          <label htmlFor="name">Firm/Business Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={mybusinessname}
            onChange={(e) => {
              setBusinessname(e.target.value);
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Person Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={myperson}
            onChange={(e) => {
              setPerson(e.target.value);
            }}
            required
          />
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
                checked={myprefix === "Ms."}
                onChange={(e) => {
                  setPrefix(e.target.value);
                }}
              />
              Ms.
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={myaddress}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={mycity}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            required
          />
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
            maxLength={6}
            onInput={(e) => {
              if (e.target.value.length > 6)
                e.target.value = e.target.value.slice(0, 6);
            }}
            required
          />
        </div>
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="landline">Landline No:</label>
          <input
            type="text"
            id="landline"
            name="landline"
            value={mylandLine}
            onChange={(e) => {
              setLandLine(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stdCode">STD Code:</label>
          <input
            type="text"
            id="stdCode"
            name="stdCode"
            value={myLcode}
            onChange={(e) => {
              setLcode(e.target.value);
            }}
          />
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
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="promoCode">Promo Code:</label>
          <input
            type="number"
            id="promoCode"
            name="promoCode"
            value={mypromoCode}
            onChange={(e) => {
              setPromoCode(e.target.value);
            }}
          />
        </div>
        <button onClick={insertRecord} className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
