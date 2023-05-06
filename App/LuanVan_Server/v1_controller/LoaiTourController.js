const LoaiTour = require("../v1_model/LoaiTourModel");

const LoaiTourController = {
  // ADD
  addLoaiTour: async (req, res) => {
    try {
      const newLT = new LoaiTour(req.body)
      
      // Save DB
      const lt = await newLT.save();
      res.status(200).json(lt);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // UPDATE
  //   updateGioHang: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json(error);
  //     }
  //   },

    // GET All
    getAllLoaiTour: async (req, res) => {
      try {
        const all = await LoaiTour.find().populate("dsTours", ["TieuDe"]);
      res.status(200).json(all);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    },

  //   // GET 1
  //   getOneGioHang: async (req, res) => {
  //     try {
  //     } catch (error) {
  //       console.log(error);
  //       res.status(500).json(error);
  //     }
  //   },
};

module.exports = LoaiTourController;
