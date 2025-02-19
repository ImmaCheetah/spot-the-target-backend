require("dotenv").config();
const db = require("../db/queries");

function getHomePage(req, res, next) {
  res.json({
    title: "Home Page",
    status: 200,
    message: "success",
  });
}

module.exports = {
  getHomePage,
};
