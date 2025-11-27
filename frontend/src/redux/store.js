// redux/store.js
import { configureStore } from "@reduxjs/toolkit";

// Auth
import authReducer from "./slice/authSlice";

// User Services
import servicesReducer from "./slice/users/servicesSlice";
import serviceDetailReducer from "./slice/users/serviceDetailSlice";

// Admin Services
import adminServicesReducer from "./slice/admin/adminServicesSlice";
import adminServiceDetailReducer from "./slice/admin/adminServiceDetailSlice";
import adminServiceFormReducer from "./slice/admin/adminServiceFormSlice";

// Admin Management
import adminManagementReducer from "./slice/admin/adminManagementSlice";
import adminFormReducer from "./slice/admin/adminFormSlice";

// Contact Form
import contactFormReducer from "./slice/users/contactFormSlice";

const store = configureStore({
  reducer: {
    // Auth
    auth: authReducer,

    // User Services
    services: servicesReducer,
    serviceDetail: serviceDetailReducer,

    // Admin Services
    adminServices: adminServicesReducer,
    adminServiceDetail: adminServiceDetailReducer,
    adminServiceForm: adminServiceFormReducer,

    // Admin Management
    adminManagement: adminManagementReducer,
    adminForm: adminFormReducer,

    // Contact Form
    contactForm: contactFormReducer,
  },
});

export default store;
