const mongoose = require("mongoose");

// Create Khach Hang Schema
const NguoiDungSchema = new mongoose.Schema(
  {
    HoTen: {
      type: String,
      required: true,
    },
    NgaySinh: {
      type: String,
    },
    SDT: {
      type: String,
      required: true,
      unique: true,
      length: 10,
    },
    DiaChi: [
      {
        TenDiaChi: { type: String, default: "Home" },
        TinhTP: { type: String },
        QuanHuyen: { type: String },
        XaPhuong: { type: String },
        ChiTiet: { type: String },
      },
    ],
    GioiTinh: {
      type: String,
    },
    Email: {
      type: String,
      required: true,
    },
    CMND: {
      type: String,
      // unique: true,
      // pattern: "[0-9]",
    },
    MatKhau: {
      type: String,
      required: true,
      minlength: 6,
    },
    YeuThich: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
    LichSu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HoaDon",
      },
    ],
    Quyen: {
      type: String,
      default: "MUA",
    },
  },
  { timestamps: true }
);

let NguoiDung = mongoose.model("NguoiDung", NguoiDungSchema);

module.exports = NguoiDung;
