import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import "../Css/UserProfile.css";

const UserProfile = () => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState("");
  const { userData } = useAuth();
  const date = new Date().toISOString().split("T")[0];

  console.log(userData.id);
  const fetchData = async () => {
    try {
      if (!userData?.id || !date) {
        setError("Please provide a valid ID and Date.");
        return;
      }

      const response = await fetch(
        `https://signpostphonebook.in/data_entry_details.php?userid=${userData.id}&date=${date}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        setDetails(data.data);
        setError(""); // Clear any previous errors
      } else {
        setError(data.message || "Failed to fetch details.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
    }
  };
  useEffect(() => {
    fetchData();
  });
  // const handleProfilePictureUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePicture(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <div className="profile_Card_main">
      <div className="Profile_card ">
        {/* <div className="card-image">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-img"
          />
        </div> */}
        <div className="card-content">
          <div className="name_card">
            <h2>Profile Name :&nbsp;{details.name}</h2>
          </div>
          <div className="card-stats">
            <div className="name_card">
              <h2>Counts :&nbsp;{details.count}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
