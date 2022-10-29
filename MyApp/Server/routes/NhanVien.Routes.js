const nhanVienController = require("../controllers/NhanVienController");

const router = require("express").Router();

// ADD
router.post("/add", nhanVienController.addNhanVien);

// DANG NHAP
router.post("/dangnhap", nhanVienController.dangnhap);

// GET ALL NHAN VIEN
router.get("/allnhanvien", nhanVienController.getAllNhanVien);

// DELETE NHAN VIEN
router.delete("/deletenhanvien/:CMND", nhanVienController.deleteNhanVien);

module.exports = router;