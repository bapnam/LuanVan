import React, { useState } from "react";
import SideBar from "../../components/sidebar/SideBar.jsx";
import {
  SelectProvince,
  SelectDistrict,
  SelectCommune,
  getProvinceName,
  getDistrictName,
  getCommuneName,
} from "vn-ad";
import "./AddNV.css";
import axiosClient from "Data/client.js";
import { useTabs } from "@mui/base";
import axios from "axios";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddNV = () => {
  const [hoten, setHoten] = useState();
  const [ngaySinh, setNgaySinh] = useState();
  const [gioiTinh, setGioiTinh] = useState();
  const [email, setEmail] = useState();
  const [cmnd, setCMND] = useState();
  const [SDT, setSDT] = useState();
  const [diachi, setDiachi] = useState();
  const [tinh, setTinh] = useState();
  const [huyen, setHuyen] = useState();
  const [xa, setXa] = useState();
  const [matKhau, setMatKhau] = useState("abc123456");
  const [quyen, setQuyen] = useState();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      HoTen: hoten,
      NgaySinh: ngaySinh,
      GioiTinh: gioiTinh,
      Email: email,
      CMND: cmnd,
      SDT: SDT,
      DiaChi: [
        {
          TenDiaChi: "Home",
          ChiTiet: diachi,
          TinhTP: getProvinceName(tinh),
          QuanHuyen: getDistrictName(huyen),
          XaPhuong: getCommuneName(xa),
        },
      ],
      MatKhau: matKhau,
      Quyen: quyen,
    };

    // console.log(data);
    await axios
      .post("http://localhost:9000/v1/nhanvien/add", data)
      .then((res) => {
        console.log(res.data);
        if (res.status == 200) handleClickOpen();
        console.log("NNNNNN", data);
      })
      .catch((err) => {
        console.log(err);
      });


  };

  return (
    <div className="App">
      <div className="AppBackground">
        <SideBar />

        <div className="ml-44 m-auto">
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="mt-5 md:col-span-2 md:mt-0">
                <form>
                  <div className="overflow-hidden shadow sm:rounded-md">
                    <div className="bg-white px-4 py-5 sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-5">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Họ và tên
                          </label>
                          <input
                            value={hoten}
                            onChange={(e) => setHoten(e.target.value)}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Ngày sinh
                          </label>
                          <input
                            value={ngaySinh}
                            onChange={(e) => setNgaySinh(e.target.value)}
                            type="text"
                            name="first-name"
                            id="first-name"
                            autoComplete="given-name"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            CMND
                          </label>
                          <input
                            value={cmnd}
                            onChange={(e) => setCMND(e.target.value)}
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="Email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Số điện thoại
                          </label>
                          <input
                            value={SDT}
                            onChange={(e) => setSDT(e.target.value)}
                            type="text"
                            name="email-address"
                            id="email-address"
                            autoComplete="Email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Mật khẩu
                          </label>
                          <input
                            value={matKhau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            type="password"
                            name="email-address"
                            id="email-address"
                            autoComplete="Email"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Giới tính
                          </label>
                          <select
                            value={gioiTinh}
                            onChange={(e) => setGioiTinh(e.target.value)}
                          >
                            <option value="">Chọn Giới tính </option>
                            <option value={"NAM"}>Nam</option>
                            <option value={"NU"}>Nữ</option>
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Quyền
                          </label>
                          <select
                            value={quyen}
                            onChange={(e) => setQuyen(e.target.value)}
                          >
                            <option value="">Chọn Quyền </option>
                            <option value={"NHANVIEN"}>Nhân Viên</option>
                            <option value={"QUANLY"}>Quản Lý</option>
                          </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Thành phố
                          </label>
                          <SelectProvince
                            value={tinh}
                            onChange={setTinh}
                            type="text"
                            name="region"
                            id="region"
                            autoComplete="address-level1"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Quận/Huyện
                          </label>
                          <SelectDistrict
                            value={huyen}
                            province={tinh}
                            onChange={setHuyen}
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Xã/Phường
                          </label>
                          <SelectCommune
                            value={xa}
                            district={huyen}
                            onChange={setXa}
                            type="text"
                            name="postal-code"
                            id="postal-code"
                            autoComplete="postal-code"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Địa chỉ
                          </label>
                          <input
                            value={diachi}
                            onChange={(e) => setDiachi(e.target.value)}
                            type="text"
                            name="street-address"
                            id="street-address"
                            autoComplete="street-address"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-400 focus:ring-red-400 sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                      <button
                        // type="submit"
                        onClick={(e) => handleSubmit(e)}
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                      >
                        Lưu
                      </button>
                    </div>

                    <div>
                      <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                        aria-describedby="alert-dialog-slide-description"
                      >
                        <DialogTitle>
                          {"Thêm nhân viên mới thành công."}
                        </DialogTitle>
                        <DialogActions>
                          <Button
                            onClick={async () => {
                              handleClose();

                              window.location.replace("/nhanvien");
                            }}
                          >
                            Đóng
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNV;
