import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useauthstore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats:[],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
   setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

   getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      const data = Array.isArray(res.data) ? res.data : [];
      set({ allContacts: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      console.log("chat response:", res.data);
      const data = Array.isArray(res.data) ? res.data : [];
      set({ chats: data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessageByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try{
      const res = await axiosInstance.get(`/message/${userId}`);
      const data = Array.isArray(res.data) ? res.data : [];
      set({ messages: data });
    }
    catch(error){
      toast.error(error?.response?.data?.message || "Failed to load messages");
    }
    finally {
      set({ isMessagesLoading: false });
    }
  },
  }));