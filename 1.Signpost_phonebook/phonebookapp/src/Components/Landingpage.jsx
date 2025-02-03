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
import company1 from "../assets/images/Company1.png";
import company2 from "../assets/images/Company2.jpg";
import company3 from "../assets/images/Company3.png";
import company4 from "../assets/images/Company4.png";
import company5 from "../assets/images/Company5.png";
import company6 from "../assets/images/Company6.png";
import company7 from "../assets/images/Company7.png";
import company8 from "../assets/images/Company8.png";
import market1 from "../assets/images/1.png";
import market2 from "../assets/images/2.png";
import market3 from "../assets/images/3.png";
import Typed from "typed.js";
import { useNavigate } from "react-router-dom";

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
    company1,
    company2,
    company3,
    company4,
    company5,
    company6,
    company7,
    company8,
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
            {/* <span className="typing" ref={el}></span> */}
            <span className="blue">Promote</span>{" "}
            <span className="blue">Your</span>{" "}
            <span className="blue">Business</span>
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
        <div className="right-section">
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
        </div>
      </div>

      <section className="row_am trusted_section">
        <div className="container-fluid">
          <div
            className="section_title"
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="100"
          >
            <h2>
              Trusted by <span>1500+</span> companies
            </h2>
          </div>

          <div className="company_logos">
            <Slider {...settings}>
              {companies.map((company, index) => (
                <div className="item" key={index}>
                  <div className="logo">
                    <img src={company} alt={`Company ${index + 1}`} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <div className="page-container">
        {/* Left Feature Cards */}
        {/* <div className="feature-cards left">
          <motion.div
            className="card"
            variants={fadeInnew}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
          >
            <FaRocket className="icon" />
            <p>Reach your Nearby Customer at the earliest</p>
          </motion.div>

          <motion.div
            className="card"
            variants={fadeInnew}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <FaMobileAlt className="icon" />
            <p>Mobile-Friendly Interface</p>
          </motion.div>
        </div> */}

        {/* Phone Carousel */}
        <motion.div
          className="carousel-container"
          variants={fadeInnew}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1 }}
        >
          <div className="phone-frame">
            <Swiper
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000 }} // Set timeout for 2000ms
              modules={[Pagination, Autoplay]}
              loop={true}
              className="swiper-container"
            >
              <SwiperSlide>
                <motion.img
                  src={market1}
                  alt="Slide 1"
                  className="slide-image"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img
                  src={market2}
                  alt="Slide 2"
                  className="slide-image"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img
                  src={market3}
                  alt="Slide 3"
                  className="slide-image"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </motion.div>

        {/* Right Feature Cards */}
        {/* <div className="feature-cards right">
          <motion.div
            className="card"
            variants={fadeInnew}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <FaShieldAlt className="icon" />
            <p>Highly Secure Data's and Verified Customers</p>
          </motion.div>

          <motion.div
            className="card"
            variants={fadeInnew}
            initial="hidden"
            whileInView="visible"
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <FaStar className="icon" />
            <p>Highly Rated Services</p>
          </motion.div>
        </div> */}
      </div>

      {/* About Container */}
      <div className="about_text">
        <div
          className="section_title"
          data-aos="fade-up"
          data-aos-duration="1500"
          data-aos-delay="100"
        >
          <h2>
            Ready to Supercharge Your Business?{" "}
            <span>Find Mobile Numbers Easily</span>
          </h2>

          <p>
            <strong>Signpost PHONE BOOK</strong> extends your phone’s contacts
            directory to millions of firms, professionals, and individuals in
            your city and across India. Whether it's businesses, government
            departments, schools, or individuals, you’ll find what you need in
            seconds.
          </p>

          <h4 style={{ color: "rgb(219, 50, 24)", fontWeight: 500 }}>
            Nearby Promotion
          </h4>
          <p>
            Target prospects in a specific area by user type (Business, Male,
            Female, All) and location (Pincode). Ideal for B2C and D2C
            businesses.
          </p>
        </div>

        <ul
          className="app_statstic"
          id="counter"
          data-aos="fade-in"
          data-aos-duration="1500"
        >
          <li>
            <div className="icon">
              <FaDownload className="text-blue-500" />
            </div>
            <div className="text">
              <p>
                <span className="counter-value" data-count="17">
                  280
                </span>
                <span>M+</span>
              </p>
              <p>Download</p>
            </div>
          </li>

          <li>
            <div className="icon">
              <FaUserFriends className="text-green-500" />
            </div>
            <div className="text">
              <p>
                <span className="counter-value" data-count="08">
                  150
                </span>
                <span>M+</span>
              </p>
              <p>Followers</p>
            </div>
          </li>

          <li>
            <div className="icon">
              <FaStar className="text-yellow-500" />
            </div>
            <div className="text">
              <p>
                <span className="counter-value" data-count="2300">
                  1500
                </span>
                <span>+</span>
              </p>
              <p>Reviews</p>
            </div>
          </li>

          <li>
            <div className="icon">
              <FaGlobe className="text-purple-500" />
            </div>
            <div className="text">
              <p>
                <span className="counter-value" data-count="150">
                  12
                </span>
                <span>+</span>
              </p>
              <p>Countries</p>
            </div>
          </li>
        </ul>
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
