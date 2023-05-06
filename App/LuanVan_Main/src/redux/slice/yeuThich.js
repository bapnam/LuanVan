import { createSlice } from "@reduxjs/toolkit";

export const InforYeuThich = createSlice({
  name: "InforYeuThich",

  initialState: { Tour: ["idtour"] },

  reducers: {
    createYeuThich: (state, action) => {
      state.Tour = action.payload;
      // console.log("STORE: ", state);
    },

    updateYeuThich: (state, action) => {
      state.Tour = [...state.Tour, action.payload];
      // console.log("STORE: ", state);
    },
  },
});

export const { createYeuThich, updateYeuThich } = InforYeuThich.actions;
export default InforYeuThich.reducer;
