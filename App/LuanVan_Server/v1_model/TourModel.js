const mongoose = require("mongoose");

// Create Nhan Vien Schema
const TourSchema = new mongoose.Schema(
  {
    ChuTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    TieuDe: {
      // Hiển thị tiêu đề
      type: String,
    },
    LoaiTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LoaiTour",
    },
    MoTa: {
      // Thông tin địa điểm mo ta
      type: String,
    },
    DiaDiem: {
      // Địa điểm hiển thị trên card di den
      type: String,
    },
    ThanhPho: {
      // thanh pho den
      type: String,
    },
    LichTrinh: {
      // lich trinh
      type: String,
    },

    //
    // NguoiHuongDan: {
    //   // nguoi huong dan
    //   type: String,
    // },

    // Số lượng khách tối đa
    SoluongKHmax: {
      type: Number,
    },

    SoLuongCon: {
      type: String
    },

    // // Số lượng tối thiểu
    // SoLuongKHmin: {
    //   type: Number,
    // },
    // //
    // SoLuongTour: [
    //   {
    //     type: Number,
    //   },
    // ],
    ///
    SoNgay: {
      // So ngay di dự kiến
      type: Number,
    },
    Gia: {
      // Giá tour / ngày
      type: Number,
    },
    email: {
      // email nguoi dang tour
      type: String,
    },
    SDT: {
      // sdt nguoi dang tour
      type: String,
    },
    HinhAnh: {
      // Hình ảnh hiển thị
      type: String,
    },
  },
  { timestamps: true }
);
let Tour = mongoose.model("Tour", TourSchema);

module.exports = Tour;
