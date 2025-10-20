const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema(
  {
    name: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
    publisher: { type: String, required: true },
    isIssued: { type: Boolean, default: false },
    issuedTo: { type: Schema.Types.ObjectId, ref: "User" },
    issuedDate: Date,
    returnDate: Date,
  },
  { timestamps: true }
);


module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);
