const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');

const KhachHangRouter = require("./routes/KhachHang.Routes");
const LoaiSachRouter = require("./routes/LoaiSach.Routes");
const NhanVienRouter = require("./routes/NhanVien.Routes");
const NXBRouter = require("./routes/NXB.Routes");
const SanPhamRouter = require("./routes/SanPham.Routes");
const HoaDonRouter = require("./routes/HoaDon.Routes");
const PTTTRouter = require("./routes/PhuongThucTT.Routes");
const TacGiaRouter = require("./routes/TacGia.Routes");
const GioHangRouter = require("./routes/GioHang.Routes");


//LOG---
//
const app = express();
const port = 9000;

// dotenv
dotenv.config();

//
app.use(cors());
app.use(express.json());
app.use(morgan("common"));


//LOG--- CONNECT MONGOO DB
//
mongoose.connect((process.env.MONGODB_URL), {dbName: "BookStore"}, () => {
    try {
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error);
    } 
});


//LOG--- ROUTES 
//
app.use("/v1/khachhang", KhachHangRouter);
app.use("/v1/loaisach", LoaiSachRouter);
app.use("/v1/nhanvien", NhanVienRouter);
app.use("/v1/nxb", NXBRouter);
app.use("/v1/sanpham", SanPhamRouter);
app.use("/v1/hoadon", HoaDonRouter);
app.use("/v1/phuongthucthanhtoan", PTTTRouter);
app.use("/v1/tacgia", TacGiaRouter);
app.use("/v1/giohang", GioHangRouter);



//LOG---
//
app.listen(port, () => {
    console.log("Server is running...");
});



