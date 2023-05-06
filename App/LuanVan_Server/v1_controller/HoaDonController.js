const hoadonModel = require("../v1_model/HoaDonModel");
const NguoiDung = require("../v1_model/NguoiDungModel");

const HoaDonController = {
  // ADD
  addHoaDon: async (req, res) => {
    try {
      const dsHoaDon = await hoadonModel.find();
      // Lay ngay (DD/MM/YYYY), tach /, dao nguoc, gop lai
      const d = new Date()
        .toLocaleDateString("en-GB")
        .split("/")
        .reverse()
        .join("");
      const maHoaDon =
        d +
        "HD" +
        (Math.floor(Math.random() * 10000) + 1) +
        "L" +
        (dsHoaDon.length + 1);

      const newHD = new hoadonModel(req.body);
      newHD.MaHoaDon = maHoaDon;

      // Save DB
      const HD = await newHD.save();

      const nd = await NguoiDung.findById(req.body.IDKhachHang);
      await nd.updateOne({ $push: { LichSu: HD._id } });

      res.status(200).json(HD);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // update
  updateHoaDon: async (req, res) => {
    try {
      const hd = await hoadonModel.findById(req.params.id);
      await hd.updateOne({ $set: req.body });

      res.status(200).json("updated");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // delete
  deleteHoaDon: async (req, res) => {
    try {
      await NguoiDung.updateMany(
        { LichSu: req.params.id },
        { $pull: { LichSu: req.params.id } } // pull vi co array
      );
      await hoadonModel.findByIdAndDelete(req.params.id);

      res.status(200).json("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all
  getAll: async (req, res) => {
    try {
      const allHD = await hoadonModel
        .find()
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour")
        .sort({ createdAt: -1 });
      res.status(200).json(allHD);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get by id
  getByIDHoaDon: async (req, res) => {
    try {
      const hd = await hoadonModel
        .findById(req.params.id)
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour")
        .sort({ createdAt: -1 });

      res.status(200).json(hd);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get by MaHoaDon
  getByMaHoaDon: async (req, res) => {
    try {
      const hd = await hoadonModel
        .find({ MaHoaDon: req.params.mahoadon })
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour")
        .sort({ createdAt: -1 });

      res.status(200).json(hd);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get
  getByIDNguoiDung: async (req, res) => {
    try {
      const hd = await hoadonModel
        .find({ IDKhachHang: req.params.idkhachhang })
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour")
        .sort({ createdAt: -1 });

      res.status(200).json(hd);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get
  getByIdChuTour: async (req, res) => {
    try {
      const hd = await hoadonModel
        .find()
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour")
        .sort({ createdAt: -1 });

      const list = [];
      for (let i = 0; i < hd.length; i++) {
        if (req.params.id == hd[i].IDTour.ChuTour) {
          await list.push(hd[i]);
        }
      }

      res.status(200).json(list);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = HoaDonController;
