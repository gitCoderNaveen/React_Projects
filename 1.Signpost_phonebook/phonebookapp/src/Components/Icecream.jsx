import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../Css/Icecream.css";
import { Authcontext } from "./Auth";
import buyerImg from "../assets/images/Buyer.png.jpg";
import shopImg from "../assets/images/Shop.png.jpg";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  boxShadow: theme.shadows[1],
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  borderBottom: `1px solid ${theme.palette.divider}`,
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)",
  },
}));

const Icecream = () => {
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();

  const [shopData, setShopData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState(true);

  const components = [
    {
      id: 1,
      name: "Add Buyer",
      image: buyerImg,
      to: "/buyer",
    },
    {
      id: 2,
      name: "Add Shop Owner",
      image: shopImg,
      to: "/shopkeeper",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(
          "https://signpostphonebook.in/icecream/fetch_ice_cream_transaction.php"
        );
        const data1 = await res1.json();
        if (data1.success) setShopData(data1.data);

        const res2 = await fetch(
          "https://signpostphonebook.in/icecream/fetch_shop_owner_details.php"
        );
        const data2 = await res2.json();
        if (data2.success) setOwnerData(data2.data);

        const res3 = await fetch(
          "https://signpostphonebook.in/icecream/fetch_information_table.php"
        );
        const data3 = await res3.json();
        if (data3.success) setInfoData(data3.data);
      } catch (err) {
        alert("Network request failed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderButtons = () =>
    components.map((item) => (
      <div
        key={item.id}
        className="action-item"
        onClick={() => {
          if (user) {
            navigate(item.to);
          } else {
            alert("Please login to view this item.");
            navigate("/login");
          }
        }}
      >
        <img src={item.image} alt={item.name} className="avatar" />
        <div className="name">{item.name}</div>
      </div>
    ));

  const transactionColumns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 70 },
      { field: "shop_owner_name", headerName: "Shop Owner", width: 200 },
      { field: "customer_name", headerName: "Customer", width: 200 },
      { field: "count", headerName: "Count", width: 100 },
      { field: "date", headerName: "Date", width: 150 },
    ],
    []
  );

  const ownerColumns = useMemo(
    () => [
      { field: "shop_owner_id", headerName: "ID", width: 70 },
      { field: "shop_owner_name", headerName: "Owner Name", width: 200 },
      { field: "total_ice_cream", headerName: "Total", width: 100 },
      { field: "sold_ice_cream", headerName: "Sold", width: 100 },
      { field: "balance_ice_cream", headerName: "Balance", width: 120 },
      { field: "date", headerName: "Date", width: 150 },
    ],
    []
  );

  const infoColumns = useMemo(
    () => [
      { field: "user_id", headerName: "ID", width: 70 },
      { field: "user_name", headerName: "Name", width: 150 },
      { field: "buyer_id", headerName: "Buyer ID", width: 100 },
      { field: "buyer_name", headerName: "Buyer Name", width: 150 },
      { field: "buyer_mobileno", headerName: "Buyer Mobile", width: 150 },
      { field: "date", headerName: "Date", width: 150 },
    ],
    []
  );

  return (
    <div className="icecream-container">
      <h2 className="main-heading">Icecream Specials</h2>
      <div className="actions-bar d-flex justify-content-evenly">
        {renderButtons()}
      </div>

      {/* Transaction Table */}
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Transaction Details</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          {loading ? (
            <div className="loading-indicator">Loading transactions...</div>
          ) : shopData.length > 0 ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={shopData}
                columns={transactionColumns}
                pageSizeOptions={[5, 10, 20]}
                pagination
                autoHeight
              />
            </div>
          ) : (
            <div className="no-data">No transaction data available.</div>
          )}
        </AccordionDetails>
      </StyledAccordion>

      {/* Shop Owner Table */}
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Shop Owner Statistics</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          {loading ? (
            <div className="loading-indicator">Loading shop owner data...</div>
          ) : ownerData.length > 0 ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={ownerData}
                columns={ownerColumns}
                pageSizeOptions={[5, 10, 20]}
                pagination
                autoHeight
              />
            </div>
          ) : (
            <div className="no-data">No shop owner data available.</div>
          )}
        </AccordionDetails>
      </StyledAccordion>

      {/* Information Table */}
      <StyledAccordion>
        <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Buyer Information</Typography>
        </StyledAccordionSummary>
        <AccordionDetails>
          {loading ? (
            <div className="loading-indicator">
              Loading buyer information...
            </div>
          ) : infoData.length > 0 ? (
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={infoData}
                columns={infoColumns}
                pageSizeOptions={[5, 10, 20]}
                pagination
                autoHeight
              />
            </div>
          ) : (
            <div className="no-data">No buyer information available.</div>
          )}
        </AccordionDetails>
      </StyledAccordion>
    </div>
  );
};

export default Icecream;
