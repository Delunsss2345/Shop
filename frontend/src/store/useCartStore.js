import { axiosInstance } from "@/configs/axios";
import { toast } from "react-hot-toast";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cartId: null,
  cartDetails: [],
  getCart: async () => {
    try {
      const res = await axiosInstance.get("/cart");
      set({ cartId: res.data.data.id });
      set({ cartDetails: res.data.data.cartDetails });
      console.log(res.data.data.cartDetails);
    } catch (err) {
      console.error(err);
    }
  },
  addItem: async (productId, quantity) => {
    try {
      const res = await axiosInstance.post("/cart/add", {
        productId,
        quantity,
      });
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
    }
  },
  updateItem: async (productId, quantity) => {
    try {
      const cartId = get().cartId;
      const res = await axiosInstance.patch(`/cart/${cartId}`, {
        productId,
        quantity,
      });
      set({ cartDetails: res.data.data.cartDetails });
    } catch (err) {
      console.error(err);
    }
  },
  removeItem: async (productId) => {
    try {
      const cartId = get().cartId;
      const res = await axiosInstance.delete(`/cart/${cartId}`, {
        params: {
          productId,
        },
      });

      set({ cartDetails: res.data.data.cartDetails });
      toast.success(res.data.message);
    } catch (error) {
      console.error(error);
    }
  },
}));
