import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Router, Routes } from "react-router-dom";
import DashBoard from "./Dashboard";
import Edit from "./Edit";
import Counttable from "./Counttable";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Admin() {
  return (
    <div className="admin-container">
      <DashBoard />
    </div>
  );
}
