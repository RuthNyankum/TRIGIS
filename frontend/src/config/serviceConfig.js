// config/serviceConfig.js

export const CATEGORIES = [
  "Academic",
  "Professional",
  "Business",
  "Research",
  "Support",
];

// Pricing Types - Must match backend exactly!
export const PRICING_TYPES = ["fixed", "hourly", "project-based", "monthly"];

// Colors - Must match backend exactly!
export const COLORS = [
  "purple",
  "blue",
  "green",
  "red",
  "yellow",
  "indigo",
  "teal",
  "pink",
];

export const COLOR_MAP = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  green: "bg-green-500",
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  indigo: "bg-indigo-500",
  teal: "bg-teal-500",
  pink: "bg-pink-500",
};

export const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  shortDescription: "",
  category: "Academic", // Default to first category
  price: 0,
  pricingType: "fixed", // Default to first pricing type
  defaultCardColor: "blue", // Default to backend default
  deliveryTime: "",
  duration: "",
  status: "active",
  isFeatured: false,
  features: [""],
  requirements: [""],
  tags: [""],
};

// API helper functions
export const serviceAPI = {
  getAllServices: async () => {
    const { data } = await api.get("/services/all?limit=100");
    return data;
  },
  createService: async (formData) => {
    const { data } = await api.post("/services/create", formData);
    return data;
  },
  updateService: async (id, formData) => {
    const { data } = await api.put(`/services/update/${id}`, formData);
    return data;
  },
  deleteService: async (id) => {
    const { data } = await api.delete(`/services/delete/${id}`);
    return data;
  },
};
