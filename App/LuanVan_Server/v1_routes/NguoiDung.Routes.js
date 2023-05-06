const NguoiDungController = require("../v1_controller/NguoiDungController");

const router = require("express").Router();

// ADD
router.post("/add", NguoiDungController.addNguoiDung);

// get one
router.post("/dangnhap", NguoiDungController.getOne);

// get user
router.get("/getuser/:id", NguoiDungController.getUser);

// get all
router.get("/getall", NguoiDungController.getAll);

// get all Mua
router.get("/getallmua", NguoiDungController.getAllMua);

// get all Ban
router.get("/getallban", NguoiDungController.getAllBan);

// get yeu thich by id
router.get("/getlike/:id", NguoiDungController.getLike);


// update
router.put("/update/:id", NguoiDungController.updateNguoiDung);

// delete
router.delete("/delete/:id", NguoiDungController.deleteNguoiDung);





module.exports = router;
