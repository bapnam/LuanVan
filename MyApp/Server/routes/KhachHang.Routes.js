const khachHangController = require("../controllers/KhachHangController");

const router = require("express").Router();

// ADD KHACH HANG
router.post("/add", khachHangController.addKhachHang);

module.exports = router;