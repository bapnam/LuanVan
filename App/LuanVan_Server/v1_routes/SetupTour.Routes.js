const SetupTourController = require("../v1_controller/SetupTourController");

const router = require("express").Router();

// ADD
router.post("/add", SetupTourController.addSetupTour);

// delete
router.delete("/delete/:id", SetupTourController.deleteSetup);

// update
router.put("/update/:id", SetupTourController.updateSetupTour);

// get all
router.get("/getall", SetupTourController.getAll);
router.get("/getbyid/:id", SetupTourController.getById);

// get all by id
router.get("/getbyidkhachhang/:id", SetupTourController.getByIdKhachHang);
router.get("/getbyidchutour/:id", SetupTourController.getByIdChuTour);
router.get("/getbyidyeucau/:id", SetupTourController.getByIdYeuCau);

module.exports = router;
