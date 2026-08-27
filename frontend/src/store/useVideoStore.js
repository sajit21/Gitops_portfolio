import { create } from "zustand";
import axios from "axios";

export const useVideoStore = create((set, get) => ({
  video: [],
  isUploading: false,
  loading: false,
  uploadError: null,
  uploadSuccess: false,

  // CREATE
  uploadVideo: async (formData) => {
    set({ isUploading: true, uploadError: null, uploadSuccess: false });
    try {
      // const token = localStorage.getItem("token");
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/createVideo`,
        formData,
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        }
      );

      // Add new article to existing array
      const currentVideos = get().video;
      set({
        video: [result.data.videos, ...currentVideos], // <-- wrap single article in array
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
  fetchVideo: async () => {
    set({ loading: true });
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/getvideo`
      );

      const videos = Array.isArray(result.data.videos)
        ? result.data.videos
        : result.data.videos
        ? [result.data.videos]
        : [];

      set({ video: videos, loading: false });
    } catch (error) {
      set({ loading: false, video: [] });
      console.error(error);
    }
  },

  // UPDATE
  editVideo: async (id, formData) => {
    set({ loading: true });
    try {
      const result = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/updatevideo/${id}`,
        formData,
        {
          //  headers: { Authorization: `Bearer ${token}` }
          withCredentials:true
       }
      );

      const currentVideos = get().video;
      const updatedVideos = currentVideos.map((video) =>
        video.id === id ? result.data.videos : video
      );

      set({ video: updatedVideos, loading: false });
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },

  // DELETE
  deleteVideo: async (id) => {
    set({ loading: true });
    try {
      // const token = localStorage.getItem("token");
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/video/deletevideo/${id}`,
        {
          // headers: { Authorization: `Bearer ${token}` },
          withCredentials:true
        }
      );

      const currentVideos = get().video;
      const filteredVideos = currentVideos.filter((a) => a.id !== id);

      set({
        video: filteredVideos, // Set the remaining articles, not the deleted one
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

// import { create } from "zustand";
// import axios from "axios";

// export const useArticleStore = create((set, get) => ({
//   article: [], // This should be an array
//   isUploading: false,
//   loading: false,
//   uploadError: null,
//   uploadSuccess: false,

//   uploadArticle: async (formData) => {
//     set({ isUploading: true, uploadError: null, uploadSuccess: false });
//     try {
//       const token = localStorage.getItem("token");

//       const result = await axios.post(
//         "http://localhost:8000/api/article/create",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Fix: Add the new article to existing articles array
//       const currentArticles = get().article;
//       set({
//         article: [result.data.article, ...currentArticles], // Add new article to beginning
//         isUploading: false,
//         uploadSuccess: true,
//       });

//       // Reset success after 3 seconds
//       setTimeout(() => {
//         set({ uploadSuccess: false });
//       }, 3000);

//     } catch (error) {
//       set({ isUploading: false, uploadError: error.response?.data?.message || error.message });
//       console.error(error);
//     }
//   },

//   fetchArticle: async () => {
//     set({ loading: true });
//     try {
//       const result = await axios.get("http://localhost:8000/api/article/get");

//       // Fix: Make sure we're setting an array
//       const articles = Array.isArray(result.data.articles)
//         ? result.data.articles
//         : (result.data.article ? [result.data.article] : []);

//       set({ article: articles, loading: false });
//     } catch (error) {
//       set({ loading: false, article: [] }); // Set empty array on error
//       console.error(error);
//     }
//   },

//   editArticle: async (id, formData) => {
//     set({ loading: true });
//     try {
//       const token = localStorage.getItem("token");
//       const result = await axios.put(
//         `http://localhost:8000/api/article/update/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Fix: Update the specific article in the array
//       const currentArticles = get().article;
//       const updatedArticles = currentArticles.map(article =>
//         article.id === id ? result.data.article : article
//       );

//       set({
//         article: updatedArticles,
//         loading: false,
//       });
//     } catch (error) {
//       set({ loading: false });
//       console.error(error);
//     }
//   },

//   // Add delete function if needed
//   deleteArticle: async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:8000/api/article/delete/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Remove article from array
//       const currentArticles = get().article;
//       const filteredArticles = currentArticles.filter(article => article.id !== id);
//       set({ article: filteredArticles });
//     } catch (error) {
//       console.error(error);
//     }
//   },

//   // Reset functions
//   resetUploadState: () => {
//     set({ uploadSuccess: false, uploadError: null });
//   },
// }));
