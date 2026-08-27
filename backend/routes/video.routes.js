import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteVideo,
  updateVideo,
  getVideos,
  createVideo,
} from "../controllers/video.controller.js";
const router = express.Router();

router.post("/createvideo", protectRoute, createVideo);
// router.get("/getvideo",verifySession,getVideos)
router.get("/getvideo", getVideos);

router.put("/updatevideo/:id", protectRoute, updateVideo);
router.delete("/deletevideo/:id", protectRoute, deleteVideo);

export default router;
