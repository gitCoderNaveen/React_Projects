import React, { useState, useEffect } from "react";
import "../Css/Carousel.css"; // Optional for styling
import img1 from "../assets/images/img.jpeg";
import img2 from "../assets/images/img1.jpeg";
import img3 from "../assets/images/img2.jpeg";

const Carousel = () => {
  const images = [img1, img2, img3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="mycarouseldiv">
      <h2>Signpost PHONE BOOK</h2>
      <div className="d-flex justify-content-center align-items-cente">
        <div className="mycarousel">
          <div
            className="mycarousel-inner"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className="mycarousel-image"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
