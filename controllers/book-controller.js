const Book = require("../models/book-models");
const BookDto = require("../dtos/book-dto.js");


const getAllBooksWithAuthor = (req, res) => {
  res.send("This is a placeholder for getting books with authors.");
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    if (books.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books found",
      });
    }
      const booksDto = books.map((book) => new BookDto(book));

    return res.status(200).json({
      success: true,
      message: "Books list found",
      data: booksDto,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching books",
      error: error.message,
    });
  }
};

const getBookByBookId = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findOne({ bookId: parseInt(bookId) });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const bookDto = new BookDto(book);

    return res.status(200).json({ message: "Book found", data: bookDto });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching book", error: error.message });
  }
};

const getAllIssuedBooks = async (req, res) => {
  try {
    const issuedBooks = await Book.find({ isIssued: true }).populate(
      "issuedTo",
      "name issuedDate returnDate"
    );

    if (issuedBooks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No books have been issued yet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "List of issued books",
      data: issuedBooks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while fetching issued books",
      error: error.message,
    });
  }
};

const createBook = async (req, res) => {
  try {
    const { name, author, genre, price, publisher } = req.body;

    if (!name || !author || !genre || !price || !publisher) {
      return res.status(400).json({
        success: false,
        message:
          "All fields (name, author, genre, price, publisher) are required",
      });
    }

    const newBook = await Book.create({
      name,
      author,
      genre,
      price,
      publisher,
    });

    return res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: newBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while adding book",
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No data provided for update",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating book",
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting book",
      error: error.message,
    });
  }
};

// --- EXPORTING ALL FUNCTIONS IN A SINGLE OBJECT AT THE END ---

module.exports = {
  getAllBooksWithAuthor,
  getAllBooks,
  getBookByBookId,
  getAllIssuedBooks,
  createBook,
  updateBook,
  deleteBook,
};
