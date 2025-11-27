// redux/slice/users/serviceDetailSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

// Async thunk to fetch service detail
export const fetchServiceDetail = createAsyncThunk(
  "serviceDetail/fetchServiceDetail",
  async (serviceId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/services/${serviceId}`);
      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Failed to load service");
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      return rejectWithValue(
        "Failed to load service details. Please try again later."
      );
    }
  }
);

const serviceDetailSlice = createSlice({
  name: "serviceDetail",
  initialState: {
    service: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearServiceDetail: (state) => {
      state.service = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.service = action.payload;
        state.error = null;
      })
      .addCase(fetchServiceDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.service = null;
      });
  },
});

export const { clearServiceDetail } = serviceDetailSlice.actions;

export default serviceDetailSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../config/axios";

// export const fetchServiceDetail = createAsyncThunk(
//   "serviceDetail/fetchServiceDetail",
//   async (serviceId, thunkAPI) => {
//     try {
//       const { data } = await api.get(`/services/${serviceId}`);
//       if (data.success) return data.data;
//       return thunkAPI.rejectWithValue(data.message);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Failed to load service"
//       );
//     }
//   }
// );

// const serviceDetailSlice = createSlice({
//   name: "serviceDetail",
//   initialState: {
//     service: null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     clearServiceDetail: (state) => {
//       state.service = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServiceDetail.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchServiceDetail.fulfilled, (state, action) => {
//         state.loading = false;
//         state.service = action.payload;
//       })
//       .addCase(fetchServiceDetail.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { clearServiceDetail } = serviceDetailSlice.actions;
// export default serviceDetailSlice.reducer;
