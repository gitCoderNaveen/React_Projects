import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isPerson, setIsperson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setSearchQuery(""); // Clears the search input field
    try {
      const response = await axios.get(
        "https://signpostphonebook.in/client_fetch_for_new_database.php"
      );

      if (Array.isArray(response.data)) {
        const formattedData = response.data.map((item, index) => ({
          ...item,
          id: item.id || index,
        }));
        const person = response.data.map((item) => ({
          item,
        }));
        setData(formattedData);
        setFilteredData(formattedData);
        setIsperson(person);
      } else {
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRow = async () => {
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/update_row_for_new_database.php",
        editingRow
      );

      if (response.data.success) {
        setData((prevData) =>
          prevData.map((row) =>
            row.id === editingRow.id ? { ...row, ...editingRow } : row
          )
        );
        setFilteredData((prevData) =>
          prevData.map((row) =>
            row.id === editingRow.id ? { ...row, ...editingRow } : row
          )
        );
        setSnackbarMessage("Row updated successfully!");
        setSnackbarOpen(true);
        setOpenDialog(false);
        setEditingRow(null);
      } else {
        console.error("Update failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating row:", error);
    }
  };

  const handleDeleteRow = async () => {
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/delete_row_for_new_database.php",
        { id: rowToDelete }
      );

      if (response.data.success) {
        setData((prevData) => prevData.filter((row) => row.id !== rowToDelete));
        setFilteredData((prevData) =>
          prevData.filter((row) => row.id !== rowToDelete)
        );
        setSnackbarMessage("Row deleted successfully!");
        setSnackbarOpen(true);
        setDeleteDialogOpen(false);
        setRowToDelete(null);
      } else {
        console.error("Delete failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = data.filter((row) => {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(query)
      );
    });

    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilteredData(data);
  };

  return (
    <>
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          navigate("/admin");
        }}
      >{`<< Back`}</button>
      <Box m="20px">
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>

        <h1 style={{ textAlign: "center" }}>Search To Edit</h1>

        <Box display="flex" gap={1} mb={2}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ width: "70%" }}
          />
          <Button
            style={{ padding: "1px", height: "40px", top: "8px" }}
            variant="contained"
            color="secondary"
            onClick={handleClearSearch}
          >
            Clear
          </Button>
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={fetchData}
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Refresh Data
        </Button>

        <Box height="75vh" width="100%">
          <DataGrid
            rows={filteredData}
            columns={[
              // { field: "id", headerName: "ID", flex: 0.5 },
              { field: "prefix", headerName: "Prefix", flex: 0.5 },
              { field: "businessname", headerName: "Business Name", flex: 1 },
              { field: "personperfix", headerName: "PersonPerfix", flex: 1 },
              { field: "person", headerName: "Person Name", flex: 1 },
              // { field: "product", headerName: "Product", flex: 1 },
              // { field: "mobileno", headerName: "Mobile No", flex: 1 },
              // { field: "address", headerName: "Address", flex: 1 },
              // { field: "city", headerName: "City", flex: 1 },
              // { field: "pincode", headerName: "Pincode", flex: 1 },
              // { field: "lcode", headerName: "Lcode", flex: 1 },
              // { field: "landline", headerName: "Landline", flex: 1 },
              // { field: "promocode", headerName: "Promocode", flex: 1 },
              // { field: "discount", headerName: "Discount", flex: 1 },
              // { field: "subscription_date", headerName: "Subscription", flex: 1 },
              {
                field: "actions",
                headerName: "Actions",
                flex: 1,
                renderCell: (params) => (
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setEditingRow(params.row);
                        setOpenDialog(true);
                      }}
                      sx={{ marginRight: "10px" }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        setRowToDelete(params.row.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                ),
              },
            ]}
            getRowId={(row) => row.id}
            loading={loading}
            components={{ Toolbar: GridToolbar }}
            pageSize={10}
            disableRowSelectionOnClick
          />
        </Box>

        {/* Edit Modal */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Row</DialogTitle>
          <DialogContent>
            {editingRow &&
              Object.keys(editingRow).map((key) => (
                <TextField
                  key={key}
                  label={key.toUpperCase()}
                  value={editingRow[key] || ""}
                  onChange={(e) =>
                    setEditingRow((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  fullWidth
                  margin="normal"
                />
              ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdateRow} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this row?</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDeleteDialogOpen(false)}
              color="secondary"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteRow} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Edit;
