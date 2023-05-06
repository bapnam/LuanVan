const mongoose = require("mongoose");

// Create Nhan Vien Schema
const NhanVienSchema = new mongoose.Schema(
  {
    HoTen: {
      type: String,
      required: true,
    },
    NgaySinh: {
      type: String,
      required: true,
    },
    SDT: {
      type: String,
      required: true,
      // unique: true,
    },
    DiaChi: [
      {
        TenDiaChi: { type: String, default: "Địa Chỉ 1" },
        TinhTP: { type: String },
        QuanHuyen: { type: String },
        XaPhuong: { type: String },
        ChiTiet: { type: String },
      },
    ],
    GioiTinh: {
      type: String,
      // required: true,
    },
    CMND: {
      type: String,
      required: true,
      // unique: true,
      pattern: "[0-9]",
    },
    Email: {
      type: String,
      required: true,
    },
    MatKhau: {
      type: String,
      required: true,
      // minlength: 6,
    },
    Quyen: {
      type: String,
      // required: true,
      default: "NhanVien",
    },
  },
  { timestamps: true }
);
let NhanVien = mongoose.model("NhanVien", NhanVienSchema);

module.exports = NhanVien;
