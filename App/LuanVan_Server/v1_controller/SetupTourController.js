const SetupTour = require("../v1_model/SetupTour");

const SetupTourController = {
  // ADD
  addSetupTour: async (req, res) => {
    try {
      const newSetup = new SetupTour(req.body);

      // Save DB
      const yc = await newSetup.save();
      res.status(200).json(yc);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Delete
  deleteSetup: async (req, res) => {
    try {
      await SetupTour.findByIdAndDelete(req.params.id);

      // Save DB
      res.status(200).json("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // update
  updateSetupTour: async (req, res) => {
    try {
      const tour = await SetupTour.findById(req.params.id);
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
      const tour = await SetupTour.find()
        .populate("IDKhachHang")
        .populate("IDChuTour")
        .populate("IDYeuCauTour");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get
  getById: async (req, res) => {
    try {
      const tour = await SetupTour.findById(req.params.id)
        .populate("IDKhachHang")
        .populate("IDChuTour")
        .populate("IDYeuCauTour");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all
  getByIdKhachHang: async (req, res) => {
    try {
      const tour = await SetupTour.find({
        IDKhachHang: req.params.id,
      })
        .populate("IDKhachHang")
        .populate("IDChuTour")
        .populate("IDYeuCauTour");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get
  getByIdChuTour: async (req, res) => {
    try {
      const tour = await SetupTour.find({
        IDChuTour: req.params.id,
      })
        .populate("IDKhachHang")
        .populate("IDChuTour")
        .populate("IDYeuCauTour");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get
  getByIdYeuCau: async (req, res) => {
    try {
      const tour = await SetupTour.find({
        IDYeuCauTour: req.params.id,
      })
        .populate("IDKhachHang")
        .populate("IDChuTour")
        .populate("IDYeuCauTour");
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = SetupTourController;
