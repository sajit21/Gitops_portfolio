import { create } from "zustand";
import axios from "axios";

export const useArticleStore = create((set, get) => ({
  article: [],
  isUploading: false,
  loading: false,
  uploadError: null,
  uploadSuccess: false,

  // CREATE
  uploadArticle: async (formData) => {
    set({ isUploading: true, uploadError: null, uploadSuccess: false });
    try {
      // const token = localStorage.getItem("token");
      // const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/article/create`, formData, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
        const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/article/create`, formData, {
       withCredentials: true
      });

      // Add new article to existing array
      const currentArticles = get().article;
      set({
        article: [result.data.articles, ...currentArticles], // <-- wrap single article in array
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
  fetchArticle: async () => {
    set({ loading: true });
    try {
      const result = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/api/article/get`);

      const articles = Array.isArray(result.data.articles)
        ? result.data.articles
        : result.data.articles
        ? [result.data.articles]
        : [];

      set({ article: articles, loading: false });
    } catch (error) {
      set({ loading: false, article: [] });
      console.error(error);
    }
  },

  // UPDATE
  editArticle: async (id, formData) => {
    set({ loading: true });
    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/article/update/${id}`,
        formData,
        // { headers: { Authorization: `Bearer ${token}` } }
        {
          withCredentials:true
        }
      );

      const currentArticles = get().article;
      const updatedArticles = currentArticles.map((article) =>
        article.id === id ? result.data.articles : article
      );

      set({ article: updatedArticles, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  // DELETE
  deleteArticle: async (id) => {
    set({ loading: true });
    try {
      await axios.delete( `${process.env.NEXT_PUBLIC_API_URL}/api/article/delete/${id}`, {
        // headers: { Authorization: `Bearer ${token}` },
        withCredentials:true
      });

      const currentArticles = get().article;
      const filteredArticles = currentArticles.filter((a) => a.id !== id);

      set({
        article: filteredArticles, // Set the remaining articles, not the deleted one
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

