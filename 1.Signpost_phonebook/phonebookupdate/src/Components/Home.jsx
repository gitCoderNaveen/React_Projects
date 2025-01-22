import React, { useEffect, useState } from "react";
import "../Css/Home.css"; // Import CSS for styling
import Card from "./Cards";
import axios from "axios";
import Carousel from "./Carousel";

export default function Home() {
  const [data, setData] = useState([]);
  const [firmName, setFirmName] = useState("");
  const [priorityClients, setPriorityClients] = useState([]);
  const [productName, setProductName] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse.sort((a, b) => a.id - b.id));
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Failed to load data: " + error.message);
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/subscription_for_new_databse.php",
        {
          dateTime: new Date().toISOString(), // Current date and time
        }
      );

      if (response.data.success) {
        alert("Subscription successful!");
      } else {
        alert("Subscription failed: " + response.data.message);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchFirmData = async (name) => {
    if (!name) return;
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_byname_and_byperson.php?searchname=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        const priorityData = jsonResponse.filter(
          (item) => Number(item.priority) === 1
        );
        const nonPriorityData = jsonResponse.filter(
          (item) => Number(item.priority) !== 1
        );
        setPriorityClients(priorityData);
        setData([...priorityData, ...nonPriorityData]);
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load firm data: " + error.message);
    }
  };

  useEffect(() => {
    if (firmName) fetchFirmData(firmName);
    else fetchData();
  }, [firmName]);

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const maskMobileNumber = (mobileNumber) =>
    mobileNumber && mobileNumber.length > 5
      ? mobileNumber.slice(0, -5) + "xxxxx"
      : mobileNumber;

  return (
    <div>
      
      <div className="search-container">
        <label>Firm/Person: </label>
        <input
          type="text"
          placeholder="Search by Firms/Persons..."
          className="search-box"
          onChange={(e) => setFirmName(e.target.value)}
          onSelect={() => setProductName("")}
          value={firmName}
        />
        <label>Product: </label>
        <input
          type="text"
          placeholder="Search By Products..."
          className="search-box"
          onChange={(e) => setProductName(e.target.value)}
          onSelect={() => setFirmName("")}
          value={productName}
        />
      </div>
      <div onClick={handleSubscribe}>
        <button className="btn btn-primary">Subscribe</button>
      </div>

      <div className="contactcard-div">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              className={`card-container ${
                Number(item.priority) === 1 ? "card" : ""
              }`}
              key={item.id}
            >
              {Number(item.priority) === 1 ? (
                <div className="badge">Prime</div>
              ) : (
                ""
              )}
              <div className="card-left">
                <h3
                  className={`card-name ${
                    Number(item.priority) === 1 ? "card-headings" : ""
                  }`}
                >
                  {firmName &&
                  item.person.toLowerCase().includes(firmName.toLowerCase())
                    ? toTitleCase(item.person)
                    : toTitleCase(
                        item.businessname ? item.businessname : item.person
                      )}
                </h3>
                <p className="card-location">
                  {productName ? (
                    <>{item.product}</>
                  ) : (
                    <>
                      {item.city}, {item.pincode}
                    </>
                  )}
                </p>
              </div>
              <div className="card-right">
                <div className="phone-section">
                  <p className="phone-number">
                    {maskMobileNumber(item.mobileno)}
                  </p>
                </div>
                <div className="button-group">
                  <button
                    className="mybtn call-btn"
                    onClick={() => alert("Will update Soon")}
                  >
                    Call
                  </button>
                  <button
                    className="mybtn more-btn"
                    onClick={() => alert("Will update Soon")}
                  >
                    More
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="loading_text">
            <strong>Loading... Please Wait...</strong>
          </p>
        )}
      </div>
    </div>
  );
}
