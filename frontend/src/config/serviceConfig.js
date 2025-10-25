import api from "./axios";

export const CATEGORIES = [
  "Academic",
  "Professional",
  "Business",
  "Research",
  "Support",
];

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

export const PRICING_TYPES = ["fixed", "hourly", "project-based", "monthly"];

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
  category: "Academic",
  price: "",
  pricingType: "fixed",
  defaultCardColor: "blue",
  deliveryTime: "",
  duration: "",
  features: [""],
  requirements: [""],
  tags: [""],
  isFeatured: false,
  status: "active",
};

// Clean data helper - removes empty strings from arrays
const cleanData = (data) => ({
  ...data,
  features: data.features.filter((f) => f.trim()),
  requirements: data.requirements.filter((r) => r.trim()),
  tags: data.tags.filter((t) => t.trim()),
});

// Service API calls using your axios instance
export const serviceAPI = {
  getAllServices: async () => {
    try {
      const { data } = await api.get("/services/all");
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error fetching services",
      };
    }
  },

  createService: async (formData) => {
    try {
      const { data } = await api.post("/services/create", cleanData(formData));
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error creating service",
      };
    }
  },

  updateService: async (id, formData) => {
    try {
      const { data } = await api.put(
        `/services/update/${id}`,
        cleanData(formData)
      );
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error updating service",
      };
    }
  },

  deleteService: async (id) => {
    try {
      const { data } = await api.delete(`/services/delete/${id}`);
      return data;
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error deleting service",
      };
    }
  },
};
