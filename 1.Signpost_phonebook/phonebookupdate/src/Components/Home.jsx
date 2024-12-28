import React, { useEffect, useState } from "react";
import "../Css/Home.css"; // Import CSS for styling

export default function Home() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
      );
      if (!response.ok)
        throw new Error(`HTTP Error! Status: ${response.status}`);
      const jsonResponse = await response.json();
      if (Array.isArray(jsonResponse)) {
        setData(jsonResponse.sort((a, b) => a.id - b.id));
      } else {
        alert("Unexpected response from server.");
      }
    } catch (error) {
      alert("Failed to load data: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Business Name</th>
            <th>Contact Person</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        {data.length > 0 ? (
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.businessname}</td>
                <td>{item.person}</td>
                <td>{item.mobileno}</td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tfoot>
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
