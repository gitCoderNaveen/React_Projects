import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import "../Css/Landingpage.css";
import carousel1 from "../assets/images/carosel.jpg";
import carousel from "../assets/images/carousel.jpg";
import carousel2 from "../assets/images/carouselthree.jpg";

const Landingpage = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  return (
    <div className="landing-page">
      {/* Left Section */}
      <div className="left-section">
        <motion.h1
          className="heading"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="blue">Promote</span>{" "}
          <span className="red">Your</span>{" "}
          <span className="green">Business</span>
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
          <div className="mobile-top"></div>
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
        </motion.div>
      </div>
    </div>
  );
};

export default Landingpage;
