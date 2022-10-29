const mongoose = require("mongoose");

const tacGia = new mongoose.Schema({
  TenTacGia: {
    type: String,
  },
  NamSinh: {
    type: String,
    required: true,
  },
  NamMat: {
    type: String,
  },
  NoiSinh: {
    type: String,
  },
  ButDanh: {
    type: String,
  },
  TacPham: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SanPham"
    },
  ],
},
{ timestamps: true });

let TacGia = mongoose.model("TacGia", tacGia);

module.exports = TacGia;
