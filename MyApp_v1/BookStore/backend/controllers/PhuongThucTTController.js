const PTTTModel = require("../models/PhuongThucTTModel");

const PTTTController = {
  // ADD 
  addPTTT: async (req, res) => {
    try {
      const newPTTT = new PTTTModel(req.body);
      const save = await newPTTT.save();
      res.status(200).json(save);
    } catch (error) {
      console.log(error);
      res.status(500).json("CO LOI KHI THEM", error);
    }
  },
};

module.exports = PTTTController;