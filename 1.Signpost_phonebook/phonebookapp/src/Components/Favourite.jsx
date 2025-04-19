import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/features/favorites/favoritesSlice";
import "../Css/Favourite.css";
import { FaTrash, FaPaperPlane } from "react-icons/fa"; // Import icons

const Favourite = () => {
  const favorites = useSelector((state) => state.favorites.favorites);
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState({});
  const [smsContent, setSmsContent] = useState(
    "Saw Your Listing in SIGNPOST PHONE BOOK. I am Interested in your Products. Please Send Details/Call Me. (Sent Thro Signpost PHONE BOOK)"
  );

  const handleRemove = (id) => {
    dispatch(removeFavorite(id));
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id],
    });
  };

  const handleSendSms = () => {
    const selectedFavorites = favorites.filter(
      (favorite) => checkedItems[favorite.id]
    );

    if (selectedFavorites.length === 0) {
      alert("Please select at least one favorite to send SMS.");
      return;
    }

    selectedFavorites.forEach((favorite) => {
      const smsUrl = `sms:${favorite.mobileno}?body=${encodeURIComponent(
        smsContent
      )}`;
      window.open(smsUrl);
    });
  };

  const groupedFavorites = Array.isArray(favorites)
    ? favorites.reduce((acc, favorite) => {
        if (!acc[favorite.category]) {
          acc[favorite.category] = [];
        }
        acc[favorite.category].push(favorite);
        return acc;
      }, {})
    : {};

  return (
    <div className="favourite-container">
      <h2 style={{ marginTop: "10px", fontWeight: "700" }}>My Lists</h2>

      {Object.keys(groupedFavorites).length > 0 ? (
        Object.keys(groupedFavorites).map((category) => (
          <div key={category} className="category-section">
            <h3 className="category-header">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="favourite-list">
              {groupedFavorites[category].map((favorite) => (
                <div key={favorite.id} className="favourite-card">
                  <h3>{favorite.businessname || favorite.person}</h3>
                  <p>Mobile: {favorite.mobileno}</p>
                  <p>City: {favorite.city}</p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemove(favorite.id)}
                  >
                    <FaTrash />
                  </button>
                  <input
                    type="checkbox"
                    checked={checkedItems[favorite.id] || false}
                    onChange={() => handleCheckboxChange(favorite.id)}
                    className="favorite-checkbox"
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="no-favorites">No Lists added yet.</p>
      )}

      <div className="sms-section">
        <textarea
          value={smsContent}
          onChange={(e) => setSmsContent(e.target.value)}
          placeholder="Enter SMS content..."
          className="sms-textarea"
        />
        <button className="send-sms-button" onClick={handleSendSms}>
          <FaPaperPlane /> Send SMS
        </button>
      </div>
    </div>
  );
};

export default Favourite;
