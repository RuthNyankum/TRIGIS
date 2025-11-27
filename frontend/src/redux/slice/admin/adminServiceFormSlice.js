// redux/slice/admin/adminServiceFormSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../config/axios";

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  shortDescription: "",
  category: "Academic",
  price: 0,
  pricingType: "fixed",
  defaultCardColor: "blue",
  deliveryTime: "",
  duration: "",
  status: "active",
  isFeatured: false,
  features: [""],
  requirements: [""],
  tags: [""],
};

// Create service
export const createAdminService = createAsyncThunk(
  "adminServiceForm/createAdminService",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("📤 Sending service data:", formData);
      const { data } = await api.post("/services/create", formData);
      console.log("📥 Response:", data);
      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Error creating service");
      }
    } catch (error) {
      console.error("❌ Error creating service:", error);
      console.error("Error response:", error.response?.data);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create service";
      return rejectWithValue(errorMessage);
    }
  }
);

// Update service
export const updateAdminService = createAsyncThunk(
  "adminServiceForm/updateAdminService",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/services/update/${id}`, formData);
      if (data.success) {
        return data.data;
      } else {
        return rejectWithValue(data.message || "Error updating service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update service";
      return rejectWithValue(errorMessage);
    }
  }
);

const adminServiceFormSlice = createSlice({
  name: "adminServiceForm",
  initialState: {
    editingService: INITIAL_FORM_STATE,
    loading: false,
    error: null,
    message: "",
  },
  reducers: {
    setEditingService: (state, action) => {
      state.editingService = {
        ...INITIAL_FORM_STATE,
        ...action.payload,
        features: action.payload.features || [""],
        requirements: action.payload.requirements || [""],
        tags: action.payload.tags || [""],
      };
    },
    setEditingServiceField: (state, action) => {
      const { field, value } = action.payload;
      state.editingService[field] = value;
    },
    addArrayField: (state, action) => {
      const { field, index, value } = action.payload;
      if (index !== undefined && value !== undefined) {
        // Update existing array element
        state.editingService[field][index] = value;
      } else {
        // Add new empty element
        state.editingService[field].push("");
      }
    },
    removeArrayField: (state, action) => {
      const { field, index } = action.payload;
      state.editingService[field] = state.editingService[field].filter(
        (_, i) => i !== index
      );
    },
    clearEditingService: (state) => {
      state.editingService = INITIAL_FORM_STATE;
      state.error = null;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create service
      .addCase(createAdminService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAdminService.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Service created successfully ✅";
        state.editingService = INITIAL_FORM_STATE;
      })
      .addCase(createAdminService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      })
      // Update service
      .addCase(updateAdminService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminService.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Service updated successfully ✅";
        state.editingService = INITIAL_FORM_STATE;
      })
      .addCase(updateAdminService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  },
});

export const {
  setEditingService,
  setEditingServiceField,
  addArrayField,
  removeArrayField,
  clearEditingService,
} = adminServiceFormSlice.actions;

export default adminServiceFormSlice.reducer;

// // redux/slice/admin/adminServiceFormSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for saving service
// export const saveAdminService = createAsyncThunk(
//   "adminServiceForm/saveService",
//   async (serviceData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/api/admin/services",
//         serviceData
//       );
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

// const initialState = {
//   editingService: null,
//   loading: false,
//   error: null,
// };

// const adminServiceFormSlice = createSlice({
//   name: "adminServiceForm",
//   initialState,
//   reducers: {
//     setEditingServiceField: (state, action) => {
//       const { field, value } = action.payload;
//       if (!state.editingService) state.editingService = {};
//       state.editingService[field] = value;
//     },
//     addArrayField: (state, action) => {
//       const { field, index, value } = action.payload;
//       if (!state.editingService[field]) state.editingService[field] = [""];
//       if (index !== undefined && value !== undefined) {
//         state.editingService[field][index] = value;
//       } else {
//         state.editingService[field].push("");
//       }
//     },
//     removeArrayField: (state, action) => {
//       const { field, index } = action.payload;
//       if (
//         state.editingService[field] &&
//         state.editingService[field].length > 0
//       ) {
//         state.editingService[field].splice(index, 1);
//       }
//     },
//     clearEditingService: (state) => {
//       state.editingService = null;
//       state.error = null;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(saveAdminService.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(saveAdminService.fulfilled, (state, action) => {
//         state.loading = false;
//         state.editingService = null; // clear form after save
//       })
//       .addCase(saveAdminService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   setEditingServiceField,
//   addArrayField,
//   removeArrayField,
//   clearEditingService,
// } = adminServiceFormSlice.actions;

// export default adminServiceFormSlice.reducer;

// // redux/slices/admin/adminServiceFormSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../config/axios";

// // CREATE SERVICE
// export const createAdminService = createAsyncThunk(
//   "adminServiceForm/create",
//   async (formData, thunkAPI) => {
//     try {
//       const { data } = await api.post("/admin/services", formData);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

// // UPDATE SERVICE
// export const updateAdminService = createAsyncThunk(
//   "adminServiceForm/update",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       const { data } = await api.put(`/admin/services/${id}`, formData);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

// const adminServiceFormSlice = createSlice({
//   name: "adminServiceForm",
//   initialState: {
//     editingService: {
//       title: "",
//       description: "",
//       shortDescription: "",
//       category: "",
//       price: "",
//       pricingType: "",
//       defaultCardColor: "",
//       deliveryTime: "",
//       duration: "",
//       status: "active",
//       isFeatured: false,
//       features: [""],
//       requirements: [""],
//       tags: [""],
//     },
//     loading: false,
//     success: null,
//     error: null,
//   },
//   reducers: {
//     setEditingService: (state, action) => {
//       state.editingService = action.payload;
//     },
//     clearEditingService: (state) => {
//       state.editingService = {
//         title: "",
//         description: "",
//         shortDescription: "",
//         category: "",
//         price: "",
//         pricingType: "",
//         defaultCardColor: "",
//         deliveryTime: "",
//         duration: "",
//         status: "active",
//         isFeatured: false,
//         features: [""],
//         requirements: [""],
//         tags: [""],
//       };
//     },
//     setEditingServiceField: (state, action) => {
//       const { field, value } = action.payload;
//       state.editingService[field] = value;
//     },
//     addArrayField: (state, action) => {
//       const { field } = action.payload;
//       state.editingService[field].push("");
//     },
//     removeArrayField: (state, action) => {
//       const { field, index } = action.payload;
//       state.editingService[field].splice(index, 1);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createAdminService.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createAdminService.fulfilled, (state) => {
//         state.loading = false;
//         state.success = "Service created successfully";
//       })
//       .addCase(createAdminService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateAdminService.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateAdminService.fulfilled, (state) => {
//         state.loading = false;
//         state.success = "Service updated successfully";
//       })
//       .addCase(updateAdminService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const {
//   setEditingService,
//   clearEditingService,
//   setEditingServiceField,
//   addArrayField,
//   removeArrayField,
// } = adminServiceFormSlice.actions;

// export default adminServiceFormSlice.reducer;

// // redux/slices/admin/adminServiceFormSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../../../config/axios";

// // CREATE SERVICE
// export const createAdminService = createAsyncThunk(
//   "adminServiceForm/create",
//   async (formData, thunkAPI) => {
//     try {
//       const { data } = await api.post("/admin/services", formData);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

// // UPDATE SERVICE
// export const updateAdminService = createAsyncThunk(
//   "adminServiceForm/update",
//   async ({ id, formData }, thunkAPI) => {
//     try {
//       const { data } = await api.put(`/admin/services/${id}`, formData);
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || "Error");
//     }
//   }
// );

// const adminServiceFormSlice = createSlice({
//   name: "adminServiceForm",
//   initialState: {
//     editingService: null,
//     loading: false,
//     success: null,
//     error: null,
//   },
//   reducers: {
//     setEditingService: (state, action) => {
//       state.editingService = action.payload;
//     },
//     clearEditingService: (state) => {
//       state.editingService = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createAdminService.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createAdminService.fulfilled, (state) => {
//         state.loading = false;
//         state.success = "Service created successfully";
//       })
//       .addCase(createAdminService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // update
//       .addCase(updateAdminService.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateAdminService.fulfilled, (state) => {
//         state.loading = false;
//         state.success = "Service updated successfully";
//       })
//       .addCase(updateAdminService.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setEditingService, clearEditingService } =
//   adminServiceFormSlice.actions;

// export default adminServiceFormSlice.reducer;
