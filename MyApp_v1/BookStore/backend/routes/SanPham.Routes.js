const sanPhamController = require("../controllers/SanPhamController");

const router = require("express").Router();

// ADD NXB
router.post("/add", sanPhamController.addSanPham);

// UPDATE
router.put("/update/:id", sanPhamController.updateSanPham);

//LOG---
module.exports = router;