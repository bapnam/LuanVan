const { Author, Book } = require("../models/model");

const bookController = {
  // ADD BOOK
  addBook: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const saveBook = await newBook.save();
      if (req.body.author) {
        const author = await Author.findById(req.body.author);
        await author.updateOne({ $push: { book: saveBook._id } }); // push vi la array
        // cach khac cua update
        // await author.book.push(newBook._id);
        // await author.save();
      }
      res.status(200).json(saveBook);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET ALL BOOK
  getAllBook: async (req, res) => {
    try {
      const book = await Book.find();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json("error");
    }
  },

  // GET A BOOK
  getABook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id).populate("author");
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json("error");
    }
  },

  //UPDATE BOOK
  updateBook: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      await book.updateOne({ $set: req.body });
      res.status(200).json("Updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE BOOK
  deleteBook: async (req, res) => {
    try {
      await Author.updateMany(
        { book: req.params.id },
        { $pull: { book: req.params.id } } // pull vi co array
      );
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted");
    } catch (error) {
      req.status(500).json(error);
    }
  },
};

module.exports = bookController;
