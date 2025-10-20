const express = require("express");
const router = express.Router();

// Importing all the controller functions
const {
  getAllBooksWithAuthor,
  getAllBooks,
  getBookByBookId,
  getAllIssuedBooks,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book-controller"); 



// GET /books/ -> Get a list of all books
router.get("/", getAllBooks);

// GET /books/issued -> Get a list of all issued books
router.get("/issued", getAllIssuedBooks);

// GET /books/with-authors -> Get a list of all books along with their authors
router.get("/with-authors", getAllBooksWithAuthor);

// GET /books/:bookId -> Get a single book by its custom bookId
router.get("/:bookId", getBookByBookId);

// POST /books/ -> Add a new book to the database
router.post("/", createBook);

// PUT /books/:id -> Update a book by its MongoDB _id
router.put("/:id", updateBook);

// DELETE /books/:id -> Delete a book by its MongoDB _id
router.delete("/:id", deleteBook);


module.exports = router;
