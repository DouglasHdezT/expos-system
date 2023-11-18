const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const database = require("./config/database.config");

const app = express();
database.connect();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
