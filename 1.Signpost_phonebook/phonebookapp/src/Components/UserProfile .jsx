import React, { useState } from "react";

const UserProfile = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");

  // Handle image upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div
      style={{
        maxWidth: "300px",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>Profile Tile</h2>
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f0f0f0",
          borderRadius: "10px",
          overflow: "hidden",
          marginBottom: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#888" }}>No Image Uploaded</span>
        )}
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "block", margin: "10px auto" }}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={handleNameChange}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>
      {name && (
        <div
          style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ margin: 0 }}>{name}</h3>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
