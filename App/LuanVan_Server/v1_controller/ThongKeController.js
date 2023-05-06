const nguoidungModel = require("../v1_model/NguoiDungModel");
const HoaDonModel = require("../v1_model/HoaDonModel");
const TourModel = require("../v1_model/TourModel");

const bcrypt = require("bcrypt");

const ThongKeController = {
  // Thong ke
  //
  TongDoanhThu: async (req, res) => {
    try {
      let sum = 0;
      const dsHD = await HoaDonModel.find({ IDKhachHang: req.params.id });

      if (dsHD.length > 0) {
        for (let i = 0; i < dsHD.length; i++) {
          sum += dsHD[i].TongTien;
        }
      }

      console.log("SUML: ", sum);
      res.status(200).json(sum);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // tong doanh thu theo ngay
  TongDoanhThuTheoNgay: async (req, res) => {
    try {
      // 05-12-2022
      const arrDate = req.body.Ngay.split("-"); // dd,MM,yyyy
      const gteDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
      const ltDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0] + 1);

      const hd = await HoaDonModel.find({
        createdAt: { $gte: gteDate, $lt: ltDate },
      })
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour");

      const list = [];
      for (let i = 0; i < hd.length; i++) {
        if (req.params.id == hd[i].IDTour.ChuTour) {
          await list.push(hd[i]);
        }
      }

      //   const dsHD = await HoaDonModel.find({
      //     IDKhachHang: req.params.id,
      //     createdAt: { $gte: gteDate, $lt: ltDate },
      //   });

      let sum = 0;
      if (list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          sum += list[i].TongTien;
        }
      }

      console.log("SUML: ", sum);
      res.status(200).json(sum);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // thong ke all
  thongKeAllChuTour: async (req, res) => {
    //----------
    // Yeu cau ngay hom nay
    try {
      // 05-12-2022
      const arrDate = req.body.Ngay.split("-"); // dd,MM,yyyy
      const gteDateBe7 = new Date(arrDate[2], arrDate[1] - 1, arrDate[0] - 7);

      const gteDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0]);
      const ltDate = new Date(arrDate[2], arrDate[1] - 1, arrDate[0] + 1);

      // list bai dang theo chu tour
      const listBaiDang = await TourModel.find({ ChuTour: req.params.id });

      //Hóa đơn ngày hôm nay
      const hd = await HoaDonModel.find({
        createdAt: { $gte: gteDate, $lt: ltDate },
      })
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour");

      // Hóa đơn trong 7 ngày
      const hdIn7d = await HoaDonModel.find({
        createdAt: { $gte: gteDateBe7, $lt: ltDate },
      })
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour");

      // danh sach tat ca hoa don
      const allHD = await HoaDonModel.find()
        .populate("IDKhachHang", ["HoTen"])
        .populate("IDTour");

      //Tong doanh thu
      let allSum = 0;
      for (let i = 0; i < allHD.length; i++) {
        if (req.params.id == allHD[i].IDTour.ChuTour) {
          allSum += allHD[i].TongTien;
        }
      }

      // tổng trên ngày
      let sum = 0;
      for (let i = 0; i < hd.length; i++) {
        if (req.params.id == hd[i].IDTour.ChuTour) {
          sum += hd[i].TongTien;
        }
      }

      // tổng của 7 ngày qua
      let sum7 = 0;
      for (let i = 0; i < hdIn7d.length; i++) {
        if (req.params.id == hdIn7d[i].IDTour.ChuTour) {
          sum7 += hdIn7d[i].TongTien;
        }
      }

      let sumTourDaBan = 0;
      for (let i = 0; i < listBaiDang.length; i++) {
        for (let j = 0; j < allHD.length; j++) {
          if (allHD[j].IDTour._id.equals(listBaiDang[i]._id)) {
            sumTourDaBan += 1;
          }
        }
      }

      const ketqua = {
        TongDoanhThu: allSum,
        TongHomNay: sum,
        TongBayNgay: sum7,
        TongTourDaBanL: sumTourDaBan,
        SoLuongBaiDang: listBaiDang.length,
      };
      res.status(200).json(ketqua);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = ThongKeController;

////////
//   const nguoiDung = await nguoidungModel.find();
//   var allList = [];
//   var tour;
//   var hoaDon;

//  const tour = await TourModel.find({ ChuTour: req.params.id });
//   for (var i = 0; i < nguoiDung.length; i++) {
//     for (var j = 0; j < tour.length; j++) {
//       hoaDon = await HoaDonModel.find({ IDTour: tour[j].id });
//       allList.push({
//         // ChuTour: nguoiDung[i].HoTen,
//         Tour: tour[j].DiaDiem,
//         amount: hoaDon ? hoaDon.length : 0,
//       });
//     }
//   }

//   const t = allList.sort((a, b) => b.amount - a.amount);
// res.status(200).json(t);
/////////////
