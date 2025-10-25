import api from "../config/axios";
import { toast } from "react-toastify";

export const handleLogout = async (navigate) => {
  try {
    const response = await api.post("/auth/logout");

    if (response.data.success) {
      // Clear user data from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Show success message
      toast.success("Logged out successfully!");

      // Redirect to login page
      navigate("/login");
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("Logout failed. Please try again.");
  }
};
