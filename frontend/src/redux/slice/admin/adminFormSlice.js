// redux/slice/admin/adminFormSlice.js
import { createSlice } from "@reduxjs/toolkit";

const INITIAL_FORM_STATE = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
};

const adminFormSlice = createSlice({
  name: "adminForm",
  initialState: {
    createForm: INITIAL_FORM_STATE,
    editForm: null,
    passwordStrength: { score: 0, level: "" },
    showPassword: false,
  },
  reducers: {
    setCreateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.createForm[field] = value;
    },
    setPasswordStrength: (state, action) => {
      state.passwordStrength = action.payload;
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    resetCreateForm: (state) => {
      state.createForm = INITIAL_FORM_STATE;
      state.passwordStrength = { score: 0, level: "" };
      state.showPassword = false;
    },
    setEditForm: (state, action) => {
      state.editForm = action.payload;
    },
    setEditFormField: (state, action) => {
      const { field, value } = action.payload;
      if (state.editForm) {
        state.editForm[field] = value;
      }
    },
    clearEditForm: (state) => {
      state.editForm = null;
    },
  },
});

export const {
  setCreateFormField,
  setPasswordStrength,
  toggleShowPassword,
  resetCreateForm,
  setEditForm,
  setEditFormField,
  clearEditForm,
} = adminFormSlice.actions;

export default adminFormSlice.reducer;
