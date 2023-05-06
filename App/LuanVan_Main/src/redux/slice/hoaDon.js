import { createSlice } from "@reduxjs/toolkit";

export const InforHoaDon = createSlice({
  name: "InforHoaDon",

  initialState: {
    HD: [
      {
        MaHoaDon: "TuDong",
        IDKhachHang: "idKH",
        IDTour: "0",
        NgayKhoiHanh: "ngay",
        SoLuongKhach: 1,
        TongTien: 1,
      },
    ],
  },

  reducers: {
    createHoaDon: (state, action) => {
      state.HD = action.payload;
      // console.log("STORE: ", state);
    },

    updateHoaDon: (state, action) => {
      state.HD = [...state.HD, action.payload]
      // console.log("STORE: ", state);
    },
  },
});

export const { createHoaDon, updateHoaDon } = InforHoaDon.actions;
export default InforHoaDon.reducer;
