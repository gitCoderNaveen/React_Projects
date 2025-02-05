import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import "../Css/DashBoard.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const [totals, setTotals] = useState({ totalRecords: 0, totalUniqueIds: 0 });
  const [latestEntries, setLatestEntries] = useState([]); // New state for the last 10 entries
  const [totalEntries, setTotalEntries] = useState([]); // New state for total entries
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(15000); // Default limit for calculating percentages

  const navigate = useNavigate();

  // Fetch total records and unique IDs
  const fetchTotals = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const totalRecords = data.length;
        const uniqueIds = new Set(data.map((item) => item.id)).size;

        setTotals({ totalRecords, totalUniqueIds: uniqueIds });
        setError(null);
      } else {
        throw new Error("Invalid data structure received");
      }
    } catch (error) {
      console.error("Error fetching totals:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditPage = (e) => {
    e.preventDefault();
    navigate("/edit");
  };
  const handleCountPage = (e) => {
    e.preventDefault();
    navigate("/counts");
  };

  // Fetch the last 10 entries from the database
  const fetchLatestEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const latestEntries = data.slice(-10); // Get the last 10 entries
        setLatestEntries(latestEntries);
      } else {
        throw new Error("Invalid data structure received");
      }
    } catch (error) {
      console.error("Error fetching latest entries:", error);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch total entries data for Total Entry Table
  const fetchTotalEntries = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://signpostphonebook.in/fetch_total_count_for_new_database.php"
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setTotalEntries(data); // Set the state with the fetched total entries
      } else {
        throw new Error("Invalid data structure received");
      }
    } catch (error) {
      console.error("Error fetching total entries:", error);
      setError("Failed to load total entries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotals();
    fetchLatestEntries();
    fetchTotalEntries();

    const interval = setInterval(() => {
      fetchTotals();
      fetchLatestEntries();
      fetchTotalEntries();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Percentage calculations
  const totalRecordsPercentage = Math.min(
    (totals.totalRecords / limit) * 100,
    100
  );
  const totalUniqueIdsPercentage = Math.min(
    (totals.totalUniqueIds / limit) * 100,
    100
  );

  return (
    <div className="admin-container">
      <div className="button-navigator">
        <button className="btn btn-primary m-2" onClick={handleEditPage}>
          Edit
        </button>
        <button className="btn btn-primary m-2" onClick={handleCountPage}>
          Count
        </button>
      </div>
      <Grid container spacing={3} style={{ padding: "20px" }}>
        {/* Total Records and Total Users Boxes */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            bgcolor="#f5f5f5"
            border="1px solid #ddd"
            borderRadius="8px"
            padding="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",

                  fontSize: "24px",
                  marginRight: "15px",
                }}
              >
                📊
              </div>
              <div>
                <h2 style={{ margin: "0" }}>
                  {loading ? "Loading..." : totals.totalRecords}
                </h2>
                <p style={{ margin: "0", color: "#888" }}>Total Records</p>
              </div>
            </div>
            <div style={{ width: "100px", height: "100px" }}>
              <CircularProgressbar
                value={loading ? 0 : totalRecordsPercentage}
                text={`${loading ? 0 : totalRecordsPercentage.toFixed(1)}%`}
                styles={buildStyles({
                  textSize: "12px",
                  textColor: "#4caf50",
                  pathColor: "#4caf50",
                  trailColor: "#ddd",
                })}
              />
            </div>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            bgcolor="#f5f5f5"
            border="1px solid #ddd"
            borderRadius="8px"
            padding="20px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  backgroundColor: "#2196f3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "24px",
                  marginRight: "15px",
                }}
              >
                👥
              </div>
              <div>
                <h2 style={{ margin: "0" }}>
                  {loading ? "Loading..." : totals.totalUniqueIds}
                </h2>
                <p style={{ margin: "0", color: "#888" }}>Total Users</p>
              </div>
            </div>
            <div style={{ width: "100px", height: "100px" }}>
              <CircularProgressbar
                value={loading ? 0 : totalUniqueIdsPercentage}
                text={`${loading ? 0 : totalUniqueIdsPercentage.toFixed(1)}%`}
                styles={buildStyles({
                  textSize: "12px",
                  textColor: "#2196f3",
                  pathColor: "#2196f3",
                  trailColor: "#ddd",
                })}
              />
            </div>
          </Box>
        </Grid>

        {/* Total Entry Table */}
        <Grid item xs={12} sm={6} md={4}>
          <Box
            className="total-entry-table"
            bgcolor="#f5f5f5"
            p="20px"
            borderRadius="8px"
            boxShadow={1}
          >
            <Typography variant="h6" fontWeight="600" color="#333" mb="15px">
              Total Entry Table
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: "8px", overflow: "auto", maxHeight: "340px" }}
            >
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>id</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>date</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {totalEntries.map((entry, index) => (
                    <TableRow key={`${entry.id}-${index}`}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{entry.userid}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        {/* Last 10 Entries Table */}
        <Grid item xs={12}>
          <Box
            bgcolor="#f5f5f5"
            p="20px"
            borderRadius="8px"
            maxWidth={980}
            className="table-grid"
          >
            <Typography variant="h5" fontWeight="600" color="#333" mb="20px">
              Last 10 Entries
            </Typography>

            <TableContainer component={Paper} sx={{ maxHeight: "340px" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Business Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Person Name
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Address
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>City</TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Pincode
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Mobile No
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      Product
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      promocode
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>
                      subscription date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {latestEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{entry.id}</TableCell>
                      <TableCell>{entry.businessname}</TableCell>
                      <TableCell>{entry.person}</TableCell>
                      <TableCell>{entry.address}</TableCell>
                      <TableCell>{entry.city}</TableCell>
                      <TableCell>{entry.pincode}</TableCell>
                      <TableCell>{entry.mobileno}</TableCell>
                      <TableCell>{entry.product}</TableCell>
                      <TableCell>{entry.promocode}</TableCell>
                      <TableCell>{entry.subscription_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DashBoard;
