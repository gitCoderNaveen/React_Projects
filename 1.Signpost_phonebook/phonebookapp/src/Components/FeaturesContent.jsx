import appLook from "../assets/images/app-look.png";
import { AiFillDatabase } from "react-icons/ai";
import { PiDevicesBold } from "react-icons/pi";
import { TbMessageCircleSearch } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const FeaturesContent = () => {
  return (
    <div>
      <section className="row row-cols-1 row-cols-md-3 justify-content-between align-items-center p-4 mt-5 bg-light">
        {/* Left Side (Text content) */}
        <div className="col d-flex flex-column gap-4">
          <div className="d-flex align-items-start animate__animated animate__pulse">
            <AiFillDatabase size={38} className="text-primary me-3" />{" "}
            <div>
              <p className="fw-semibold fs-6 py-2" style={{ color: "#2F0036" }}>
                {" "}
                Massive Listings Database
              </p>
              <p className="py-1 text-muted">
                {" "}
                {/* Bootstrap muted text color */}
                Access an extensive directory featuring millions of listings,
                including businesses, professionals, MSMEs, schools, malls,
                medical services, and more.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-start animate__animated animate__pulse">
            <PiDevicesBold size={38} className="text-primary me-3" />{" "}
            <div>
              <p className="fw-semibold fs-6 py-2" style={{ color: "#2F0036" }}>
                {" "}
                Device Compatibility
              </p>
              <p className="py-1 text-muted">
                {" "}
                Works seamlessly on all devices, from old feature phones to
                modern smartphones.
              </p>
            </div>
          </div>
        </div>

        {/* Center Image (App look) */}
        <div className="col d-flex justify-content-center">
          <img
            src={appLook}
            alt="App Look"
            className="img-fluid w-80 w-sm-90 w-md-100 w-lg-110 w-xl-120"
            loading="lazy"
          />
        </div>

        {/* Right Side (Text content) */}
        <div className="col d-flex flex-column gap-4">
          <div className="d-flex align-items-start animate__animated animate__pulse">
            <TbMessageCircleSearch size={38} className="text-info me-3" />{" "}
            <div>
              <p className="fw-semibold fs-6 py-2" style={{ color: "#2F0036" }}>
                {" "}
                Advanced Search Functionality
              </p>
              <p className="py-1 text-muted">
                {" "}
                Use powerful search tools to find contacts alphabetically, by
                category, or by location, with over 10,000 categories to
                explore.
              </p>
            </div>
          </div>
          <div className="d-flex align-items-start mt-3 mt-md-0 animate__animated animate__pulse">
            {" "}
            <MdSupportAgent size={38} className="text-info me-3" />{" "}
            <div>
              <p className="fw-semibold fs-6 py-2" style={{ color: "#2F0036" }}>
                24 / 7 Support
              </p>{" "}
              <p className="py-1 text-muted">
                {" "}
                Connect with our support team within minutes to clear your
                queries as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesContent;
