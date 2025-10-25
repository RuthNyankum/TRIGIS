// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api", //  backend URL
//   withCredentials: true, // backend uses cookies
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // sends cookies automatically
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        await api.post("/auth/refresh-token");

        // Retry the original request after getting new access token cookie
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        window.location.href = "/login"; // redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default api;
