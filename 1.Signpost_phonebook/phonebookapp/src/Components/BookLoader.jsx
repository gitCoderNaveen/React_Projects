import React from "react";

const BookLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Ensure the container takes full viewport height
        margin: 0,
      }}
    >
      <img
        src="https://assets-v2.lottiefiles.com/a/23b9dca4-117d-11ee-a5f3-6f98f00fb870/rrTIf0XWuI.gif"
        alt="Loading animation"
        style={{
          maxWidth: "100%", // Ensure the image is responsive and fits within the container
          maxHeight: "100%", // Ensure the image doesn't exceed the viewport height
          objectFit: "contain", // Ensure the image maintains its aspect ratio
        }}
      />
    </div>
  );
};

export default BookLoader;
