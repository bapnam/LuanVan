const mongoose = require("mongoose");

// Create Loai Sach Schema
const LoaiSachSchema = new mongoose.Schema(
  {
    TenLoaiSach: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let LoaiSach = mongoose.model("LoaiSach", LoaiSachSchema);

module.exports = LoaiSach;
