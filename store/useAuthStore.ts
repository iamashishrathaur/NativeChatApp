import { create } from "zustand";
import { axiosInstance } from "../api/apiClient";
import { io, Socket } from "socket.io-client";
import { ToastAndroid } from "react-native";
import { initAuthDB, insertAuthUser, logoutAuthUser } from "@/DB/authDB";
import { deleteTokenFromSecureStore, getTokenFromSecureStore, saveTokenToSecureStore } from "@/secureDB/authData";

const BASE_URL = process.env.NODE_ENV === "development" ? "https://heavy-worlds-itch.loca.lt" : "/";

// Define types for the state
interface AuthUser {
  _id: string;
  name: string;
  email: string;
  password:string;
  jwt:string;
}

interface AuthStore {
  authUser: AuthUser | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  token:string;
  socket: Socket | null;

  checkAuth: () => Promise<void>;
  signup: (data: Record<string, unknown>) => Promise<boolean>;
  login: (data: Record<string, unknown>) => Promise<boolean>;
  logout: () => Promise<boolean>;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

// Create the zustand store with types
export const useAuthStore = create<AuthStore>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  token:'',
  socket: null,

  checkAuth: async () => {
    try {
      const token = await getTokenFromSecureStore()
      
      if (!token) {
        throw new Error("No token found");
      }
      set({ token });
      const res = await axiosInstance.get<AuthUser>("/auth/check",{
        headers: {
          Authorization: `Bearer ${token}`
        },
    });
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error: any) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post<AuthUser>("/auth/signup", data);
      set({ authUser: res.data });
      ToastAndroid.show("Account created successfully!", ToastAndroid.SHORT);
      get().connectSocket();
      return true
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Signup failed.";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return false
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {  
      const res = await axiosInstance.post<AuthUser>("/auth/login", data);
      set({ authUser: res.data });
      const localData = {_id:res.data._id,name:res.data.name,email:res.data.email}
      await saveTokenToSecureStore(res.data.jwt)
      await insertAuthUser(localData);
      ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
      get().connectSocket();
      return true;
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Login failed, Please type again later.";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, onlineUsers: [], socket: null });
      await logoutAuthUser();
      await deleteTokenFromSecureStore()
      ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
      return true
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Logout failed.";
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
      return false
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, { query: { userId: authUser._id } });
    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    newSocket.on("reconnect", (attemptNumber: number) => {
      console.log(`Socket reconnected after ${attemptNumber} attempts`);
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket?.connected) {
      socket.off("getOnlineUsers");
      socket.disconnect();
    }
  },
}));

initAuthDB();
