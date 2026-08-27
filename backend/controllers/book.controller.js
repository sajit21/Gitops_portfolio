// import { Prisma, PrismaClient } from "@prisma/client";
import {  PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";
const prisma = new PrismaClient();

export const createBook = async (req, res) => {
  try {
    const { title, date, image, message, link }= req.body;
    if (!title || !date || !image || !message  || !link) {
      return res
        .status(404)
        .json({ sucess: false, message: "All Fields are required" });
    }
    const uploadImg = await cloudinary.uploader.upload(image, {
      folder: "publication_img",
    });

    const books = await prisma.book.create({
      data: {
        title,
        date: new Date(date),
        image: uploadImg.secure_url, // store the URL
        message,
        link
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "book is created", books });
  } catch (error) {
    console.log("something went wrong", error.message);
     res.status(500).json({ success: false, message: "invalid server error" });
  }
};

export const getBook = async (req, res) => {
  try {
    const books = await prisma.book.findMany({ orderBy: { date: "desc" } });
    return res.status(200).json({
      success: true,
      message: "Book achieved successfully",
      books,
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: "invalid server error" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, image, message, date, link} = req.body;
  try {
    const books = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(date && { date: new Date(date) }),
        ...(message && { message }),
        ...(image && { image }),
        ...(link && {link})
      },
    });
    return res
      .status(200)
      .json({
        success: true,
        message: "updated book successfully",
        books,
      });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: "invalid server error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: { id: parseInt(id) },
    });
    return res
      .status(200)
      .json({
        sucess: true,
        message: "book deleted successfully",
        publicationId: id,
      });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: "invalid server error" });
  }
};

// export const deleteArticle = async (req, res) => {
//   const { id } = req.params;
//   try {
//     // First, get the article to be deleted (for confirmation)
//     const articleToDelete = await prisma.article.findUnique({
//       where: { id: parseInt(id) },
//     });

//     if (!articleToDelete) {
//       return res.status(404).json({
//         success: false,
//         message: "Article not found",
//       });
//     }

//     // Delete the article
//     await prisma.article.delete({
//       where: { id: parseInt(id) },
//     });

//     // Option 1: Return success message only (recommended)
//     return res.status(200).json({
//       success: true,
//       message: "Article deleted successfully",
//       deletedId: id,
//     });

   
//   } catch (error) {
//     console.log("something went wrong", error.message);
//     res.status(500).json({
//       success: false,
//       message: error.message || "server error",
//     });
//   }
// };
