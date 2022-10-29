const hoaDonModel = require("../models/HoaDongModel");

const hoaDonController = {
  // ADD 
  addHoaDon: async (req, res) => {
    try {
      const newHD = new hoaDonModel(req.body);
      const save = await newHD.save();
      res.status(200).json(save);
    } catch (error) {
      console.log(error);
      res.status(500).json("Loi them", error);
    }
  },
};

module.exports = hoaDonController;