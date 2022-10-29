const gioHangModel = require("../models/GioHangModel");

const gioHangController = {
  // ADD
  addGioHang: async (req, res) => {
    try {
      const newGH = new gioHangModel(req.body);
      const save = await newGH.save();
      res.status(200).json(save);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = gioHangController;
