import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./Auth";

export default function TextAnimation() {
  const [response, setResponse] = useState(null);
  const { userData } = useAuth();
  const username = userData.businessname;
  const userid = userData.id;
  const mycount = 1;
  const mydate = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      id: userid,
      name: username,
      date: mydate,
      count: mycount,
    };

    try {
      const res = await axios.post(
        "https://signpostphonebook.in/data_enty_insert.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponse(res.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponse({
        success: false,
        message: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Click to submit</button>
      {response}
    </div>
  );
}
