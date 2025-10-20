const Book = require("../models/book-models");
const User = require("../models/user-models");

exports.getAllIssuedBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the book
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if book is already issued
    if (book.isIssued) {
      return res.status(400).json({
        success: false,
        message: "Book is already issued to someone",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if user already has a book
    if (user.issuedBook) {
      return res.status(400).json({
        success: false,
        message: "User already has a book issued",
      });
    }

    // Issue the book
    book.isIssued = true;
    book.issuedTo = user._id;
    book.issuedDate = new Date();
    book.returnDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days from now
    await book.save();

    // Update user
    user.issuedBook = book._id;
    user.issuedDate = book.issuedDate;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Book issued successfully",
      data: { book, user },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while issuing book",
      error: error.message,
    });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    // Find the book
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if book is issued
    if (!book.isIssued) {
      return res.status(400).json({
        success: false,
        message: "Book is not issued to anyone",
      });
    }

    // Check if book is issued to the same user
    if (book.issuedTo.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "This book is not issued to this user",
      });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return the book
    book.isIssued = false;
    book.issuedTo = null;
    book.issuedDate = null;
    book.returnDate = null;
    await book.save();

    // Update user
    user.issuedBook = null;
    user.issuedDate = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
      data: { book, user },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while returning book",
      error: error.message,
    });
  }
};
