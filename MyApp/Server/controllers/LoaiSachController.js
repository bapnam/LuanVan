const loaiSachModel = require("../models/LoaiSachModel");

const loaiSachController = {
  // ADD Loai Sach
  addLoaiSach: async (req, res) => {
    try {
      const newLoaiSach = new loaiSachModel(req.body);
      const saveLoaiSach = await newLoaiSach.save();
      res.status(200).json(saveLoaiSach);
    } catch (error) {
      console.log(error);
      res.status(500).json("Loi them loai sach", error);
    }
  },
};

module.exports = loaiSachController;
