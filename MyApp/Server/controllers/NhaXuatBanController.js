const NXBModel = require("../models/NhaXuatBanModel");

const nxbController = {
  // ADD NXB
  addNXB: async (req, res) => {
    try {
      const newNXB = new NXBModel(req.body);
      const saveNXB = await newNXB.save();
      res.status(200).json(saveNXB);
    } catch (error) {
      console.log(error);
      res.status(500).json("Loi them NXB", error);
    }
  },
};

module.exports = nxbController;
