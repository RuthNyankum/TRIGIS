// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api",
//   withCredentials: true, // sends cookies automatically
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // If access token expired and we haven't retried yet
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Call refresh token endpoint
//         await api.post("/auth/refresh-token");

//         // Retry the original request after getting new access token cookie
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         window.location.href = "/login"; // redirect to login
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Handle token expiry
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // ✅ Correct method and ensure credentials are included
//         await api.post("/auth/refresh-token", {}, { withCredentials: true });

//         // ✅ Retry original request after successful refresh
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const res = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;

        //  Update localStorage
        localStorage.setItem("token", newAccessToken);

        //  Update Authorization header for retry
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
