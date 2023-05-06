import { createSlice } from "@reduxjs/toolkit";

export const pointNotifi = createSlice({
  name: "pointNotifi",

  initialState: { point: false },

  reducers: {
    createPoint: (state, action) => {
      state.point = action.payload;
    },

    updatePoint: (state, action) => {
      state.point = action.payload;
    },
  },
});

export const { createPoint, updatePoint } = pointNotifi.actions;
export default pointNotifi.reducer;
