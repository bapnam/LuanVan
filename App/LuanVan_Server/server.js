const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

const HoaDonRouter = require("./v1_routes/HoaDon.Routes");
const KhachSanRouter = require("./v1_routes/KhachSan.Routes");
const LoaiTourRouter = require("./v1_routes/LoaiTour.Routes");
const NguoiDungRouter = require("./v1_routes/NguoiDung.Routes");
const NhanVienRouter = require("./v1_routes/NhanVien.Routes");
const TourRouter = require("./v1_routes/Tour.Routes");
const ThongKeRouter = require("./v1_routes/ThongKe.Routes");
const YeuCauTour = require("./v1_routes/YeuCauTour.Routes");
const SetupTour = require("./v1_routes/SetupTour.Routes");

const classa = require("./v1_routes/class.Routes")
const class1 = require("./v1_routes/classes.Routes")

//LOG---
//
const app = express();
const port = 9000;

app.use("/publics", express.static("publics"));

// dotenv
dotenv.config();

//
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// app.use('/publics', express.static('publics'))

//LOG--- CONNECT MONGOO DB
//
mongoose.connect(process.env.MONGODB_URL, { dbName: "LuanVan" }, () => {
  try {
    console.log("--- Connected to MongoDB!");
  } catch (error) {
    console.log("MongoDB: ", error);
  }
});

//LOG--- ROUTES
//

app.use("/v1/hoadon", HoaDonRouter);
app.use("/v1/khachsan", KhachSanRouter);
app.use("/v1/loaitour", LoaiTourRouter);
app.use("/v1/nguoidung", NguoiDungRouter);
app.use("/v1/nhanvien", NhanVienRouter);
app.use("/v1/tour", TourRouter);
app.use("/v1/thongke", ThongKeRouter);
app.use("/v1/yeucautour", YeuCauTour);
app.use("/v1/setuptour", SetupTour);

app.use("/v1/class", classa)
app.use("/v1/class1", class1)


//LOG---
//
app.listen(port, () => {
  console.log("--- Server is running port " + port + "...");
});
