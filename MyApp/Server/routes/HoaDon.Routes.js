const hoaDonController = require("../controllers/HoaDonController");

const router = require("express").Router();

// ADD 
router.post("/add", hoaDonController.addHoaDon);


//LOG---
module.exports = router;