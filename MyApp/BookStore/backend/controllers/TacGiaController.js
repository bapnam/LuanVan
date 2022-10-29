const tacGiaModel = require("../models/TacGiaModel");

const tacGiaController = {
  // ADD
  addTacGia: async (req, res) => {
    try {
      const newTG = new tacGiaModel(req.body);
      const save = await newTG.save();
      res.status(200).json(save);
    } catch (error) {
      console.log(error);
      res.status(500).json("Loi them", error);
    }
  },
};

module.exports = tacGiaController;
