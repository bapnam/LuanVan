const YeuCauTourController = require("../v1_controller/YeuCauTourController");

const router = require("express").Router();

// ADD
router.post("/add", YeuCauTourController.addYeuCauTour);

// delete
router.delete("/delete/:id", YeuCauTourController.deleteYeuCau);

// update
router.put("/update/:id", YeuCauTourController.updateYeuCauTour);

// get all
router.get("/getall", YeuCauTourController.getAll);
// get all by id
router.get("/getallbyid/:id", YeuCauTourController.getAllById);


module.exports = router;
