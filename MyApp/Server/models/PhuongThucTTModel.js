const mongoose = require("mongoose");

const phuongThucTT = new mongoose.Schema(
  {
    TenPhuongThuc: {
      type: String,
    },
    MoTa: {
      type: String,
    },
    TrangThai: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

let PTTT = mongoose.model("PhuongThucThanhToan", phuongThucTT);

module.exports = PTTT;
