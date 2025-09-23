import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", //  backend URL
  withCredentials: true, // backend uses cookies
});

export default api;
