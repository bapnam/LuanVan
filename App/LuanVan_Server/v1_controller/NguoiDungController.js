const nguoidungModel = require("../v1_model/NguoiDungModel");
const HoaDonModel = require("../v1_model/HoaDonModel");

const bcrypt = require("bcrypt");

const NguoiDungController = {
  // ADD or register
  addNguoiDung: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.MatKhau, salt);

      // Create NV
      console.log(req.body);
      const newND = await new nguoidungModel(req.body);
      newND.MatKhau = hashed;
      if (req.body.GioiTinh == "") {
        newND.GioiTinh = req.body.GioiTinh.toUpperCase();
      }

      newND.Quyen = req.body.Quyen.toUpperCase();

      // Save DB
      const ND = await newND.save();
      res.status(200).json(ND);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // delete
  deleteNguoiDung: async (req, res) => {
    try {
      await nguoidungModel.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // Get one or dang nhap
  getOne: async (req, res) => {
    try {
      const nd = await nguoidungModel.findOne({ Email: req.body.Email });

      const data = {
        stateLogin: "",
        id: "id",
        HoTen: "",
        NgaySinh: "",
        SDT: "",
        DiaChi: [
          {
            TinhTP: "",
            QuanHuyen: "",
            XaPhuong: "",
            ChiTiet: "",
          },
        ],
        GioiTinh: "",
        Email: "",
        CMND: "",
        YeuThich: [""],
        LichSu: [
          {
            Tour: "",
            TrangThai: "x",
          },
        ],
        Quyen: "",
      };

      if (!nd) {
        data.stateLogin = "NoUser";
        return res.status(200).json(data); //Khong tim thay nguoi dung!!!
      } else {
        const pwd = await bcrypt.compare(req.body.MatKhau, nd.MatKhau);
        if (!pwd) {
          data.stateLogin = "NoPassword";
          return res.status(200).json(data); //Sai mat khau!!!
        }
        if (nd && pwd) {
          data.stateLogin = "Yes";
          data.id = nd._id;
          data.HoTen = nd.HoTen;
          data.NgaySinh = nd.NgaySinh;
          data.SDT = nd.SDT;
          data.DiaChi = nd.DiaChi;
          data.GioiTinh = nd.GioiTinh;
          data.CMND = nd.CMND;
          data.Email = nd.Email;
          data.YeuThich = nd.YeuThich;
          data.LichSu = nd.LichSu;
          data.Quyen = nd.Quyen;

          return res.status(200).json(data); // Cho phep dang nhap
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // update
  updateNguoiDung: async (req, res) => {
    try {
      const nd = await nguoidungModel.findById(req.params.id);
      if (req.body.CurrentPassword) {
        const salt = await bcrypt.genSalt(10);
        const pwd = await bcrypt.compare(req.body.CurrentPassword, nd.MatKhau);

        if (!pwd) {
          return res.status(200).json("NoPassword");
        } else {
          const hashed = await bcrypt.hash(req.body.NewPassword, salt);
          await nd.updateOne({ $set: { MatKhau: hashed } });
        }
      } else if (req.body.YeuThich) {
        if (!req.body.like) {
          await nd.updateOne({ $pull: { YeuThich: req.body.YeuThich } });
        } else {
          console.log(req.body.YeuThich);
          await nd.updateOne({ $push: { YeuThich: req.body.YeuThich } });
        }
      } else {
        await nd.updateOne(req.body);
      }

      res.status(200).json("updated");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get one
  getUser: async (req, res) => {
    try {
      const nd = await nguoidungModel.findById(req.params.id);
      const data = {
        stateLogin: "",
        id: "id",
        HoTen: "",
        NgaySinh: "",
        SDT: "",
        DiaChi: [
          {
            TinhTP: "",
            QuanHuyen: "",
            XaPhuong: "",
            ChiTiet: "",
          },
        ],
        GioiTinh: "",
        Email: "",
        CMND: "",
        YeuThich: [""],
        LichSu: [
          {
            Tour: "",
            TrangThai: "x",
          },
        ],
        Quyen: "",
      };

      data.stateLogin = "Yes";
      data.id = nd._id;
      data.HoTen = nd.HoTen;
      data.NgaySinh = nd.NgaySinh;
      data.SDT = nd.SDT;
      data.DiaChi = nd.DiaChi;
      data.GioiTinh = nd.GioiTinh;
      data.CMND = nd.CMND;
      data.Email = nd.Email;
      data.YeuThich = nd.YeuThich;
      data.LichSu = nd.LichSu;
      data.Quyen = nd.Quyen;

      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all
  getAll: async (req, res) => {
    try {
      const nd = await nguoidungModel.find();

      res.status(200).json(nd);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all Mua
  getAllMua: async (req, res) => {
    try {
      const nd = await nguoidungModel.find({ Quyen: "MUA" });

      res.status(200).json(nd);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get all Ban
  getAllBan: async (req, res) => {
    try {
      const nd = await nguoidungModel.find({ Quyen: "BAN" });

      res.status(200).json(nd);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  // get yeu thich
  getLike: async (req, res) => {
    try {
      const nd = await nguoidungModel.findById(req.params.id);

      res.status(200).json(nd.YeuThich);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

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

      const dsHD = await HoaDonModel.find({
        IDKhachHang: req.body.idkh,
        createdAt: { $gte: gteDate, $lt: ltDate },
      });

      let sum = 0;
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
};

module.exports = NguoiDungController;
