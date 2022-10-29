const mongoose = require("mongoose");

// Create Nhan Vien Schema
const NhanVienSchema = new mongoose.Schema(
  {
    MaSoNV: {
      type: String,
    },
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
        TenDiaChi: { type: String, default: "Dia Chi 1" },
        TinhTP: { type: String, required: true },
        QuanHuyen: { type: String, required: true },
        XaPhuong: { type: String, required: true },
      },
    ],
    GioiTinh: {
      type: String,
      required: true,
    },
    CMND: {
      type: String,
      required: true,
      unique: true,
      length: 12,
      pattern: "[0-9]",
    },
    Email: {
      type: String,
    },
    MatKhau: {
      type: String,
      required: true,
      minlength: 6,
    },
    Quyen: {
      type: String,
    },
  },
  { timestamps: true }
);
let NhanVien = mongoose.model("NhanVien", NhanVienSchema);

module.exports = NhanVien;
