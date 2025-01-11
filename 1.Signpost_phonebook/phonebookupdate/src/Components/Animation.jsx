import React, { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import "../Css/Animation.css";
import Slider from "react-slick";
import image from "../assets/images/img.jpeg";
import image1 from "../assets/images/img1.jpeg";
import image2 from "../assets/images/img2.jpeg";
import Navigationpage from "./Navigationpage";

const Animations = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const images = [image, image1, image2];

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Display only one slide at a time
    slidesToScroll: 1,
    centerMode: true, // Enable center mode
    centerPadding: "0px", // Remove padding around the center image
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: true,
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const textAnimation = useSpring({
    position: "fixed",
    top: isScrolled ? "0px" : "10%",
    left: isScrolled ? "15%" : "50%",
    transform: isScrolled ? "translate(-50%, 0)" : "translate(-50%, -50%)",
    fontSize: isScrolled ? "2rem" : "3rem",
    config: { duration: 500 },
  });
  const sliderAnimation = useSpring({
    top: isScrolled ? "0" : "70%",
    opacity: isScrolled ? 0 : 1,
    transform: isScrolled ? "translateY(-20px)" : "translateY(0)",
    config: { duration: 500 },
  });

  return (
    <div>
      <div
        className={`home-container ${isScrolled ? "scrolled" : ""}`}
        style={{
          position: isScrolled ? "fixed" : "relative",
          width: "100%",
          height: isScrolled ? "fit-content" : "100vh",
          top: isScrolled ? 0 : "auto",
          zIndex: 10,
          backgroundColor: "white",
        }}
      >
        <div>
          <animated.div style={textAnimation} className="title">
            Signpost Phone Book
          </animated.div>
        </div>
        <Navigationpage />
        {isScrolled && (
          <div className="formField">
            <form action="" className="searchForm">
              <label htmlFor="">Firm/Person Name :</label>
              <input type="text" />
              <label htmlFor="">Product Name :</label>
              <input type="text" />
            </form>
          </div>
        )}

        {isScrolled ? (
          <div></div>
        ) : (
          <div className="carousel-container">
            <animated.div
              style={sliderAnimation}
              className="animationContainer"
            >
              <Slider {...settings}>
                {images.map((src, index) => (
                  <div key={index} className="carousel-slide">
                    <img src={src} alt={`Slide ${index}`} />
                  </div>
                ))}
              </Slider>
            </animated.div>
          </div>
        )}
      </div>

      <div className="about-container">
        <h2>About Us</h2>
        <p>
          Welcome to the Signpost Phone Book! Here, you can find contact
          information and connect with businesses easily. Scroll down to explore
          more!
        </p>
      </div>
    </div>
  );
};

export default Animations;
