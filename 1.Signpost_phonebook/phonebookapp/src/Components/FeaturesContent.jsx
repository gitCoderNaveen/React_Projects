import React, { useRef, useEffect } from "react";
import appLook from "../assets/images/app-look.png";
import { AiFillDatabase } from "react-icons/ai";
import { PiDevicesBold } from "react-icons/pi";
import { TbMessageCircleSearch } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { motion, useInView, useAnimation } from "framer-motion";

const FeatureItem = ({ children, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: delay, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

const FeaturesContent = () => {
  const imageRef = useRef(null);
  const isImageInView = useInView(imageRef, { once: true });
  const imageControls = useAnimation();

  useEffect(() => {
    if (isImageInView) {
      imageControls.start("visible");
    }
  }, [isImageInView, imageControls]);

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: "easeInOut" },
    },
  };

  return (
    <div>
      <section className="row row-cols-1 row-cols-md-3 justify-content-between align-items-center p-4 mt-5 bg-light">
        {/* Left Side (Text content) */}
        <div className="col d-flex flex-column gap-4">
          <FeatureItem delay={0.2}>
            <div className="d-flex align-items-start">
              <AiFillDatabase size={38} className="text-primary me-3" />
              <div>
                <p
                  className="fw-semibold fs-6 py-2"
                  style={{ color: "#2F0036" }}
                >
                  Massive Listings Database
                </p>
                <p className="py-1 text-muted">
                  Access an extensive directory featuring millions of listings,
                  including businesses, professionals, MSMEs, schools, malls,
                  medical services, and more.
                </p>
              </div>
            </div>
          </FeatureItem>
          <FeatureItem delay={0.4}>
            <div className="d-flex align-items-start">
              <PiDevicesBold size={38} className="text-primary me-3" />
              <div>
                <p
                  className="fw-semibold fs-6 py-2"
                  style={{ color: "#2F0036" }}
                >
                  Device Compatibility
                </p>
                <p className="py-1 text-muted">
                  Works seamlessly on all devices, from old feature phones to
                  modern smartphones.
                </p>
              </div>
            </div>
          </FeatureItem>
        </div>

        {/* Center Image (App look) */}
        <motion.div
          ref={imageRef}
          className="col d-flex justify-content-center"
          variants={imageVariants}
          initial="hidden"
          animate={imageControls}
        >
          <img
            src={appLook}
            alt="App Look"
            className="img-fluid w-80 w-sm-90 w-md-100 w-lg-110 w-xl-120"
            loading="lazy"
          />
        </motion.div>

        {/* Right Side (Text content) */}
        <div className="col d-flex flex-column gap-4">
          <FeatureItem delay={0.2}>
            <div className="d-flex align-items-start">
              <TbMessageCircleSearch size={38} className="text-info me-3" />
              <div>
                <p
                  className="fw-semibold fs-6 py-2"
                  style={{ color: "#2F0036" }}
                >
                  Advanced Search Functionality
                </p>
                <p className="py-1 text-muted">
                  Use powerful search tools to find contacts alphabetically, by
                  category, or by location, with over 10,000 categories to
                  explore.
                </p>
              </div>
            </div>
          </FeatureItem>
          <FeatureItem delay={0.4}>
            <div className="d-flex align-items-start mt-3 mt-md-0">
              <MdSupportAgent size={38} className="text-info me-3" />
              <div>
                <p
                  className="fw-semibold fs-6 py-2"
                  style={{ color: "#2F0036" }}
                >
                  24 / 7 Support
                </p>
                <p className="py-1 text-muted">
                  Connect with our support team within minutes to clear your
                  queries as soon as possible.
                </p>
              </div>
            </div>
          </FeatureItem>
        </div>
      </section>
    </div>
  );
};

export default FeaturesContent;
