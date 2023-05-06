const mongoose = require("mongoose");

const hoaDonSchema = new mongoose.Schema(
  {
    MaHoaDon: {
      type: String,
    },

    IDKhachHang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    IDTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
    NgayKhoiHanh: {
      type: String,
    },
    SoLuongKhach: {
      type: Number,
    },

    TongTien: {
      type: Number,
    },
    TrangThai: {
      type: String,
      default: "Chưa thanh toán",
    },
  },
  { timestamps: true }
);

let HoaDon = mongoose.model("HoaDon", hoaDonSchema);

module.exports = HoaDon;
