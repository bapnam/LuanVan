const mongooes = require("mongoose");

const hoaDonSchema = new mongooes.Schema(
  {
    SoHoaDon: {
      type: Number,
    },
    NhanVien_ID: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "NhanVien",
    },
    KhachHang_ID: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "KhachHang",
    },
    HoTen: {
      type: String,
    },
    SDT: {
      type: String,
    },
    DiaChi: {
      type: {
        TinhTP: { type: String },
        QuanHuyen: { type: String },
        XaPhuong: { type: String },
      },
    },
    SanPham: [
      {
        SanPham_ID: {
          type: mongooes.Schema.Types.ObjectId,
          ref: "SanPham",
        },
        TenSanPham: {
          type: String,
        },
        SoLuong: {
          type: Number,
        },
        GiaBan: {
          type: Number,
        },
      },
    ],
    PhuongThuc_TT: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "PhuongThucThanhToan",
    },
    TongTien: {
      type: Number,
    },
  },
  { timestamps: true }
);

let HoaDon = mongooes.model("HoaDon", hoaDonSchema);

module.exports = HoaDon;
