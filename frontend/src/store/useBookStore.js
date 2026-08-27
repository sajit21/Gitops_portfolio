import { create } from "zustand";
import axios from "axios";

export const useBookStore = create((set, get) => ({
  book: [],
  isUploading: false,
  loading: false,
  uploadError: null,
  uploadSuccess: false,

  // CREATE
  uploadBook: async (formData) => {
    set({ isUploading: true, uploadError: null, uploadSuccess: false });
    try {
      // const token = localStorage.getItem("token");
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/book/createbook`,
        formData,
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        }
      );

      // Add new article to existing array
      const currentBooks = get().book;
      set({
        book: [result.data.books, ...currentBooks], // <-- wrap single article in array
        isUploading: false,
        uploadSuccess: true,
      });

      // Reset success message after 3s
      setTimeout(() => set({ uploadSuccess: false }), 3000);
    } catch (error) {
      set({
        isUploading: false,
        uploadError: error.response?.data?.message || error.message,
      });
      console.error(error);
    }
  },

  // READ
  fetchBook: async () => {
    set({ loading: true });
    try {
      const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/book/getbook`);

      const books = Array.isArray(result.data.books)
        ? result.data.books
        : result.data.books
        ? [result.data.books]
        : [];

      set({ book: books, loading: false });
    } catch (error) {
      set({ loading: false, book: [] });
      console.error(error);
    }
  },

  // UPDATE
  editBook: async (id, formData) => {
    set({ loading: true });
    try {
      // const token = localStorage.getItem("token");
      const result = await axios.put(
       `${process.env.NEXT_PUBLIC_API_URL}/api/book/updatebook/${id}`,
        formData,
        {
          //  headers: { Authorization: `Bearer ${token}` }
          withCredentials:true
       }
      );

      const currentBooks = get().book;
      const updatedBooks = currentBooks.map((book) =>
        book.id === id ? result.data.books : book
      );

      set({ book: updatedBooks, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  // DELETE
  deleteBook: async (id) => {
    set({ loading: true });
    try {
      // const token = localStorage.getItem("token");
       await axios.delete(
       `${process.env.NEXT_PUBLIC_API_URL}/api/book/deletebook/${id}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        }
      );

      const currentBooks = get().book;
      const filteredBooks = currentBooks.filter((a) => a.id !== id);

      set({
        book: filteredBooks, // Set the remaining articles, not the deleted one
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  // RESET
  resetUploadState: () => {
    set({ uploadSuccess: false, uploadError: null });
  },
}));