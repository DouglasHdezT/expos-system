const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const database = require("./config/database.config");
const fs = require("fs");

const apiRouter = require("./routes/index.router");

const app = express();
database.connect();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'frontend')));

app.use("/api", apiRouter);

//React Router
app.get("/*", (req, res) => {
  res.format({
      html: () => {
          try {
              if (fs.existsSync(path.join(__dirname, 'frontend', 'index.html'))) {
                console.log("Try");
                  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
              } else {
                  res.status(404).sendFile(path.join(__dirname, 'frontend', 'wip.html'));
              }
          } catch (error) {
              res.status(404).sendFile(path.join(__dirname, 'public', 'wip.html'));
          }
      },
      default: () => {
          res.status(404).send({error: "Not Found"});
      }
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;
