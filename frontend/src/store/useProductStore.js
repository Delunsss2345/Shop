import { axiosInstance } from "@/configs/axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";
export const useProductStore = create((set, get) => ({
  products: [],
  productPagination: [],
  featureProducts: [],
  selectedProduct: null,
  loadingProduct: false,
  getAllProducts: async () => {
    try {
      const res = await axiosInstance.get("/product/all");
      set({ products: res.data.data });
    } catch (err) {
      console.error(err);
    }
  },
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
  createProduct: async (data) => {
    try {
      set({ loadingProduct: true });
      const res = await axiosInstance.post(`/product`, {
        ...data,
      });

      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    } finally {
      set({ loadingProduct: false });
    }
  },
  updateProduct: async (data) => {
    try {
      set({ loadingProduct: true });
      const res = await axiosInstance.patch(`/product/${data.id}`, {
        ...data,
      });
      const newProducts = get().productPagination.map((product) => {
        return product.id === data.id ? res.data.data : product;
      });

      set({ productPagination: newProducts });
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      set({ loadingProduct: false });
    }
  },
  deleteProduct: async (id) => {
    try {
      const res = await axiosInstance.delete(`/product/${id}`);
      const newProductPagination = get().productPagination.filter((product) => {
        if (product.id !== id) return product;
      });

      set({ productPagination: newProductPagination });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
}));
