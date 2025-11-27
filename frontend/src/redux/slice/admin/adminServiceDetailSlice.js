// redux/slices/admin/adminServiceDetailSlice.js
import { createSlice } from "@reduxjs/toolkit";

const adminServiceDetailSlice = createSlice({
  name: "adminServiceDetail",
  initialState: {
    selectedService: null,
    modalOpen: false,
  },
  reducers: {
    openAdminDetail: (state, action) => {
      state.selectedService = action.payload;
      state.modalOpen = true;
    },
    closeAdminDetail: (state) => {
      state.selectedService = null;
      state.modalOpen = false;
    },
  },
});

export const { openAdminDetail, closeAdminDetail } =
  adminServiceDetailSlice.actions;

export default adminServiceDetailSlice.reducer;
