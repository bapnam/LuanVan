const mongoose = require("mongoose");

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

let Author = mongoose.model("Author", authorSchema);

module.exports = { Author };
