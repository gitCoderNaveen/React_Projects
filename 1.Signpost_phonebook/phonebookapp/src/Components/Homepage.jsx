import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "../Css/Homepage.css";
import "../Css/Phonescreen.css";
import { color } from "framer-motion";

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

  const messageTemplate =
    "I Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me.";
  const encodedMessage = useMemo(
    () => encodeURIComponent(messageTemplate),
    [messageTemplate]
  );

  const { user } = useAuth();
  const navigate = useNavigate();

  // Debounce the firmName input to prevent rapid API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFirmName(firmName);
    }, 500); // Adjust debounce delay as needed (e.g., 500ms)

    return () => {
      clearTimeout(handler);
    };
  }, [firmName]);

  const fetchData = useCallback(async () => {
    // Avoid unnecessary calls

    let url = debouncedFirmName
      ? `https://signpostphonebook.in/search/ascending_ordered_by_businessname_and_person.php?searchLetter=${debouncedFirmName}&page=${currentPage}&limit=${itemsPerPage}`
      : productName
      ? `https://signpostphonebook.in/search/ordered_list_by_product.php?searchLetter=${productName}&page=${currentPage}&limit=${itemsPerPage}`
      : `https://signpostphonebook.in/client_fetch_by_dropdown.php?page=${currentPage}&limit=${itemsPerPage}`;

    setIsFetching(true);
    setFetchError(null); // Clear previous errors before new fetch

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

  // // Function to fetch paginated data (Server-Side Pagination)
  // const fetchData = useCallback(async () => {
  //   let url = firmName
  //     ? `https://signpostphonebook.in/search/ascending_ordered_by_businessname_and_person.php?searchLetter=${firmName}&page=${currentPage}&limit=${itemsPerPage}`
  //     : productName
  //     ? `https://signpostphonebook.in/search/ordered_list_by_product.php?searchLetter=${productName}&page=${currentPage}&limit=${itemsPerPage}`
  //     : `https://signpostphonebook.in/client_fetch_by_dropdown.php?page=${currentPage}&limit=${itemsPerPage}`;

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) throw new Error("Failed to fetch data");
  //     const jsonResponse = await response.json();
  //     if (!Array.isArray(jsonResponse.data))
  //       throw new Error("Invalid response format");

  //     setData(jsonResponse.data.sort((a, b) => b.id - a.id));
  //     setTotalPages(jsonResponse.totalPages); // Ensure the API returns total pages count
  //   } catch (error) {
  //     alert(`Error loading data: ${error.message}`);
  //   }
  // }, [firmName, productName, currentPage]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  // Function to handle page navigation
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
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

  const handleMoreClick = (item) => {
    if (user) {
      setSelectedItem(item);
    } else {
      alert("Login Required");
      navigate("/login");
    }
  };

  const closePopup = () => setSelectedItem(null);

  return (
    <div>
      <div className="mycontainer container-fluid">
        <div className="sticky-container">
          {/* Search Bars */}
          {isMobile ? (
            <div className="input-container ">
              {/* First Input Box */}
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

              {/* Second Input Box */}

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
        {/* Phone Frame */}
        {/* <div className="phone-container"> */}
        {/* <h1>Find Anyone!.. Anytime!..</h1> */}
        {/* <div className="phone-frame"> */}
        {/* Camera */}
        {/* <div className="phone-camera"></div> */}

        {/* Scrollable List inside Phone Screen */}
        {/* <div className="phone-screen"> */}
        {/* Contact Cards */}
        <div className="home_contactcard-div">
          {data.length > 0 ? (
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
                <div className="home_card-left">
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
                          item.businessname ? item.businessname : item.person
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
                </div>
                <div className="home_card-right">
                  <div className="phone-section">
                    <p className="phone-number">
                      {maskMobileNumber(item.mobileno)}
                    </p>
                  </div>
                  <div className="button-group">
                    <button
                      className={`mybtn call-btn ${
                        Number(item.priority) === 1 ? "prime_call-button" : ""
                      }`}
                      onClick={() => handleCallClick(item)}
                    >
                      Call
                    </button>
                    <button
                      className={`mybtn more-btn ${
                        Number(item.priority) === 1 ? "prime_more-button" : ""
                      }`}
                      onClick={() => handleMoreClick(item)}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="loading-bar">
              <ThreeDot color="#ffffff" size="medium" text="" textColor="" />
            </p>
          )}
        </div>
        {/* </div> */}
        {/* <div className="phone-home"></div> */}
        {/* </div> */}
        {/* Pagination Controls */}

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
              count={totalPages}
              color="primary"
              page={currentPage}
              onChange={(event, value) => goToPage(value)}
            />
          </Stack>
        </div>

        {/* "Go to Page" Input */}
        <div className="goto-page">
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder="Go to page..."
            onChange={(e) => goToPage(Number(e.target.value))}
          />
        </div>
        {/* </div> */}

        {/* Popup */}
        {selectedItem && (
          <div className="popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              <h2>{selectedItem.businessname}</h2>
              {selectedItem.person && (
                <h3>
                  {selectedItem.personprefix}
                  {selectedItem.person}
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
              <div className="button-group">
                <a
                  href={`https://wa.me/${selectedItem.mobileno}`}
                  target="_blank"
                  rel="noreferrer"
                  className="popup-btn whatsapp-btn"
                >
                  WhatsApp
                </a>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
