const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json);

//connecting Mysql database with the configuration
const db = mysql.createConnection({
  host: "localhost",
  user: "celfon5g_phonebookadmin",
  password: "PdVbHjFY!!ty",
  database: "celfon5g_ClientDatabase",
});


app.get("/", (req, res) => {
  return res.json("From Backend");
});

app.get("/clients", (req, res) => {
  const sql = "SELECT * FROM signpostphonebookdata";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.listen(3001, (err) => {
  console.log("Server is running on port 3001.");
});
