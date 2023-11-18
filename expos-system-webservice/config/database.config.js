const Mongoose = require("mongoose");
const debug = require("debug")("app:database");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "expos-system";

const dburi = process.env.DBURI ||
  `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async () => {
  try {
    await Mongoose.connect(dburi);
    debug("Connection to database success");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  connect
}