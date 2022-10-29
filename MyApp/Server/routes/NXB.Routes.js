const nxbController = require("../controllers/NhaXuatBanController");

const router = require("express").Router();

// ADD NXB
router.post("/add", nxbController.addNXB);


//LOG---
module.exports = router;