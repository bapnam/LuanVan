const LoaiTour = require("../v1_model/LoaiTourModel");
const TourModel = require("../v1_model/TourModel");

const TourController = {
  // ADD
  addTour: async (req, res) => {
    try {
      const newTour = new TourModel(req.body);

      if (req.file) {
        var nameImg = req.file.originalname;
        newTour.HinhAnh = nameImg;
      }
      // Save DB
      const tour = await newTour.save();
      // add to loai tour
      if (req.body.LoaiTour) {
        const lt = LoaiTour.findById(req.body.LoaiTour);
        await lt.updateOne({ $push: { dsTours: tour._id } });
      }
      res.status(200).json(tour);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // delete
  deleteTour: async (req, res) => {
    try {
      await LoaiTour.updateMany(
        { dsTours: req.params.id },
        { $pull: { dsTours: req.params.id } }
      );
      await TourModel.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // update
  updateTour: async (req, res) => {
    try {
      const tour = await TourModel.findById(req.body._id);
      await tour.updateOne({ $set: req.body });
      res.status(200).json("updated");      
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Tim Kiem
  searchTour: async (req, res) => {
    try {
      switch (req.body.status) {
        case "TieuDe": {
          break;
        }

        default: {
          // mac dinh khi k co status
          res.status(200).json("noSearch");
          break;
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all
  getAll: async (req, res) => {
    try {
      const all = await TourModel.find()
        .populate("LoaiTour", ["TenLoaiTour"])
        .sort({ createdAt: -1 });
      res.status(200).json(all);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getOnebyID: async (req, res) => {
    try {
      const one = await TourModel.findById(req.params.id);
      res.status(200).json(one);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get by list id
  getByList: async (req, res) => {
    try {
      const list = [];
      for (let i = 0; i < req.body.length; i++) {
        let one = await TourModel.findById(req.body[i]);
        await list.push(one);
      }
      res.status(200).json(list);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  //// get by id chu tour
  getByIDChuTour: async (req, res) => {
    try {
      const t = await TourModel.find({ ChuTour: req.params.id }).sort({createdAt: -1});
      res.status(200).json(t);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = TourController;
