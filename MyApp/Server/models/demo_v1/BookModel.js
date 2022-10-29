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

let Book = mongoose.model("Book", bookSchema);

module.exports = { Book };