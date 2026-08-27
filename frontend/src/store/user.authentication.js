import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";

export const userAuthentication = create((set,get) => ({
  user: null,
  loading: false,
  checkingAuth: false,

  signup: async (credentials) => {
    set({ loading: true });
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        credentials
      );
      console.log(result);
      set({ user: result.data, loading: false });
      toast.success("Signup successful");
    } catch (error) {
      console.error(error);
      set({ user: null, loading: false });
      toast.error("Signup failed");
    }
  },

  login: async (credentials) => {
    set({ loading: true });
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        credentials,
        {
          withCredentials: true,
        }
      );
      // localStorage.setItem("token", result.data.token);
      console.log(result);
      set({ user: result.data, loading: false });
      toast.success("login successfully");
      return result;
    } catch (error) {
      console.error(error);
      set({ user: null, loading: false });
      toast.error("Login failed");
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        null,
        {
          withCredentials: true,
        }
      );
      set({ user: null, loading: false });
      toast.success("Logout successful");
    } catch (error) {
      console.error(error);
      set({ user: null, loading: false });
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`,
        {
          withCredentials: true,
        }
      );
      set({ user: result.data.user, checkingAuth: false });
      return true;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      console.log("something went wrong", error.message);
      return false;
    }
  },

  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refreshtoken`,
        {
          withCredentials: true,
        }
      );
      set({ user: response.data.user, checkingAuth: false });
      return response.data.user;
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // If a refresh is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        // Start a new refresh process
        refreshPromise = userAuthentication.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        userAuthentication.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
