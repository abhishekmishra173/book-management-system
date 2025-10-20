const { get } = require("mongoose");
const Book = require("./book-models");
const User = require("./user-models");require("../controllers/book-controller");

module.exports = {
  Book,
  User,

};
