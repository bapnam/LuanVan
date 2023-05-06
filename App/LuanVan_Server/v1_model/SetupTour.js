const mongoose = require("mongoose");

const SetupTourSchema = new mongoose.Schema(
  {
    IDKhachHang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    IDChuTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NguoiDung",
    },
    IDYeuCauTour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "YeuCauTour",
    },
    ChiTietLichTrinh: {
      type: String,
    },
    GhiChu: {
      type: String,
    },
    TrangThai: {
      type: String,
      default: "DangSetup",
    },
  },
  { timestamps: true }
);

let SetupTour = mongoose.model("SetupTour", SetupTourSchema);

module.exports = SetupTour;
