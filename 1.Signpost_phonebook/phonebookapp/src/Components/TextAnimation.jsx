import React from "react";
import { FaSearch } from "react-icons/fa";
import "../Css/AnimatedComponent.css"; // Optional: For styling

const TextAnimation = () => {
  return (
    <div style={styles.container}>
      {/* First Input Box */}
      <div style={styles.inputContainer}>
        <FaSearch style={styles.icon} />
        <input type="text" placeholder="Search here..." style={styles.input} />
      </div>

      {/* Second Input Box */}
      <div style={styles.inputContainer}>
        <FaSearch style={styles.icon} />
        <input type="text" placeholder="Search here..." style={styles.input} />
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  IconContainer: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  inputContainer: {
    position: "relative",
    width: "250px",
  },
  input: {
    width: "100%",
    padding: "10px 10px 10px 40px", // Leave space for the icon
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "10px",
    transform: "translateY(-50%)",
    color: "#888",
    fontSize: "18px",
  },
};

export default TextAnimation;
