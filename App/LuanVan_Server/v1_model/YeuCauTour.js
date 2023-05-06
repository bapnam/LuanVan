const mongoose = require("mongoose");

const YeuCauTourSchema = new mongoose.Schema(
  {
    IDKhachHang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    DiaDiem: {
      type: String,
    },
    SoLuongKhach: {
      type: Number,
    },
    NgayKhoiHanh: {
      type: String,
    },
    SoNgayDi: {
      type: Number,
    },
    // YeuCauKhac: {
    //   type: String,
    // },
    GhiChu: {
      type: String,
    },
    TrangThai: {
        type: String,
        default: "DangYeuCau"
    }
  },
  { timestamps: true }
);

let YeuCauTour = mongoose.model("YeuCauTour", YeuCauTourSchema);

module.exports = YeuCauTour;
