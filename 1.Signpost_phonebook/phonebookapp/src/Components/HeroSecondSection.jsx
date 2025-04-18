import React from "react";
import MobileImage from "../assets/images/MoBile Image (1).png";
import MobileAboutImage from "../assets/images/Mobile-about_app.png";
import "../Css/HeroSecondSection.css"; // Import CSS file

const HeroSecondSection = () => {
  return (
    <div className="hero-second-section">
      <section className="mt-5 mt-md-7 px-3 px-md-5 py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start gap-md-5 px-md-5 py-3 py-md-4">
          {/* Left side */}
          <div className="position-relative mobile-image-container">
            {/* Background Circle */}
            <div className="background-circle"></div>

            {/* Images with Bounce Animation */}
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
          </div>

          {/* Right side */}
          <div className="text-center text-md-start max-width-text">
            <p className="section-title">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSecondSection;
