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

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

   getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/messages/contacts");
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
      const res = await axiosInstance.get("/api/messages/chats");
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
      const res = await axiosInstance.get(`/api/messages/${userId}`);
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
  
    sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/api/messages/send/${selectedUser._id}`, messageData);
      // Replace optimistic message with real message from server
      set({ messages: [...messages, res.data] });
    } catch (error) {
      // remove optimistic message on failure
      set({ messages: messages.filter(m => m._id !== tempId) });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  }));