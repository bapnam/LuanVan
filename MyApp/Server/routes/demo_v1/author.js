const authorController = require("../controllers/authorController");
const bookController = require("../controllers/bookController");

const router = require("express").Router();

// ADD AUTHOR
router.post("/", authorController.addAuthor);

// GET ALL AUTHORS
router.get("/", authorController.getAllAuthor);

// GET A AUTHOR
router.get("/:id", authorController.getAAuthor);

// UPDATE AUTHOR
router.put("/:id", authorController.updateAuthor)

// DELETE AUTHOR
router.delete("/:id", authorController.deleteAuthor);

//
module.exports = router;