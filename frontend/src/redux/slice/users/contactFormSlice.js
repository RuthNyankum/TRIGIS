// redux/slice/contactFormSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  projectType: "",
};

// Submit contact form
export const submitContactForm = createAsyncThunk(
  "contactForm/submitContactForm",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/contact", formData);
      return data;
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  }
);

const contactFormSlice = createSlice({
  name: "contactForm",
  initialState: {
    formData: INITIAL_FORM_STATE,
    isSubmitting: false,
    submitStatus: null, // 'success', 'error', null
    error: null,
  },
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    resetForm: (state) => {
      state.formData = INITIAL_FORM_STATE;
      state.submitStatus = null;
      state.error = null;
    },
    clearSubmitStatus: (state) => {
      state.submitStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitStatus = null;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.submitStatus = "success";
        state.formData = INITIAL_FORM_STATE;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitStatus = "error";
        state.error = action.payload;
      });
  },
});

export const { setFormField, resetForm, clearSubmitStatus } =
  contactFormSlice.actions;

export default contactFormSlice.reducer;
