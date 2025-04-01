import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    // Add any additional headers here, such as authorization tokens
  },
});

export default axiosInstance;
