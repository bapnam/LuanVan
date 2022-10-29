const { Author, Book } = require("../models/model");

const authorController = {
  // ADD AUTHOR
  addAuthor: async (req, res) => {
    try {
      const newAuthor = new Author(req.body);
      const saveAuthor = await newAuthor.save();
      res.status(200).json(`Them author thanh cong \n ${saveAuthor}`);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET ALL AUTHOR
  getAllAuthor: async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json("Khong lay duoc tat ca tac gia");
    }
  },

  // GET AN AUTHOR
  getAAuthor: async (req, res) => {
    try {
      const author = await Author.findById(req.params.id).populate("book");
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // UPDATE AUTHOR
  updateAuthor: async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      await author.updateOne({ $set: req.body });
      res.status(200).json("Updated");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE AUTHOR
  deleteAuthor: async (req, res) => {
    try {
      await Book.updateMany({ author: req.params.id }, { author: null });
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted");
    } catch (error) {
      req.status(500).json(error);
    }
  },
};

module.exports = authorController;
