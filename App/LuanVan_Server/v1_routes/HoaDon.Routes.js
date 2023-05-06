const HoaDonController = require("../v1_controller/HoaDonController");

const router = require("express").Router();

// ADD
router.post("/add", HoaDonController.addHoaDon);

// get all
router.get("/getall", HoaDonController.getAll);
// get by id hoa don
router.get("/getbyidhoadon/:id", HoaDonController.getByIDHoaDon);
// get by id nguoidung
router.get("/getbyidkhachhang/:idkhachhang", HoaDonController.getByIDNguoiDung);
// get by ma hoa don
router.get("/getbymahoadon/:mahoadon", HoaDonController.getByMaHoaDon);
// get
router.get("/getallbyidchutour/:id", HoaDonController.getByIdChuTour)

// update
router.put("/update/:id", HoaDonController.updateHoaDon);

// delete
router.delete("/delete/:id", HoaDonController.deleteHoaDon);

module.exports = router;
