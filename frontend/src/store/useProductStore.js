import { axiosInstance } from "@/configs/axios";
import { create } from "zustand";
export const useProductStore = create((set) => ({
  products: [],
  featureProducts: [],
  selectedProduct: null,
  getFeatureProducts: async () => {
    try {
      const res = await axiosInstance.get("/product/feature");
      set({ featureProducts: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },
  getProductById: async (id) => {
    try {
      const res = await axiosInstance.get(`/product/${id}`);
      console.log(res);
      set({ selectedProduct: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },
}));
