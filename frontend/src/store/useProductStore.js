import { axiosInstance } from "@/configs/axios";
import { create } from "zustand";
export const useProductStore = create((set) => ({
  productPagination: [],
  featureProducts: [],
  selectedProduct: null,
  getPaginationProducts: async (page = 1) => {
    try {
      const res = await axiosInstance.get("/product", {
        params: { page, limit: 4 },
      });
      set({ productPagination: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },
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
