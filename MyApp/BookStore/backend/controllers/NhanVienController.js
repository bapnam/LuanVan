const NhanVienModel = require("../models/NhanVienModel");
const bcrypt = require("bcrypt");

//
const nhanVienController = {
  // ADD
  addNhanVien: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.MatKhau, salt);

      // Create new Nhan Vien
      const newNV = await new NhanVienModel({
        MaSoNV: req.body.MaSoNV,
        HoTen: req.body.HoTen,
        NgaySinh: req.body.NgaySinh,
        SDT: req.body.SDT,
        DiaChi: req.body.DiaChi,
        GioiTinh: req.body.GioiTinh,
        CMND: req.body.CMND,
        Email: req.body.Email,
        MatKhau: hashed,
        Quyen: req.body.Quyen,
      });

      // Save DB
      const NV = await newNV.save();
      res.status(200).json(NV);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  dangnhap: async (req, res) => {
    try {
      const nv = await NhanVienModel.findOne({ CMND: req.body.CMND });
      if (!nv) {
        return res.status(404).json("1"); //Khong tim thay nguoi dung!!!
      }

      const pwd = await bcrypt.compare(req.body.MatKhau, nv.MatKhau);
      if (!pwd) {
        return res.status(404).json("0"); //Sai mat khau!!!
      }

      if (nv && pwd) {
        return res.status(200).json("2"); // Cho phep dang nhap
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get ALL Nhan Vien
  getAllNhanVien: async (req, res) => {
    try {
      const nv = await NhanVienModel.find();

      res.status(200).json(nv);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // DELETE NHAN VIEN
  deleteNhanVien: async (req, res) => {
    try {
      const nv = await NhanVienModel.find({ CMND: req.params.CMND });
      res.status(200).json(nv);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = nhanVienController;
