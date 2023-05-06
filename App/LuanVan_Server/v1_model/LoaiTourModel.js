const mongoose = require("mongoose");

const LoaiTourSchema = new mongoose.Schema(
  {
    TenLoaiTour: {
      type: String,
    },
    dsTours: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
  },
  { timestamps: true }
);

let LoaiTour = mongoose.model("LoaiTour", LoaiTourSchema);

module.exports = LoaiTour;
