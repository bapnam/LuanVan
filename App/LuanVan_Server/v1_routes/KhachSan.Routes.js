const KhachSanController = require("../v1_controller/KhachSanController");

const router = require("express").Router();

// ADD
router.post("/add", KhachSanController.addKhachSan);

// get all
router.get("/getall", KhachSanController.getAll);
// get by id
router.get("/getbyid/:id", KhachSanController.getByID);
// get by id
router.get("/getbycity/:tp", KhachSanController.getByCity);

// update
router.put("/update/:id", KhachSanController.updateKhachSan);

// delete
router.delete("/delete/:id", KhachSanController.deleteKhachSan);

module.exports = router;
