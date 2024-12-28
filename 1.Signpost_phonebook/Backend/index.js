const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//Mysql Database Connection establish
const db = mysql.createPool({
  host: "localhost",
  user: "celfon5g_phonebookadmin",
  password: "PdVbHjFY!!ty",
  database: "celfon5g_ClientDatabase",
  connectionLimit: 10, // Set an appropriate limit for concurrent connections
  connectTimeout: 10000, // 10 seconds
  acquireTimeout: 10000, // 10 seconds
});

db.on("error", (err) => {
  console.error("Database error:", err);
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.log("Re-establishing database connection...");
  }
});

app.get("/", (req, res) => {
  return res.json("From backend");
});

app.get("/clients", (req, res) => {
  const sql = "SELECT * FROM signpostphonebookdata";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(3001, () => {
  console.log("Server Running on portal 3001");
});
