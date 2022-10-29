const PTTTController = require("../controllers/PhuongThucTTController");

const router = require("express").Router();

// ADD NXB
router.post("/add", PTTTController.addPTTT);


//LOG---
module.exports = router;