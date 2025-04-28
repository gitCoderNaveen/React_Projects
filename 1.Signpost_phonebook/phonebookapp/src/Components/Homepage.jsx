import { useCallback, useEffect, useMemo, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../Css/Homepage.css";
import "../Css/Phonescreen.css";
import { useDispatch } from "react-redux";
import { addFavorite } from "../redux/features/favorites/favoritesSlice";
import ShimmerCard from "./ShimmerCard";
import { CiHeart, CiPhone } from "react-icons/ci";
import { BiQuestionMark } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { color } from "framer-motion";
import axios from "axios";

export default function Homepage() {
  const [data, setData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [selectedItem, setSelectedItem] = useState(null);
  const [firmName, setFirmName] = useState("");
  const [productName, setProductName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeInput, setActiveInput] = useState(1);
  const [fetchError, setFetchError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [debouncedFirmName, setDebouncedFirmName] = useState(firmName);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteItem, setFavoriteItem] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [disabledCategories, setDisabledCategories] = useState([]);

  // new update:
  const [clickSource, setClickSource] = useState(null);
  const messageTemplate =
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me.";
  const encodedMessage = useMemo(
    () => encodeURIComponent(messageTemplate),
    [messageTemplate]
  );
  const [enquiryMessage, setEnquiryMessage] = useState(messageTemplate);

  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFirmName(firmName);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [firmName]);

  const fetchData = useCallback(async () => {
    let url = debouncedFirmName
      ? `https://signpostphonebook.in/search/ascending_ordered_by_businessname_and_person.php?searchLetter=${debouncedFirmName}&page=${currentPage}&limit=${itemsPerPage}`
      : productName
      ? `https://signpostphonebook.in/search/ordered_list_by_product.php?searchLetter=${productName}&page=${currentPage}&limit=${itemsPerPage}`
      : `https://signpostphonebook.in/client_fetch_by_dropdown.php?page=${currentPage}&limit=${itemsPerPage}`;

    setIsFetching(true);
    setFetchError(null);

    try {
      const controller = new AbortController();
      const signal = controller.signal;

      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error("Failed to fetch data");

      const jsonResponse = await response.json();
      if (!Array.isArray(jsonResponse.data))
        throw new Error("Invalid response format");

      setData(jsonResponse.data.sort((a, b) => b.id - a.id));
      setTotalPages(jsonResponse.totalPages);
    } catch (error) {
      if (error.name !== "AbortError") {
        setFetchError(`Error loading data: ${error.message}`);
      }
    } finally {
      setIsFetching(false);
    }
  }, [debouncedFirmName, productName, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sendWhatsappMessage = async (item) => {
    console.log("WhatsApp Number being sent:", item); // Add this line
    try {
      const response = await axios.post(
        `http://bhashsms.com/api/sendmsg.php?user=SignpostCelfon&pass=123456&sender=BUZWAP&phone=${item}&text=campaign_new&priority=wa&stype=normal`
      );
      console.log(response.data);
    } catch (error) {
      alert("Unable to send message", error);
      console.error("WhatsApp API Error:", error); // Log the error object
    }
  };
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleIconClick = (item) => {
    setFavoriteItem(item);
    setIsModalOpen(true);
    setSelectedCategories([]);
    setDisabledCategories([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFavoriteItem(null);
  };

  const openWhatsApp = (phoneNumber) => {
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const handleResize = () => setIsMobile(window.innerWidth < 480);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maskMobileNumber = useMemo(
    () => (mobileNumber) =>
      mobileNumber && mobileNumber.length > 5
        ? mobileNumber.slice(0, -5) + "xxxxx"
        : mobileNumber,
    []
  );

  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleFirmname = () => {
    setProductName("");
    setActiveInput(1);
  };

  const handleProductname = () => {
    setFirmName("");
    setActiveInput(2);
  };

  const handleCallClick = (item) => {
    if (user) {
      window.location.href = `tel:${item.mobileno}`;
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const handleEnquiryClick = (item) => {
    if (user) {
      setSelectedItem(item);
      setEnquiryMessage(
        `I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Through Signpost PHONE BOOK)`
      );
      setClickSource("enquiry"); // Set clickSource to 'enquiry'
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const handleMiddleClick = (item) => {
    setSelectedItem(item);
    setClickSource("middle"); // Set clickSource to 'middle'
  };

  const closePopup = () => setSelectedItem(null);

  const handleAddToFavorites = () => {
    if (favoriteItem && user && selectedCategories.length > 0) {
      selectedCategories.forEach((category) => {
        const favorite = {
          id: favoriteItem.id,
          businessname: favoriteItem.businessname,
          person: favoriteItem.person,
          mobileno: favoriteItem.mobileno,
          city: favoriteItem.city,
          pincode: favoriteItem.pincode,
          category: category,
        };
        dispatch(addFavorite(favorite));
      });
      handleCloseModal();
    } else {
      if (!user) {
        alert("Login Required");
        navigate("/login");
      } else if (selectedCategories.length === 0) {
        alert("Please select at least one category.");
      }
    }
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
      setDisabledCategories([]);
    } else {
      setSelectedCategories([...selectedCategories, category]);
      setDisabledCategories(
        ["buyer", "supplier", "friends & families", "others"].filter(
          (c) => c !== category
        )
      );
    }
  };

  return (
    <div>
      <div className="mycontainer container-fluid home-container">
        <div className="sticky-container">
          {isMobile ? (
            <div className="input-container ">
              <input
                type="text"
                placeholder="Firm/Person Name"
                onChange={(e) => setFirmName(e.target.value)}
                onSelect={handleFirmname}
                value={firmName}
                autoComplete="off"
                className={`input-box ${
                  activeInput === 1 ? "expanded" : "shrunken"
                }`}
              />
              {firmName && (
                <button
                  onClick={() => {
                    setFirmName("");
                  }}
                  className="clear-button"
                >
                  Clear
                </button>
              )}
              <input
                type="text"
                placeholder="Product Name"
                onChange={(e) => setProductName(e.target.value)}
                onSelect={handleProductname}
                value={productName}
                autoComplete="off"
                className={`input-box ${
                  activeInput === 2 ? "expanded" : "shrunken"
                }`}
              />
              {productName && (
                <button
                  onClick={() => {
                    setProductName("");
                  }}
                  className="personclear-button"
                >
                  Clear
                </button>
              )}
            </div>
          ) : (
            <div className="search-container text-light">
              <label>Firm/Person: </label>
              <input
                type="text"
                placeholder="Search by Firms/Persons..."
                className="search-box"
                onChange={(e) => setFirmName(e.target.value)}
                onSelect={() => setProductName("")}
                value={firmName}
              />
              <label>Product: </label>
              <input
                type="text"
                placeholder="Search By Products..."
                className="search-box"
                onChange={(e) => setProductName(e.target.value)}
                onSelect={() => setFirmName("")}
                value={productName}
              />
            </div>
          )}
        </div>

        <div className="home_contactcard-div">
          {isFetching ? (
            <>
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
              <ShimmerCard />
            </>
          ) : data.length > 0 ? (
            data.map((item) => (
              <div
                className={`home_card-container ${
                  Number(item.priority) === 1 ? "priority_card" : ""
                }`}
                key={item.id}
              >
                {item.discount && (
                  <div className="discount_badge">Discount</div>
                )}
                <div className="home_card-left-icons">
                  <FaPhoneAlt
                    className="call-icon"
                    onClick={() => handleCallClick(item)}
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                      color: "white",
                      backgroundColor: "#0288D1",
                      borderRadius: "70px",
                      fontWeight: "bold",
                      padding: "5px",
                    }}
                    title="Call"
                  />
                  <CiHeart
                    className="favorite-icon mt-2"
                    onClick={() => handleIconClick(item)}
                    style={{
                      cursor: "pointer",
                      fontSize: "26px",
                    }}
                    title="Add to MyList"
                  />
                </div>
                <div
                  className="home_card-middle hoverable-middle"
                  onClick={() => handleMiddleClick(item)}
                  style={{ cursor: "pointer" }}
                >
                  <h3
                    className={`home_card-name ${
                      Number(item.priority) === 1
                        ? "priority_card-headings"
                        : ""
                    }`}
                  >
                    {firmName &&
                    item.person.toLowerCase().includes(firmName.toLowerCase())
                      ? toTitleCase(item.person)
                      : toTitleCase(
                          item.businessname
                            ? item.businessname.length > 14
                              ? `${item.businessname.slice(0, 14)}....`
                              : item.businessname
                            : item.person
                        )}
                  </h3>
                  <p className="card-location">
                    {productName ? (
                      <>{item.product}</>
                    ) : (
                      <>
                        {item.city}, {item.pincode}
                      </>
                    )}
                  </p>
                  <p
                    className="phone-number"
                    style={{
                      position: "absolute",
                      top: "60px",
                      fontSize: "14px",
                      marginbottom: "-15px",
                    }}
                  >
                    {maskMobileNumber(item.mobileno)}
                  </p>
                </div>
                <div className="home_card-right">
                  <button
                    className={`mybtn enquiry-btn ${
                      Number(item.priority) === 1 ? "prime_enquiry-button" : ""
                    }`}
                    onClick={() => handleEnquiryClick(item)}
                    style={{ fontSize: "13px", fontWeight: "bold" }} // Add this inline style
                  >
                    {/* Change this line */}
                    Send Enquiry
                  </button>
                </div>
              </div>
            ))
          ) : (
            fetchError && <p className="loading-bar">{fetchError}</p>
          )}
        </div>

        {/* Modal for adding to favorites */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Close Icon */}
              <FaTimes
                onClick={handleCloseModal}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#333",
                }}
              />

              <h2>Add to My List</h2>
              <div className="modal-categories">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("buyer")}
                    onChange={() => handleCategoryChange("buyer")}
                    disabled={disabledCategories.includes("buyer")}
                  />
                  Buyer
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("supplier")}
                    onChange={() => handleCategoryChange("supplier")}
                    disabled={disabledCategories.includes("supplier")}
                  />
                  Supplier
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("friends & families")}
                    onChange={() => handleCategoryChange("friends & families")}
                    disabled={disabledCategories.includes("friends & families")}
                  />
                  Friends & Families
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("others")}
                    onChange={() => handleCategoryChange("others")}
                    disabled={disabledCategories.includes("others")}
                  />
                  Others
                </label>
              </div>
              <div className="modal-actions">
                <button
                  className="confirm-button"
                  onClick={handleAddToFavorites}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedItem && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              {clickSource === "middle" && (
                <>
                  <h2 className="text-primary">{selectedItem.businessname}</h2>
                  {selectedItem.person && (
                    <h3>
                      {selectedItem.personprefix} {selectedItem.person}
                    </h3>
                  )}
                  <p>
                    <strong>Mobile:</strong>{" "}
                    {maskMobileNumber(selectedItem.mobileno)}
                  </p>
                  <p>
                    <strong>Product/Services:</strong> <br />
                    {selectedItem.product}
                  </p>
                  <p>
                    <strong>Address:</strong> {selectedItem.address},{" "}
                    {selectedItem.city}, {selectedItem.pincode}
                  </p>
                </>
              )}

              {clickSource === "enquiry" && (
                <>
                  <div className="enquiry-textarea">
                    <textarea
                      className="enquiry-input"
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      rows="6"
                    />
                  </div>
                  <div className="button-group">
                    <button
                      className="popup-btn whatsapp-btn"
                      onClick={() => openWhatsApp(selectedItem.mobileno)}
                    >
                      whatsapp
                    </button>
                    {selectedItem.email && (
                      <a
                        href={`mailto:${
                          selectedItem.email || "business@example.com"
                        }`}
                        className="popup-btn mail-btn"
                      >
                        Mail
                      </a>
                    )}
                    <a
                      href={`tel:${selectedItem.mobileno}`}
                      className="popup-btn call-btn"
                    >
                      Call
                    </a>
                    <a
                      href={`sms:${selectedItem.mobileno}?&body=${encodedMessage}`}
                      className="popup-btn sms-btn"
                    >
                      SMS
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            ◀ Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next ▶
          </button>
        </div>

        <div className="pagination-number">
          <Stack spacing={2}>
            <Pagination
              count={50}
              color="primary"
              page={currentPage}
              onChange={(event, value) => goToPage(value)}
            />
          </Stack>
        </div>

        <div className="goto-page">
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Go to page..."
            onChange={(e) => goToPage(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
