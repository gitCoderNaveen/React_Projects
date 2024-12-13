import React, { useState } from "react";
import { useAuth } from "./Auth";
import "../Css/UserProfile.css";

const UserProfile = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");
  const { userData } = useAuth();

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
          <h2>{userData.businessname}</h2>
          <p>{userData.product}</p>
          <div className="card-stats">
            <div>
              <h3>342</h3>
              <p>Counts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
