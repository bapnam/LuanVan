const LoaiTourController = require("../v1_controller/LoaiTourController")

const router = require("express").Router();

// ADD
router.post("/add", LoaiTourController.addLoaiTour);

// get all
router.get("/getall", LoaiTourController.getAllLoaiTour);

module.exports = router;