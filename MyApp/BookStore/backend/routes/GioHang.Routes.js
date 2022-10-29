const gioHangController = require("../controllers/GioHangController");

const router = require("express").Router();

// ADD
router.post("/add", gioHangController.addGioHang);


//LOG---
module.exports = router;