import React from "react";

const MarqueeWithLink = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        Download our app now!&nbsp;
        <a
          href="https://drive.google.com/file/d/1dpGimka416_8_14tmyEA5GJTjLcW0LsJ/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click here to download
        </a>
      </div>
    </div>
  );
};

export default MarqueeWithLink;
