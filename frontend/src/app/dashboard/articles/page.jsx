"use client";
import { useRef, useState } from "react";
import { useArticleStore } from "@/store/useArticleStore";
import { useEffect } from "react";
import React from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AlertDialogDemo } from "@/component/AlertButton";
const Page = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [link, setLink] = useState("");

  //prefill form for article page
  const handleEdit = (article) => {
    setEditingId(article.id);
    setTitle(article.title ?? "");
    setDate(article.date ?? "");
    setMessage(article.message ?? "");
    setImagePreview(article.image ?? null);
    setLink(article.link ?? "");
  };

  const fileInputRef = useRef(null);

  const {
    uploadArticle,
    deleteArticle,
    editArticle,
    isUploading,
    uploadSuccess,
    fetchArticle,
    article,
  } = useArticleStore();

  useEffect(() => {
    fetchArticle();
  }, []);

  // Convert file to Base64 string 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader(); //read contents of files like img,text, pdf
    reader.readAsDataURL(file); //convert to base64
    reader.onload = () => setImagePreview(reader.result); // readre.result contain the img then set to setImagePreview where ImagePreview will contain the img
    reader.onerror = (error) => console.error(error); //error here
  };

  const triggerFileSelect = () => fileInputRef.current.click();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !date || !message || !imagePreview || !link) {
      return alert("Please fill in all fields and select an image");
    }

    // Send plain object, not FormData 
    const formData = {
      title,
      date,
      message,
      image: imagePreview, // Base64 string here
      link,
    };
    try {
      if (editingId) {
        await editArticle(editingId, formData);
        setEditingId(null);
      } else {
        await uploadArticle(formData);
      }
    } catch (error) {
      console.error("Error submitting article:", error);
      return;
    }

    //to clear the form after the edit
    setTitle("");
    setDate("");
    setImagePreview(null);
    setMessage("");
    setLink("");
  };

  // const handleDelete = async (id) => {
  //   // if (window.confirm("Are you sure you want to delete this article?")) {
  //   //   try {
  //   //     await deleteArticle(id);
  //   //   } catch (error) {
  //   //     console.error("Error deleting article:", error);
  //   //   }
  //   // }
  //   <AlertDialogDemo />;
  // };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col space-y-4">
      <div className="flex flex-col px-4 py-3 space-y-3">
        <h1
          className="text-4xl md:text-5xl custom-dashboard font-playfair mb-4"
          style={{}}
        >
          Articles
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* link update */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Link
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Place the Link"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div
            className="mb-4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
            onClick={triggerFileSelect}
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="preview"
                className="mx-auto max-h-40 object-cover"
              />
            ) : (
              <p>Drag & drop or click to select an image</p>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : editingId ? "Edit" : "Add"}
            </button>
          </div>

          {uploadSuccess && (
            <p className="text-green-500 mt-2">Uploaded successfully!</p>
          )}
        </form>
      </div>
      {/* list of articles */}
      <div className="px-3 py-4">
        <h2 className="text-3xl  font-playfair mb-4">Article List</h2>

        {/* Responsive grid layout */}
        <div className="grid [@media(max-width:970px)]:grid-cols-1 [@media(max-width:1297px)]:grid-cols-2  lg:grid-cols-3 gap-6">
          {article.map((a) => (
            <div
              key={a.id}
              className="
        flex 
        max-[767px]:flex-col
        border rounded p-3 
        items-center max-[767px]:items-start 
        space-x-4 max-[767px]:space-x-0 max-[767px]:space-y-3
        bg-white shadow-sm hover:shadow-md transition-shadow duration-200 rounded-2xl
      "
            >
              {/* IMAGE */}
              <img
                src={a.image}
                alt={a.title}
                className="
          w-[8rem] h-[10rem] 
          max-[767px]:w-full 
          max-[767px]:h-[10rem] 
          object-cover rounded
        "
              />

              {/* TEXT SECTION */}
              <div className="flex-1 flex flex-col space-y-2 text-left">
                <a href={a.link} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-lg md:text-xl line-clamp-2 font-semibold hover:underline transition duration-300">
                    {a.title}
                  </h3>
                </a>

                <p className="text-xs md:text-sm text-gray-500 flex items-center">
                  <FaRegCalendarAlt className="w-4 h-4 mr-1" />
                  {new Date(a.date).toLocaleDateString()}
                </p>

                <p className="text-xs md:text-sm text-gray-700 line-clamp-3">
                  {a.message}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(a)}
                    className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <AlertDialogDemo id={a.id} onconfirm={deleteArticle}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
