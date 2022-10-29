const  KhachHangModel  = require("../models/KhachHangModel");

const khachHangController = {
  // ADD KH
  addKhachHang: async (req, res) => {
    try {
      const newKH = new KhachHangModel(
        req.body
      );
      const saveKH = await newKH.save();
      res.status(200).json(saveKH);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
      
    }
  },
};

module.exports = khachHangController;