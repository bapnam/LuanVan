const mongoose = require("mongoose");

const gioHang = new mongoose.Schema({
  KhachHang_ID: {
    type: String,
  },
  SanPham: [
    {
      SanPham_ID: {
        type: String,
      },
      SoLuong: {
        type: Number,
        default: 1,
      },
    },
  ],
});

let GioHang = mongoose.model("GioHang", gioHang);

module.exports = GioHang;
