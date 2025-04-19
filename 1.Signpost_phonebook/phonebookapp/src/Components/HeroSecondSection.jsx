import React, { useRef, useEffect } from "react";
import MobileImage from "../assets/images/MoBile Image (1).png";
import MobileAboutImage from "../assets/images/Mobile-about_app.png";
import "../Css/HeroSecondSection.css"; // Import CSS file
import { motion, useInView, useAnimation } from "framer-motion";

const HeroSecondSection = () => {
  const leftRef = useRef(null);
  const isLeftInView = useInView(leftRef, { once: true });
  const leftControls = useAnimation();

  const rightRef = useRef(null);
  const isRightInView = useInView(rightRef, { once: true });
  const rightControls = useAnimation();

  useEffect(() => {
    if (isLeftInView) {
      leftControls.start("visible");
    }
  }, [isLeftInView, leftControls]);

  useEffect(() => {
    if (isRightInView) {
      rightControls.start("visible");
    }
  }, [isRightInView, rightControls]);

  const slideInLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  const slideInRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <div className="hero-second-section container g-5">
      <section className="mt-5 mt-md-7 px-3 px-md-5 py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start gap-md-5 px-md-5 py-3 py-md-4">
          {/* Left side */}
          <motion.div
            ref={leftRef}
            className="position-relative mobile-image-container"
            variants={slideInLeftVariants}
            initial="hidden"
            animate={leftControls}
          >
            {/* Background Circle */}
            <div className="background-circle"></div>

            {/* Images with Bounce Animation (You might want to animate these separately if needed) */}
            <img
              src={MobileAboutImage}
              alt="Mobile About"
              className="mobile-about-image"
              loading="lazy"
            />
            <img
              src={MobileImage}
              alt="Mobile"
              className="mobile-image"
              loading="lazy"
            />
          </motion.div>

          {/* Right side */}
          <motion.div
            ref={rightRef}
            className="text-center text-md-start max-width-text"
            variants={slideInRightVariants}
            initial="hidden"
            animate={rightControls}
          >
            <p className="section-title mt-5">
              Ready to Supercharge Your Business?{" "}
              <span className="orange-text">Find Mobile Numbers Easily</span>
            </p>
            <p className="section-description">
              Signpost PHONE BOOK extends your phone’s contacts directory to
              millions of firms, professionals, and individuals in your city and
              across India. Whether it's businesses, government departments,
              schools, or individuals, you’ll find what you need in seconds.
            </p>
            <p className="promotion-title">Nearby Promotion</p>
            <p className="section-description">
              Target prospects in a specific area, by user type (Business, Male,
              Female, All) and location (Pincode). Ideal for B2C and D2C
              businesses.
            </p>

            <div className="d-flex justify-content-center justify-content-md-start gap-4 mb-3">
              <div className="stats-column">
                <p className="stats-item">
                  <span className="orange-text">17M+</span> downloads
                </p>
                <p className="stats-item">
                  <span className="orange-text">2300+</span> Reviews
                </p>
              </div>
              <div className="stats-column">
                <p className="stats-item">
                  <span className="orange-text">8M+</span> Followers
                </p>
                <p className="stats-item">
                  <span className="orange-text">150+</span> Countries
                </p>
              </div>
            </div>

            <button className="start-trial-button">START FREE TRIAL</button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSecondSection;
