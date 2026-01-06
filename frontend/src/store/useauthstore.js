import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
   authUser: null,
  isCheckingAuth: true,
  issignup: false,
  isLoggingIn: false,
   checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (formdata) => {
    try {
      set({ issignup: true });
      const res = await axiosInstance.post("/signup", formdata);
      set({ authUser: res.data});
      toast.success("Signup Successful");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed");
    }
    finally {
      set({ issignup: false });
    }
  },
   login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },
}));