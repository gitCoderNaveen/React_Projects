import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "../Css/Landingpage.css";

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
          <span className="blue">Creative</span>{" "}
          <span className="red">Landing</span>{" "}
          <span className="green">Page</span>
        </motion.h1>
        <motion.p
          className="subheading"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
        >
          Discover a world of innovation and creativity with this sleek landing
          page design.
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
              modules={[Pagination]}
              loop={true}
              className="swiper-container"
            >
              <SwiperSlide>
                <motion.img
                  src="https://via.placeholder.com/300x500"
                  alt="Slide 1"
                  className="slide-image"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img
                  src="https://via.placeholder.com/300x500"
                  alt="Slide 2"
                  className="slide-image"
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                />
              </SwiperSlide>
              <SwiperSlide>
                <motion.img
                  src="https://via.placeholder.com/300x500"
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
