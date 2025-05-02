import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "../Css/Icecream.css";
import { Authcontext } from "./Auth";
import buyerImg from "../assets/images/Buyer.png";
import shopImg from "../assets/images/shop.png";


const Icecream = () => {
  // const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shopData, setShopData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTransactionExpanded, setIsTransactionExpanded] = useState(false);
  const [isOwnerExpanded, setIsOwnerExpanded] = useState(false);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);

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
        className="item"
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
        <FaChevronDown />
      </div>
    ));




  const renderTable = (title, isExpanded, setExpanded, headers, data) => (
    <div>
      <div className="listHeadLine" onClick={() => setExpanded(!isExpanded)}>
        {title}
        {isExpanded ? (
          <FaChevronUp className="icon" />
        ) : (
          <FaChevronDown className="icon" />
        )}
      </div>
      {isExpanded && (
        <div>
          <div className="tableRow header">
            {headers.map((h, idx) => (
              <div key={idx} className="tableCell">
                {h}
              </div>
            ))}
          </div>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <div key={index} className="tableRow">
                {Object.values(item).map((val, idx) => (
                  <div key={idx} className="tableCell">
                    {val}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="noData">No Data Found</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="container">
    <h2 className="listHeadLine">Icecream Specials</h2>
    {renderButtons()}
  
    {/* Transaction Table */}
    <div className="tableSection">
      <div className="listHeadLine" onClick={() => setIsTransactionExpanded(!isTransactionExpanded)}>
        Transaction Table
        {isTransactionExpanded ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
      </div>
      {isTransactionExpanded && (
        <div className="tableWrapper">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : shopData.length > 0 ? (
            <table className="iceTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Shop Owner</th>
                  <th>Customer</th>
                  <th>Count</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {shopData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.id}</td>
                    <td>{row.shop_owner_name}</td>
                    <td>{row.customer_name}</td>
                    <td>{row.count}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="noData">No Data Found</div>
          )}
        </div>
      )}
    </div>
  
    {/* Shop Owner Table */}
    <div className="tableSection">
      <div className="listHeadLine" onClick={() => setIsOwnerExpanded(!isOwnerExpanded)}>
        Shop Owner Table
        {isOwnerExpanded ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
      </div>
      {isOwnerExpanded && (
        <div className="tableWrapper">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : ownerData.length > 0 ? (
            <table className="iceTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Owner Name</th>
                  <th>Total</th>
                  <th>Sold</th>
                  <th>Balance</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {ownerData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.shop_owner_id}</td>
                    <td>{row.shop_owner_name}</td>
                    <td>{row.total_ice_cream}</td>
                    <td>{row.sold_ice_cream}</td>
                    <td>{row.balance_ice_cream}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="noData">No Data Found</div>
          )}
        </div>
      )}
    </div>
  
    {/* Information Table */}
    <div className="tableSection">
      <div className="listHeadLine" onClick={() => setIsInfoExpanded(!isInfoExpanded)}>
        Information Table
        {isInfoExpanded ? <FaChevronUp className="icon" /> : <FaChevronDown className="icon" />}
      </div>
      {isInfoExpanded && (
        <div className="tableWrapper">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : infoData.length > 0 ? (
            <table className="iceTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Buyer ID</th>
                  <th>Buyer Name</th>
                  <th>Buyer Mobile</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {infoData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.user_id}</td>
                    <td>{row.user_name}</td>
                    <td>{row.buyer_id}</td>
                    <td>{row.buyer_name}</td>
                    <td>{row.buyer_mobileno}</td>
                    <td>{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="noData">No Data Found</div>
          )}
        </div>
      )}
    </div>
  </div>
  
  );
};

export default Icecream;