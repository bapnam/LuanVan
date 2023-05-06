const NhanVienController = require("../v1_controller/NhanVienControler")

const router = require("express").Router();

// ADD
router.post("/add", NhanVienController.addNhanVien);

// dang nhap
router.post("/dangnhap", NhanVienController.dangNhap);

// get all
router.get("/getall", NhanVienController.getall)

// get one
router.get("/getone/:id", NhanVienController.getOne)

// delete
router.delete("/delete/:id", NhanVienController.deleteNhanVien)


module.exports = router;