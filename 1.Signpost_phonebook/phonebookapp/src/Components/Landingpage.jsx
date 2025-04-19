import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Css/Landingpage.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaDownload,
  FaUserFriends,
  FaStar,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import carousel1 from "../assets/images/carosel.jpg";
import carousel from "../assets/images/carousel.jpg";
import carousel2 from "../assets/images/carouselthree.jpg";
import Company2 from "../assets/images/Company2.jpg";
import Company3 from "../assets/images/Company3.png";
import Company4 from "../assets/images/Company4.png";
import Company5 from "../assets/images/Company5.png";
import Company6 from "../assets/images/Company6.png";
import Company7 from "../assets/images/Company7.png";
import Company8 from "../assets/images/Company8.png";
import market1 from "../assets/images/1.png";
import market2 from "../assets/images/2.png";
import market3 from "../assets/images/3.png";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Accordian from "./Accordian";
import HeroSecondSection from "./HeroSecondSection";
import FeaturesContent from "./FeaturesContent";
import FeaturesCard from "./FeaturesCard";

const Landingpage = () => {
  const el = useRef(null); // Reference to the typing element
  const typed = useRef(null); // Typed instance
  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [isfadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const fadeInnew = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const handleHomepage = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  useEffect(() => {
    AOS.init({ once: true });
    setTimeout(() => setFadeIn(true), 500);
  }, []);

  const companies = [
    Company2,
    Company3,
    Company4,
    Company5,
    Company6,
    Company7,
    Company8,
  ];

  const maskMobileNumber = (mobileNumber) =>
    mobileNumber && mobileNumber.length > 5
      ? mobileNumber.slice(0, -5) + "xxxxx"
      : mobileNumber;

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  useEffect(() => {
    const options = {
      strings: ["Firms / Business", "Persons", "Products", "Brands"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
      smartBackspace: true,
      // Bind Typed.js to update the placeholder instead of innerText
      attr: "placeholder",
    };

    // Initialize Typed.js
    typed.current = new Typed(el.current, options);

    return () => {
      // Destroy Typed instance during cleanup to prevent memory leaks
      typed.current.destroy();
    };
  }, []);

  const fetchFirmData = async (name) => {
    if (!name) {
      return;
    }
    try {
      const response = await fetch(
        `https://signpostphonebook.in/client_fetch_byname.php?businessname=${name}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse);
      } else {
        window.alert("Unexpected response from server.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      window.alert("Failed to load firm data: " + error.message);
    }
  };

  useEffect(() => {
    if (searchTerm) fetchFirmData(searchTerm);
    else setSearchTerm("");
  }, [searchTerm]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="landing-page">
        {/* Left Section */}
        <div className="left-section" ref={inputRef}>
          <motion.h1
            className="heading"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <label htmlFor="text" className="blue">
              Search Here...
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="inputbox"
              name=""
              id=""
              ref={el}
            />

            <span className="fs-3 fw-bolder text-warning">
              Promote Your Business
            </span>
          </motion.h1>
          <motion.p
            className="subheading"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            Discover your customers near by you, Attract them with your offers &
            Discounts.
          </motion.p>
        </div>

        {/* Right Section */}
        <div className="right-section rubberBand">
          <motion.div
            className="mobile-frame"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            {searchTerm ? (
              <div>
                <span>
                  Scroll Right <FaArrowRight />
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="mobile-screen">
              {searchTerm ? (
                <div className="landingcontactcard-div">
                  {data.length > 0 ? (
                    data.map((item) => (
                      <div className="Landing_page_card" key={item.id}>
                        <div className="on_left">
                          <h3>
                            <strong>{toTitleCase(item.businessname)}</strong>
                          </h3>
                          <p>{item.city}</p>
                        </div>
                        <div className="on_right">
                          <p>{maskMobileNumber(item.mobileno)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              ) : (
                <div className="mobile-screen">
                  <Swiper
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 2000 }} // Set timeout for 2000ms
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    className="swiper-container"
                  >
                    <SwiperSlide>
                      <motion.img
                        src={carousel1}
                        alt="Slide 1"
                        className="slide-image"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <motion.img
                        src={carousel}
                        alt="Slide 2"
                        className="slide-image"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <motion.img
                        src={carousel2}
                        alt="Slide 3"
                        className="slide-image"
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                      />
                    </SwiperSlide>
                  </Swiper>
                </div>
              )}
            </div>
            <button
              href="/home"
              className="Home_direct"
              onClick={handleHomepage}
            >
              Click Here To view More
            </button>
          </motion.div>
          <div>
            <ScrollToTop />
          </div>
        </div>
      </div>

      {/* trusted partners */}
      <div className="py-5 py-md-7 bg-light">
        <div className="container py-4">
          <h2 className="text-center fs-3 fw-semibold text-dark">
            Trusted by{" "}
            <span className="fs-3" style={{ color: "#EA580C" }}>
              150+
            </span>{" "}
            Companies
          </h2>
          <div className="trusted-partners-container overflow-hidden mt-4">
            <div className="trusted-partners-images d-flex">
              {[
                Company2,
                Company3,
                Company4,
                Company5,
                Company6,
                Company7,
                Company2,
                Company3,
                Company4,
                Company5,
                Company6,
                Company7,
              ].map((Company, index) => (
                <img
                  key={index}
                  src={Company}
                  width={158}
                  height={48}
                  className="max-h-12 object-contain me-4"
                  loading="lazy"
                  alt={`Company ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* features card */}
      <div>
        <FeaturesCard />
      </div>
      {/* features content */}
      <div>
        <FeaturesContent />
      </div>
      <div>
        <HeroSecondSection />
      </div>
      {/* accordian */}
      <div>
        <Accordian />
      </div>
      {/* ================== Footer page ================= */}
      <div className="bottom_footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>© Copyrights 2025. All rights reserved.</p>
            </div>
            <div className="col-md-6">
              <p className="developer_text">
                Design & developed by{" "}
                <a
                  href="https://signpostphonebook.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <strong>signpostphonebook</strong>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landingpage;
