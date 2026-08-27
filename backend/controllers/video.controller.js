// import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";
const prisma = new PrismaClient();

export const createVideo = async (req, res) => {
  try {
    const { title, image, date, message,link } = req.body;
    if (!title || !image || !date || !message||!link) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const uploadimg = await cloudinary.uploader.upload(image, {
      folder: "videosimg",
    });

    const videos = await prisma.video.create({
      data: {
        title,
        date: new Date(date),
        image: uploadimg.secure_url, // store the URL
        message,
        link
      },
    });
    console.log(videos)
    return res
      .status(200)
      .json({ success: true, message: "video added successfully" ,videos});
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: true, message: "internal server error" });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany({ orderBy: { date: "desc" } });
    return res.status(200).json({
      success: true,
      message: "Videos achieved successfully",
      videos,
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: "invalid server error" });
  }
};

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, image, message, date, link } = req.body;
  try {
    const videos = await prisma.video.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(date && { date: new Date(date) }),
        ...(message && { message }),
        ...(image && { image }),
        ...(link && {image})
      },
    });
    return res.status(200).json({
      success: true,
      message: "updated video successfully",
      videos,
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: "invalid server error" });
  }
};

// export const deleteVideo = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const videos = await prisma.video.delete({
//       where: { id: parseInt(id) },
//     });
//     return res.status(200).json({
//       sucess: true,
//       message: "Video deleted successfully",
//       videos,
//     });
//   } catch (error) {
//     console.log("something went wrong", error.message);
//     res.status(500).json({ success: false, message: "invalid server error" });
//   }
// };

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    // First, get the article to be deleted (for confirmation)
    const videoToDelete = await prisma.video.findUnique({
      where: { id: parseInt(id) },
    });

    if (!videoToDelete) {
      return res.status(404).json({
        success: false,
        message: "video not found",
      });
    }

    // Delete the article
    await prisma.video.delete({
      where: { id: parseInt(id) },
    });

    // Option 1: Return success message only (recommended)
    return res.status(200).json({
      success: true,
      message: "videos deleted successfully",
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
