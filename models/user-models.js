const mongoose = require("mongoose");

// 1. Defining the schema for the user
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // It's good practice to make emails unique
    },
    userId: {
      type: Number,
 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// The first argument 'User' is the name of the collection in the database.
module.exports = mongoose.model("User", userSchema);
