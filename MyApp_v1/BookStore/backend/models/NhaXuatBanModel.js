const mongoose = require("mongoose");

const NXBSchema = new mongoose.Schema(
  {
    TenNXB: {
      type: String,
      required: true,
    },
    DiaChi: [
      {
        TenDiaChi: { type: String, default: "Dia Chi 1" },
        TinhTP: { type: String },
        QuanHuyen: { type: String },
        XaPhuong: { type: String },
      },
    ],
    Email: {
      type: String,
    },
    SDT: {
      type: String,
      length: 10,
      required: true,
    },
    SanPham: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "SanPham"
    }]
  },
  { timestamps: true }
);

let NXB = mongoose.model("NXB", NXBSchema);

module.exports = NXB;
