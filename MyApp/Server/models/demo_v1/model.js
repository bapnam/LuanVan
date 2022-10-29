const mongoose = require("mongoose");

// Create Book Schema
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
});

// Create Author Schema
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  book: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

let Book = mongoose.model("Book", bookSchema);
let Author = mongoose.model("Author", authorSchema);

module.exports = { Book, Author };
