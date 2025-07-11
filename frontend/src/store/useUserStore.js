import { create } from 'zustand' ; 
import { axiosInstance } from '@/configs/axios'
import {toast} from 'react-hot-toast'
export const useUserStore = create((set , get) => ({
    users : [] , 
    getAllUsers : async () => {
        try {
            const res = await axiosInstance.get("/user") ; 
            set({users : res.data.data}) ; 
        }
        catch (err) {
            console.error(err) ; 
        }
    } , 
    createUser: async (data) => {
        try {
            const res = await axiosInstance.post("/user", data);
            
            const currentUsers = get().users;
            const newUsers = [...currentUsers, res.data.data];
            set({ users: newUsers });
            
            toast.success(res.data.message);
            
        } catch (err) {
            console.error(err);

            toast.error(err.response?.data?.message || 'Failed to create user');
        }
    }, 
    updateUser : async (data) => {
        try {
            const res = await axiosInstance.put(`/user/${data.id}`, data);
            
            const currentUsers = [...get().users];
            const idx = currentUsers.findIndex(p => p.id === data.id) ; 
            currentUsers[idx] = null ;
            currentUsers[idx] = res.data.data ;
            set({ users: [...currentUsers]});
            
            toast.success(res.data.message);
            
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to edit user');
        }
    } ,
    deleteUser : async (id) => {
        try {
            const res = await axiosInstance.put(`/user/block/${id}`);
            toast.success(res.data.message);
            
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to edit user');
        }
    }
}))