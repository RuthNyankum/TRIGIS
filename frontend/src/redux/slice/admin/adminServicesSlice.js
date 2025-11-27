// redux/slice/admin/adminServicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

// Fetch all services (admin view)
export const fetchAdminServices = createAsyncThunk(
  "adminServices/fetchAdminServices",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/services/all?limit=100");
      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Failed to load services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      return rejectWithValue("Failed to load services");
    }
  }
);

// Delete service
export const deleteAdminService = createAsyncThunk(
  "adminServices/deleteAdminService",
  async (serviceId, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/services/delete/${serviceId}`);
      if (data.success) {
        return serviceId;
      } else {
        return rejectWithValue(data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete service";
      return rejectWithValue(errorMessage);
    }
  }
);

const adminServicesSlice = createSlice({
  name: "adminServices",
  initialState: {
    services: [],
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    clearAdminMessage: (state) => {
      state.message = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch services
      .addCase(fetchAdminServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete service
      .addCase(deleteAdminService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAdminService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
        state.message = "Service deleted successfully ✅";
      })
      .addCase(deleteAdminService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export const { clearAdminMessage } = adminServicesSlice.actions;

export default adminServicesSlice.reducer;

// // redux/slices/admin/adminServicesSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../config/axios";

// // GET ALL ADMIN SERVICES
// export const fetchAdminServices = createAsyncThunk(
//   "adminServices/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await api.get("/admin/services");
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

// // DELETE SERVICE
// export const deleteAdminService = createAsyncThunk(
//   "adminServices/delete",
//   async (id, thunkAPI) => {
//     try {
//       await api.delete(`/admin/services/${id}`);
//       return id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

// const adminServicesSlice = createSlice({
//   name: "adminServices",
//   initialState: {
//     services: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // fetch
//       .addCase(fetchAdminServices.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAdminServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.services = action.payload;
//       })
//       .addCase(fetchAdminServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // delete
//       .addCase(deleteAdminService.fulfilled, (state, action) => {
//         state.services = state.services.filter(
//           (service) => service._id !== action.payload
//         );
//       });
//   },
// });

// export default adminServicesSlice.reducer;
