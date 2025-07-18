import { axiosInstance } from "@/configs/axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
export const useUserStore = create((set, get) => ({
  userAll: [],
  users: [],
  isLoading: false,
  getAll: async () => {
    try {
      const res = await axiosInstance.get("/user/all");
      set({ userAll: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },
  getAllUsers: async (page = 1) => {
    try {
      const res = await axiosInstance.get("/user", {
        params: { page, limit: 4 },
      });
      set({ users: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },
  createUser: async (data) => {
    try {
      const res = await axiosInstance.post("/user", data);

      const currentUsers = get().userAll;
      const newUsers = [...currentUsers, res.data.data];
      set({ userAll: newUsers });
      toast.success(res.data.message);
      return true;
    } catch (err) {
      console.error(err);

      toast.error(err.response?.data?.message || "Failed to create user");
    }
  },
  updateUser: async (id, data) => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.patch(`/user/${id}`, data);

      const updatedUser = res.data.data;

      const newUsers = get().users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );

      set({ users: newUsers });
      toast.success(res.data.message);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to edit user");
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await axiosInstance.patch(`/user/block/${id}`);
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to edit user");
    }
  },
}));
