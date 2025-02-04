import React, { useEffect, useState } from "react";
import "../Css/Subscription.css"; // Import the CSS file
import { useAuth } from "./Auth";
import { json, useNavigate } from "react-router-dom";

const Subscription = () => {
  const [dateTime, setDateTime] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [myname, setName] = useState("");
  const [mysubscriptionPlan, setSubscriptionPlan] = useState("");
  const [mysubscriptionValue, setSubscriptionValue] = useState("");
  const [orderedNo, setOrderedNo] = useState("");
  const [orderedDate, setOrderedDate] = useState("");
  const { userData } = useAuth();
  const navigate = useNavigate();
  const adminNo = 9843657564;
  const phoneNumbers = [mobileNo, adminNo];

  const togglePopup = () => {
    navigate("/");
  };

  useEffect(() => {
    updateDateTime();
  }, []);

  const updateDateTime = () => {
    const now = new Date();

    // Format date
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = now.toLocaleDateString(undefined, options);

    //Format time
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; //convert to 12-hour format
    const formattedTime = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }${ampm}`;

    //Combine date and time
    setDateTime(`${formattedDate} ${formattedTime}`);
  };
  const resetForm = () => {
    setName("");
    setMobileNo("");
    setSubscriptionPlan("");
    setSubscriptionValue("");
    setOrderedNo("");
    setOrderedDate("");
  };

  const handleSubcription = (e) => {
    setSubscriptionPlan(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mobileNo || !myname) {
      alert("Enter Subscriber Name & Number");
    }
    const data = {
      mobileno: mobileNo,
      name: myname,
      subscriptionplan: mysubscriptionPlan,
      date: dateTime,
      subscriptionvalue: mysubscriptionValue,
      username: userData.businessname || userData.person,
      orderno: orderedNo,
      orderdate: orderedDate,
    };
    try {
      const response = await fetch(
        "https://signpostphonebook.in/subscription_for_new_database.php",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonResponse = await response.json();
      if (jsonResponse.message) {
        alert(jsonResponse.message);

        const smsBody = encodeURIComponent(
          `Dear ${myname}, \n We Acknowledge your order for Subscription for Signpost PHONE BOOK for ${mysubscriptionPlan},of Value Rs.${mysubscriptionValue}. \n Refer Ordered Number : ${orderedNo} \n Dated : ${orderedDate} \n .Your subscription will start from tomorrow. You can avail our NEARBY PROMOTION and CATEGORYWISE PROMOTION Facilities. \n For any help Contact \n Signpost Celfon Team`
        );

        const smsLink = `sms:${phoneNumbers.join(",")}?body=${smsBody}`;

        setTimeout(() => {
          window.location.href = smsLink;
        }, 2000);
        resetForm();
      } else {
        alert(`Failed to save Data : ${jsonResponse.message}`);
      }
    } catch (error) {
      alert("Error Saving Data");
      console.log(error);
    }
  };

  return (
    <div className="scontainer">
      <div className="spopup-overlay">
        <div className="spopup">
          <button onClick={togglePopup} className="sclose-button">
            ✖
          </button>
          <h2 className="spopup-title">Subscription Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="sform-group">
              <label htmlFor="number">Subscribers Mobile Number</label>
              <input
                type="number"
                id="number"
                placeholder="Enter Subscribers Mobile Number"
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
                onInput={(e) => {
                  if (e.target.value.length > 10)
                    e.target.value = e.target.value.slice(0, 10);
                }}
                required
              />
            </div>
            <div className="sform-group">
              <label htmlFor="name">Subscribers Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter Subscribers Name name"
                value={myname}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
              />
            </div>
            <div className="sform-group">
              <label htmlFor="subscription">Subscription Plan</label>
              <select
                name=""
                id="dropdown"
                value={mysubscriptionPlan}
                onChange={handleSubcription}
              >
                <option value="">Select your Plan</option>
                <option value="one year">One Year Pack</option>
                <option value="3 months">3 Months Pack</option>
                <option value="1 month">One Month Pack</option>
                <option value="1 week">One Week (Trial Pack)</option>
              </select>
            </div>
            <div className="sform-group">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Enter Pack Value in Rs."
                value={mysubscriptionValue}
                required
                onChange={(e) => setSubscriptionValue(e.target.value)}
              />
            </div>
            <div className="sform-group">
              <label htmlFor="value">Order No :</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Enter Order No."
                value={orderedNo}
                required
                onChange={(e) => setOrderedNo(e.target.value)}
              />
            </div>
            <div className="sform-group">
              <label htmlFor="value">Order Date : </label>
              <input
                type="date"
                name=""
                id=""
                placeholder=""
                value={orderedDate}
                required
                onChange={(e) => setOrderedDate(e.target.value)}
              />
            </div>
            <button type="submit" className="ssubmit-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
