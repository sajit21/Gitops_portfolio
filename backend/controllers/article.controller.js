import cloudinary from "../config/cloudinary.js";
import { PrismaClient } from "@prisma/client";  // prism removed here
const prisma = new PrismaClient();

export const createArticle = async (req, res) => {
  try {
    const { title, date, image, message, link } = req.body;
    if (!title || !date || !image || !message || !link) {
      return res
        .status(400)
        .json({ success: false, message: "All field are required" });
    }

    const isValidLink = /^https?:\/\//.test(link);
    if (!isValidLink) {
      return res.status(400).json({ error: "Invalid link format" });
    }

    const uploadImg = await cloudinary.uploader.upload(image, {
      folder: "portfolio",
    });

    const articles = await prisma.article.create({
      data: {
        title,
        date: new Date(date),
        image: uploadImg.secure_url, // store  URL 
        message,
        link,
      },
    });
    console.log(articles);

    return res.status(200).json({
      success: true,
      message: "Successfully created Article",
      articles,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// get article here added

export const getArticle = async (req, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { date: "desc" },
    });
    // console.log(articles);
    return res.status(200).json({ success: true, articles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, date, message, image, link } = req.body;

  try {
    const articles = await prisma.article.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(date && { date: new Date(date) }),
        ...(message && { message }),
        ...(image && { image }),
        ...(link && { link }),
      },
    });
    // console.log(articles);
    return res.status(200).json({
      success: true,
      message: "Successfully created Article",
      articles,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    // First, get the article to be deleted (for confirmation)
    const articleToDelete = await prisma.article.findUnique({
      where: { id: parseInt(id) },
    });

    if (!articleToDelete) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    // Delete the article
    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    // Option 1: Return success message only (recommended)
    return res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      deletedId: id,
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "server error",
    });
  }
};
