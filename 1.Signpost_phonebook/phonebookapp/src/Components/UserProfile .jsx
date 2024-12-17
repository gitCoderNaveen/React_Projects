import React, { useEffect, useState } from "react";
import { useAuth } from "./Auth";
import "../Css/UserProfile.css";

const UserProfile = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const { userData } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://signpostphonebook.in/data_entry_details.php?id=${userData.id}`
      );
      const result = await response.json();

      if (result.status === "success") {
        // Assuming the data is an array and has an "updated_at" field
        const sortedData = result.data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        // Fetch only the last updated record
        const lastUpdatedRecord = sortedData[0];
        setData(lastUpdatedRecord);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Error fetching details. Please try again.", err);
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
      <div className="card">
        <div className="card-image">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="card-content">
          <h2>{data.name}</h2>
          <p></p>
          <div className="card-stats">
            <div>
              <h3>{data.count}</h3>
              <p>Counts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
