import { PrismaClient } from "@prisma/client";
import cloudinary from "../config/cloudinary.js";
const prisma = new PrismaClient();

export const createTestimonal = async (req, res) => {
  try {
    const { name, bio, date, image, message } = req.body;
    if (!name || !bio || !date || !image || !message) {
      return res
        .status(400)
        .json({ success: true, message: "ALL fields are required" });
    }
    const uploadImg = await cloudinary.uploader.upload(image, {
      folder: "testimonals_img",
    });
    const testimonals = await prisma.testimonal.create({
      data: {
        name,
        date: new Date(date),
        bio,
        image: uploadImg.secure_url, // store the URL
        message,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Testimonal added successfully",
      testimonals,
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    res
      .status(500)
      .message({ success: false, message: "internal server error" });
  }
};

export const getTestimonals = async (req, res) => {
  try {
    const testimonals = await prisma.testimonal.findMany({
      orderBy: { date: "desc" },
    });
    return res.status(200).json({
      success: true,
      message: "Testimonals achieved successfuly",
      testimonals,
    });
  } catch (error) {
    console.log("something went wrong", error.message);
    res.status(500).json({ success: false, message: "something went wrong" });
  }
};

export const editTestimonal = async (req, res) => {
  const { id } = req.params;
  const { name, bio, date, image, message } = req.body;
  try {
    const testimonals = await prisma.testimonal.update({
      where: { id: parseInt(id) },
      data: {
        ...(name && { name }),
        ...(date && { date: new Date(date) }),
        ...(bio && { bio }),
        ...(message && { message }),
        ...(image && { image }),
      },
    });
    return res.status(200).json({
      success: true,
      message: "Testimonals edited successfully",
      testimonals,
    });
  } catch (error) {
    console.log("something went wrong ", error.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const deleteTestimonal = async (req, res) => {
  const { id } = req.params;
  try {
    const testimonals = await prisma.testimonal.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({
      success: true,
      message: "Testimonal deleted successfully",
      testimonals,
    });
  } catch (error) {
    console.log("something went wrong ", error.message);
res.status(500).json({ success: false, message: "something went wrong" });  }
};
