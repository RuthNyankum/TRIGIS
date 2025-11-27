import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios";
import { toast } from "react-toastify";

//
// ─── REGISTER USER ──────────────────────────────────────────────
//
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { user, token, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message || "Registration successful! 🎉");
      return { user, token };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//
// ─── LOGIN USER ─────────────────────────────────────────────────
//
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", data);
      const { user, token, message } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(message || "Login successful! 🎉");
      return { user, token };
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//
// ─── FORGOT PASSWORD ────────────────────────────────────────────
//
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Reset link sent! 📧");
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send reset link ❌";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//
// ─── RESET PASSWORD ─────────────────────────────────────────────
//
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/auth/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password reset successful ✅");
      return res.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Reset failed. Token invalid ❌";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//
// ─── INITIAL STATE ──────────────────────────────────────────────
//
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  success: null,
};

//
// ─── SLICE ──────────────────────────────────────────────────────
//
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //
    // ✅ FIXED LOGOUT — clears everything properly
    //
    logout: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // reset all auth fields
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.success = null;

      //   toast.info("You have been logged out.");
    },
  },

  extraReducers: (builder) => {
    //
    // ─── REGISTER ───────────────────────────────────────────────
    //
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //
    // ─── LOGIN ─────────────────────────────────────────────────
    //
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //
    // ─── FORGOT PASSWORD ───────────────────────────────────────
    //
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //
    // ─── RESET PASSWORD ─────────────────────────────────────────
    //
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
