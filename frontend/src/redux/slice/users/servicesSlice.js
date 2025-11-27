// redux/slice/users/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

// Async thunk to fetch all services
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
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
      return rejectWithValue(
        "Failed to load services. Please try again later."
      );
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
    searchTerm: "",
    selectedCategory: "all",
    priceRange: "all",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    clearFilters: (state) => {
      state.searchTerm = "";
      state.selectedCategory = "all";
      state.priceRange = "all";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setSearchTerm,
  setSelectedCategory,
  setPriceRange,
  clearFilters,
} = servicesSlice.actions;

export default servicesSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../config/axios";

// // THUNK: Fetch services
// export const fetchServices = createAsyncThunk(
//   "services/fetchServices",
//   async (_, thunkAPI) => {
//     try {
//       const { data } = await api.get("/services/all?limit=100");
//       if (data.success) return data.data;
//       return thunkAPI.rejectWithValue(
//         data.message || "Failed to load services"
//       );
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Error fetching services"
//       );
//     }
//   }
// );

// const servicesSlice = createSlice({
//   name: "services",
//   initialState: {
//     services: [],
//     loading: false,
//     error: null,
//     searchTerm: "",
//     selectedCategory: "all",
//     priceRange: "all",
//   },
//   reducers: {
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//     setSelectedCategory: (state, action) => {
//       state.selectedCategory = action.payload;
//     },
//     setPriceRange: (state, action) => {
//       state.priceRange = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.loading = false;
//         state.services = action.payload;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setSearchTerm, setSelectedCategory, setPriceRange } =
//   servicesSlice.actions;

// export default servicesSlice.reducer;
