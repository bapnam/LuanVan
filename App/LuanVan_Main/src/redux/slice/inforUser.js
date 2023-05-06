import { createSlice } from "@reduxjs/toolkit";

export const InforUser = createSlice({
  name: "InforUser",

  initialState: {
    stateLogin: false,
    id: "id",
    HoTen: "name",
    NgaySinh: "2000",
    SDT: "sdt",
    DiaChi: [
      {
        TinhTP: "",
        QuanHuyen: "",
        XaPhuong: "",
        ChiTiet: "ct",
      },
    ],
    GioiTinh: "",
    Email: "",
    CMND: "",
    YeuThich: ["id"],
    LichSu: [
      {
        Tour: "",
        TrangThai: "x",
      },
    ],
    Quyen: "1",
  },

  reducers: {
    updateInforUser: (state, action) => {
      state.stateLogin = action.payload.stateLogin;
      state.id = action.payload.id;
      state.HoTen = action.payload.HoTen;
      state.NgaySinh = action.payload.NgaySinh;
      state.SDT = action.payload.SDT;
      state.DiaChi = action.payload.DiaChi;
      state.Email = action.payload.Email;
      state.GioiTinh = action.payload.GioiTinh;
      state.CMND = action.payload.CMND;
      state.YeuThich = action.payload.YeuThich;
      state.LichSu = action.payload.LichSu;
      state.Quyen = action.payload.Quyen;
    },
  },
});

export const { updateInforUser } = InforUser.actions;
export default InforUser.reducer;
