const KhachSanModel = require("../v1_model/KhachSanModel");

const KhachSanController = {
  // ADD
  addKhachSan: async (req, res) => {
    try {
      const ktKhachSan = await KhachSanModel.findOne({ SDT: req.body.SDT });

      if (req.body.TenKhachSan == "") {
        res.status(200).json("Ten Dang Rong");
      } else if (ktKhachSan) {
        res.status(200).json("SDT da co");
      } else {
        const ks = new KhachSanModel(req.body);
        const save = await ks.save();
        res.status(200).json("add");
      }
    } catch (error) {
      console.log("ERR: ", error);
      res.status(500).json(error);
    }
  },

  // delete
  deleteKhachSan: async (req, res) => {
    try {
      const ks = await KhachSanModel.findByIdAndDelete(req.params.id);

      res.status(200).json("deleted");
    } catch (error) {
      console.log("ERR: ", error);
      res.status(500).json(error);
    }
  },

  // update
  updateKhachSan: async (req, res) => {
    try {
      const ks = await KhachSanModel.findById(req.params.id);
      await ks.updateOne(req.body);

      res.status(200).json("updated");
    } catch (error) {
      console.log("ERR: ", error);
      res.status(500).json(error);
    }
  },

  // get all
  getAll: async (req, res) => {
    try {
      const ks = await KhachSanModel.find();

      res.status(200).json(ks);
    } catch (error) {
      console.log("ERR: ", error);
      res.status(500).json(error);
    }
  },

  // get by id
  getByID: async (req, res) => {
    try {
      const ks = await KhachSanModel.findById(req.params.id);

      res.status(200).json(ks);
    } catch (error) {
      console.log("ERR: ", error);
      res.status(500).json(error);
    }
  },

  // get by Thanh pho
  getByCity: async (req, res) => {
    try {
      const ks = await KhachSanModel.find({
        "DiaChi.TinhTP": req.params.tp,
      });

      res.status(200).json(ks);
    } catch (error) {
      console.log("ERR: ", error);
      res.status(500).json(error);
    }
  },
};

module.exports = KhachSanController;
