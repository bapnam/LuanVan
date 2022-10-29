const loaiSachController = require("../controllers/LoaiSachController");

const router = require("express").Router();

// ADD Loai Sach
router.post("/add", loaiSachController.addLoaiSach);


//LOG---
module.exports = router;