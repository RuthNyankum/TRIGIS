// redux/slice/admin/adminManagementSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

// Fetch all admins
export const fetchAdmins = createAsyncThunk(
  "adminManagement/fetchAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/admin/all");
      return data.admins;
    } catch (error) {
      console.error("Error fetching admins:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to load admins"
      );
    }
  }
);

// Create new admin
export const createAdmin = createAsyncThunk(
  "adminManagement/createAdmin",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin/create", formData);
      return data.admin;
    } catch (error) {
      console.error("Error creating admin:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create admin"
      );
    }
  }
);

// Update admin
export const updateAdmin = createAsyncThunk(
  "adminManagement/updateAdmin",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/admin/update/${id}`, formData);
      return { id, updatedData: formData };
    } catch (error) {
      console.error("Error updating admin:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update admin"
      );
    }
  }
);

// Delete admin
export const deleteAdmin = createAsyncThunk(
  "adminManagement/deleteAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/admin/delete/${id}`);
      return id;
    } catch (error) {
      console.error("Error deleting admin:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete admin"
      );
    }
  }
);

const adminManagementSlice = createSlice({
  name: "adminManagement",
  initialState: {
    admins: [],
    loading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: null,
    message: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch admins
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create admin
      .addCase(createAdmin.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createAdmin.fulfilled, (state, action) => {
        state.createLoading = false;
        state.admins.push(action.payload);
        state.message = "Admin created successfully 🎉";
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      })
      // Update admin
      .addCase(updateAdmin.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.updateLoading = false;
        const { id, updatedData } = action.payload;
        const index = state.admins.findIndex((admin) => admin._id === id);
        if (index !== -1) {
          state.admins[index] = { ...state.admins[index], ...updatedData };
        }
        state.message = "Admin updated successfully ✅";
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      })
      // Delete admin
      .addCase(deleteAdmin.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload
        );
        state.message = "Admin deleted successfully ✅";
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMessage } = adminManagementSlice.actions;

export default adminManagementSlice.reducer;
