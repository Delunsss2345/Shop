import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest);
        });
      }
      isRefreshing = true;
      originalRequest._retry = true; //Tránh lặp vô hạn chỉ check 1 lần cho 1 request

      try {
        await axiosInstance.post("/auth/refresh-token");
        console.log("Gọi refresh token");
        failedQueue.forEach(({ resolve }) => {
          resolve();
        });
        failedQueue = [];
      } catch (error) {
        failedQueue.forEach(({ reject }) => {
          reject(error);
        });
        failedQueue = [];

        toast.error("Token hết hạn!");
        await axiosInstance.post("/api/logout");
      } finally {
        isRefreshing = false;
      }

      return Promise.reject(error);
    }
  }
);

export { axiosInstance };
