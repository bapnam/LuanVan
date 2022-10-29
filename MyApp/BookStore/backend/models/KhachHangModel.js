const mongoose = require("mongoose");

// Create Khach Hang Schema
const KhachHangSchema = new mongoose.Schema(
  {
    MaKH: {
      type: String,
    },
    HoTen: {
      type: String,
      // required: true,
    },
    NgaySinh: {
      type: String,
    },
    SDT: {
      type: String,
      // required: true,
      // unique: true,
      // length: 10,
    },
    DiaChi: [
      {
        TenDiaChi: { type: String, default: "Dia Chi 1" },
        TinhTP: { type: String },
        QuanHuyen: { type: String },
        XaPhuong: { type: String },
      },
    ],
    GioiTinh: {
      type: String,
      // required: true,
    },
    CMND: {
      type: String,
      // required: true,
      // unique: true,
      // // length: 12,
      // pattern: "[0-9]",
    },
    Email: {
      type: String,
    },
    MatKhau: {
      type: String,
      // required: true,
      // minlength: 6,
    },
    TichDiem: {
      type: Number,
      // default: 0
    },
    SoThich: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoaiSach",
      },
    ],
  },
  { timestamps: true }
);

let KhachHang = mongoose.model("KhachHang", KhachHangSchema);

module.exports = KhachHang;
