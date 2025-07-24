import { axiosInstance } from "@/configs/axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
export const useAuthStore = create((set, get) => ({
  userAuth: null,
  loading: false,
  loadingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/me");
      set({ userAuth: res.data.data });
    } catch (error) {
      set({ userAuth: null });
    } finally {
      set({ loadingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      console.log(data);
      set({ loading: true });
      const res = await axiosInstance.post("/auth/register", data);
      set({ userAuth: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response.data.message || "Đăng ký thất bại");
      set({ userAuth: null });
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });
      const res = await axiosInstance.post("/auth/login", data);
      set({ userAuth: res.data.data });
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error?.response.data.message || "Đăng nhập thất bại");
      set({ userAuth: null });
    } finally {
      set({ loading: false });
    }
  },
}));
