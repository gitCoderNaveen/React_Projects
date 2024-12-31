import React, { useState } from "react";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";

const Card = () => {
  const [referName, setReferName] = useState("");
  const [referNo, setReferNo] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [message, setMessage] = useState("");
  const { userData } = useAuth();
  const navigate = useNavigate();

  const handleReferNo = (e) => {
    if (e.target.value.length <= 13) {
      setReferNo(e.target.value);
    } else {
      setMessage("Allowed 10 digits only");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!referName || !referNo) {
      setMessage("Enter Reference Name & Number");
      return;
    }

    const data = {
      From_Name: userData.businessname,
      From_MobileNo: userData.mobileno,
      To_Name: referName,
      To_MobileNo: referNo,
    };

    try {
      const response = await fetch(
        "https://signpostphonebook.in/try_contact.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setMessage("Record Added Successfully");

        const smsLink = `sms:${referNo}?body=Greetings... ${referName}, From Signpost, I am ${userData.businessname}. I refer you to use www.signpostphonebook.in`;
        setTimeout(() => {
          window.location.href = smsLink;
        }, 2000);
      } else {
        setMessage(`Failed to save Data: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      setMessage(`An Error Occurred While submitting Data: ${error.message}`);
    }
  };

  const closeCard = () => {
    setShowForm(false);
    navigate("/");
  };

  return (
    <div style={styles.mainDiv}>
      {showForm && (
        <div style={styles.popup}>
          <button onClick={closeCard} style={styles.closeButton}>
            ×
          </button>
          <form onSubmit={handleSubmit} style={formStyles.container}>
            <div style={formStyles.field}>
              <label>
                Your Name:
                <p style={formStyles.label}>{userData.businessname}</p>
              </label>
            </div>
            <div style={formStyles.field}>
              <label>
                Your Number:
                <p style={formStyles.label}>{userData.mobileno}</p>
              </label>
            </div>
            <div style={formStyles.field}>
              <label style={formStyles.label}>
                Refer Name:
                <input
                  type="text"
                  name="name2"
                  value={referName}
                  onChange={(e) => {
                    setReferName(e.target.value);
                  }}
                  required
                  style={formStyles.input}
                />
              </label>
            </div>
            <div style={formStyles.field}>
              <label style={formStyles.label}>
                Refer Number:
                <input
                  type="number"
                  name="mobile2"
                  value={referNo}
                  onChange={handleReferNo}
                  required
                  style={formStyles.input}
                />
              </label>
            </div>
            <button type="submit" style={formStyles.button}>
              Submit
            </button>
          </form>
        </div>
      )}

      {message && (
        <div style={styles.messagePopup}>
          <p>{message}</p>
          <button
            onClick={() => setMessage("")}
            style={styles.messageCloseButton}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
  popup: {
    position: "fixed",
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    border: "none",
    background: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  messagePopup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 1001,
  },
  messageCloseButton: {
    marginTop: "10px",
    padding: "8px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

const formStyles = {
  container: {
    padding: "20px",
  },
  field: {
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Card;
