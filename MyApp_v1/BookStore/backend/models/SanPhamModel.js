const mongoose = require("mongoose");

const sanPhamSchema = new mongoose.Schema(
  {
    TenSanPham: {
      type: String,
    },
    NXB: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NXB",
    },
    TacGia: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TacGia",
      },
    ],
    SoLuong: {
      type: Number,
    },
    LoaiSach: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoaiSach",
      },
    ],
    Gia: {
      type: Number,
    },
    HinhAnh: {
      type: String,
    },
    MoTa: {
      type: String,
    },
  },
  { timestamps: true }
);

let SanPham = mongoose.model("SanPham", sanPhamSchema);

module.exports = SanPham;
