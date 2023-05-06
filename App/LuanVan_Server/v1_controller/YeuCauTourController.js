const YeuCauTour = require("../v1_model/YeuCauTour");

const YeuCauTourController = {
  // ADD
  addYeuCauTour: async (req, res) => {
    try {
      const newYeuCau = new YeuCauTour(req.body);

      // Save DB
      const yc = await newYeuCau.save();
      res.status(200).json(yc);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Delete
  deleteYeuCau: async (req, res) => {
    try {
      await YeuCauTour.findByIdAndDelete(req.params.id);

      // Save DB
      res.status(200).json("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // update
  updateYeuCauTour: async (req, res) => {
    try {
      const tour = await YeuCauTour.findById(req.params.id);
      await tour.updateOne({ $set: req.body });
      res.status(200).json("updated");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all
  getAll: async (req, res) => {
    try {
      const tour = await YeuCauTour.find().populate("IDKhachHang");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all
  getAllById: async (req, res) => {
    try {
      const tour = await YeuCauTour.find({
        IDKhachHang: req.params.id,
      }).populate("IDKhachHang");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = YeuCauTourController;
