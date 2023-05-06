const TourController = require("../v1_controller/TourController");
const multer = require("multer");
const router = require("express").Router();

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("1111111: ", file);
    cb(null, "publics/images/");
  },
  filename: function (req, file, cb) {
    console.log("LOG1: ", file);
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage });

// ADD
router.post("/add", upload.single("HinhAnh"), TourController.addTour);

// get all
router.get("/getall", TourController.getAll);

// get one
router.get("/getone/:id", TourController.getOnebyID);

// get list
router.post("/getbylist", TourController.getByList);

// get by id chu tour
router.get("/getbyidchutour/:id", TourController.getByIDChuTour);

// update
router.put("/update", TourController.updateTour);

// search
router.get("/timkiem", TourController.searchTour);

// delete
router.delete("/delete/:id", TourController.deleteTour);

module.exports = router;
